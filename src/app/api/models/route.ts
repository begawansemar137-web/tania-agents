import { connection } from "next/server";
import { hasModelHubKey, listModels } from "@/lib/modelhub";

// Models the configured ModelHub key can use, for the model picker in the agent studio.
export async function GET() {
  await connection();
  if (!hasModelHubKey()) return Response.json({ models: [], connected: false });
  try {
    return Response.json({ models: await listModels(), connected: true });
  } catch (error) {
    console.error("[api/models]", error instanceof Error ? error.message : error);
    return Response.json({ models: [], connected: false }, { status: 502 });
  }
}
