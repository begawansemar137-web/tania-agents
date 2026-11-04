import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from "ai";
import { getAgent, models } from "@/lib/data";

const MAX_MESSAGES = 30;
const MAX_INSTRUCTIONS = 4000;

type ChatBody = {
  messages?: UIMessage[];
  agentId?: string;
  model?: string;
  instructions?: string;
};

function jsonError(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request) {
  // AI Gateway authenticates with AI_GATEWAY_API_KEY, or with OIDC. On Vercel (VERCEL=1) the OIDC
  // token arrives per request; locally `vercel env pull` writes VERCEL_OIDC_TOKEN to .env.local.
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL && !process.env.VERCEL_OIDC_TOKEN) {
    return jsonError(503, "Model belum terhubung. Isi AI_GATEWAY_API_KEY di file .env.local, lalu jalankan ulang server.");
  }

  let body: ChatBody;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Body permintaan bukan JSON yang valid.");
  }

  const agent = body.agentId ? getAgent(body.agentId) : undefined;
  if (!agent) return jsonError(404, "Agen tidak ditemukan.");
  if (!Array.isArray(body.messages) || body.messages.length === 0) return jsonError(400, "Tidak ada pesan.");

  // Only allow models from the server-side list; fall back to the agent's saved model.
  const model = body.model && models.includes(body.model) ? body.model : agent.model;
  const custom = (body.instructions ?? agent.instructions).slice(0, MAX_INSTRUCTIONS);

  const toolList = agent.tools
    .filter((t) => t.permission !== "off")
    .map((t) => `- ${t.integration}: ${t.permission === "write" ? "baca & tulis" : "baca saja"}${t.approval ? " (tulis butuh persetujuan)" : ""}`)
    .join("\n");

  const instructions = [
    `Kamu adalah "${agent.name}", rekan kerja AI di TANIA-Agents. Peranmu: ${agent.role}`,
    `Instruksi dari pemilik agen:\n${custom}`,
    `Integrasi yang direncanakan untukmu:\n${toolList || "- (tidak ada)"}`,
    "Penting: integrasi di atas BELUM tersambung di versi ini. Jangan mengaku telah membaca email, kalender, CRM, atau web. Jika tugas butuh data dari integrasi, jelaskan langkah yang akan kamu ambil dan minta pengguna menempelkan datanya.",
    "Jawab dalam Bahasa Indonesia yang ringkas dan jelas, kecuali pengguna memakai bahasa lain.",
  ].join("\n\n");

  const result = streamText({
    model,
    instructions,
    messages: await convertToModelMessages(body.messages.slice(-MAX_MESSAGES)),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, onError: describeError }),
  });
}

// Log the real error server-side; send the user a safe, actionable message.
function describeError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("[api/chat]", message);
  if (/credit card/i.test(message)) {
    return "AI Gateway belum aktif: tambahkan kartu kredit di dashboard Vercel (AI Gateway) untuk membuka kredit gratis.";
  }
  if (/unauthorized|invalid api key|authentication/i.test(message)) {
    return "Kunci AI Gateway tidak valid. Periksa AI_GATEWAY_API_KEY.";
  }
  if (/rate limit|429/i.test(message)) {
    return "Terlalu banyak permintaan ke model. Coba lagi sebentar lagi.";
  }
  return "Model gagal menjawab. Coba lagi, atau pilih model lain di panel Konfigurasi.";
}
