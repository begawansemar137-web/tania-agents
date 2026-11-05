import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// ModelHub (https://api-modelhub.aiplayground.id) is a LiteLLM proxy with an OpenAI-compatible API.
// Which models exist depends on the API key, so the list is read from /v1/models at runtime.
const baseURL = process.env.MODELHUB_BASE_URL ?? "https://api-modelhub.aiplayground.id/v1";
const apiKey = process.env.MODELHUB_API_KEY;

export const hasModelHubKey = () => Boolean(apiKey);

export const modelhub = createOpenAICompatible({
  name: "modelhub",
  baseURL,
  apiKey,
  includeUsage: true,
});

const TTL_MS = 5 * 60 * 1000;
let cache: { at: number; models: string[] } | undefined;

export async function listModels(): Promise<string[]> {
  if (!apiKey) return [];
  if (cache && Date.now() - cache.at < TTL_MS) return cache.models;
  const res = await fetch(`${baseURL}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`ModelHub /models ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { data?: { id: string }[] };
  const models = (json.data ?? []).map((m) => m.id).sort();
  cache = { at: Date.now(), models };
  return models;
}

// Embedding models are listed by /v1/models too, but they can't chat.
const isChatModel = (id: string) => !/embed/i.test(id);

// Pick the requested model if the key allows it, else the configured default, else the first chat model.
export async function resolveModel(...candidates: (string | undefined)[]): Promise<string | undefined> {
  const available = (await listModels()).filter(isChatModel);
  const preferred = [...candidates, process.env.MODELHUB_DEFAULT_MODEL];
  return preferred.find((m) => m && available.includes(m)) ?? available[0];
}
