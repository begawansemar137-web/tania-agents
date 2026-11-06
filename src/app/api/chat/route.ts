import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from "ai";
import type { Agent } from "@/lib/data";
import { CUSTOM_AGENT_ID, customAgent, findAgent } from "@/lib/agent-lookup";
import { hasModelHubKey, modelhub, resolveModel } from "@/lib/modelhub";

const MAX_MESSAGES = 30;
const MAX_INSTRUCTIONS = 4000;

type ChatBody = {
  messages?: UIMessage[];
  agentId?: string;
  model?: string;
  instructions?: string;
  agent?: { name?: string; role?: string }; // only for agentId "custom"
};

// Built-in studio agents and catalog agents are looked up by id. A user-made agent ("custom") lives only
// in the browser, so its name and role come with the request; both are length-capped like instructions.
function resolveAgent(body: ChatBody): Agent | undefined {
  if (body.agentId === CUSTOM_AGENT_ID) {
    const role = body.agent?.role?.trim().slice(0, 500);
    if (!role) return undefined;
    return customAgent(role, body.agent?.name?.trim().slice(0, 80) || undefined);
  }
  return body.agentId ? findAgent(body.agentId) : undefined;
}

function jsonError(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request) {
  if (!hasModelHubKey()) {
    return jsonError(503, "Model belum terhubung. Isi MODELHUB_API_KEY (kunci ModelHub) di environment, lalu jalankan ulang server.");
  }

  let body: ChatBody;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Body permintaan bukan JSON yang valid.");
  }

  const agent = resolveAgent(body);
  if (!agent) return jsonError(404, "Agen tidak ditemukan.");
  if (!Array.isArray(body.messages) || body.messages.length === 0) return jsonError(400, "Tidak ada pesan.");

  // Only allow models the ModelHub key exposes; fall back to the agent's model, then the default.
  let model: string | undefined;
  try {
    model = await resolveModel(body.model, agent.model);
  } catch (error) {
    console.error("[api/chat]", error instanceof Error ? error.message : error);
    return jsonError(502, describeError(error));
  }
  if (!model) return jsonError(503, "Kunci ModelHub belum punya akses ke model apa pun.");
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
    model: modelhub.chatModel(model),
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
  if (/unauthorized|invalid api key|authentication|auth_error|401/i.test(message)) {
    return "Kunci ModelHub tidak valid. Periksa MODELHUB_API_KEY.";
  }
  if (/budget|quota|exceeded/i.test(message)) {
    return "Batas anggaran atau kuota kunci ModelHub sudah habis.";
  }
  if (/rate limit|429/i.test(message)) {
    return "Terlalu banyak permintaan ke model. Coba lagi sebentar lagi.";
  }
  return "Model gagal menjawab. Coba lagi, atau pilih model lain di panel Konfigurasi.";
}
