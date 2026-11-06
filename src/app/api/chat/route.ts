import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from "ai";
import type { Agent } from "@/lib/data";
import { CUSTOM_AGENT_ID, customAgent, findAgent } from "@/lib/agent-lookup";
import { hasModelHubKey, modelhub, resolveModel } from "@/lib/modelhub";
import { getCurrentUser } from "@/lib/auth";
import { getAgentById, getOrCreateThread, recordRunTrace, saveChatMessage } from "@/lib/db";

const MAX_MESSAGES = 30;
const MAX_INSTRUCTIONS = 4000;

type ChatBody = {
  messages?: UIMessage[];
  agentId?: string;
  model?: string;
  instructions?: string;
  agent?: { name?: string; role?: string }; // only for agentId "custom"
};

function resolveAgent(body: ChatBody, userId?: string): Agent | undefined {
  if (body.agentId === CUSTOM_AGENT_ID) {
    const role = body.agent?.role?.trim().slice(0, 500);
    if (!role) return undefined;
    return customAgent(role, body.agent?.name?.trim().slice(0, 80) || undefined);
  }
  if (!body.agentId) return undefined;

  // First try user-specific agent in DB
  const dbAgent = getAgentById(body.agentId, userId);
  if (dbAgent) return dbAgent;

  // Fallback to static catalog
  return findAgent(body.agentId);
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

  const currentUser = await getCurrentUser();
  const userId = currentUser?.id || "anonymous-dev";

  const agent = resolveAgent(body, currentUser?.id);
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
    `Kamu adalah "${agent.name}", rekan kerja AI di TANIA-Agents untuk Telkom Enterprise. Peranmu: ${agent.role}`,
    `Instruksi dari pemilik agen:\n${custom}`,
    `Integrasi yang direncanakan untukmu:\n${toolList || "- (tidak ada)"}`,
    "Jawab dalam Bahasa Indonesia yang profesional, ringkas, dan jelas, kecuali pengguna memakai bahasa lain.",
  ].join("\n\n");

  const lastUserMsg = body.messages[body.messages.length - 1];
  const lastUserText = lastUserMsg.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

  // Persist user message to thread
  let threadId: string | null = null;
  try {
    threadId = getOrCreateThread(userId, agent.id);
    saveChatMessage(threadId, "user", lastUserText, lastUserMsg.parts);
  } catch (e) {
    console.warn("[api/chat] Failed to save thread message:", e);
  }

  const startTime = Date.now();

  const result = streamText({
    model: modelhub.chatModel(model),
    instructions,
    messages: await convertToModelMessages(body.messages.slice(-MAX_MESSAGES)),
    onFinish: async ({ text, usage }) => {
      try {
        const durationMs = Date.now() - startTime;
        const totalTokens = usage?.totalTokens || (text.length / 4);
        const costUsd = Number(((totalTokens / 1000) * 0.002).toFixed(4));

        if (threadId) {
          saveChatMessage(threadId, "assistant", text);
        }

        recordRunTrace({
          userId,
          agentId: agent.id,
          summary: lastUserText.slice(0, 60) || "Obrolan dengan agen",
          model: model!,
          durationMs,
          tokensUsed: totalTokens,
          costUsd,
          status: "berhasil",
          spans: [
            {
              name: "llm_generate",
              kind: "llm",
              ms: durationMs,
              tokens: totalTokens,
              detail: `Model: ${model}`,
            },
          ],
        });
      } catch (err) {
        console.warn("[api/chat] Failed to record run trace:", err);
      }
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, onError: describeError }),
  });
}

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
