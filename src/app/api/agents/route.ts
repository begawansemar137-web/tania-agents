import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getUserAgents, saveAgentConfig } from "@/lib/db";
import { agents as defaultAgents } from "@/lib/data";

export async function GET() {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id || "anonymous-dev";

  try {
    const list = getUserAgents(userId);
    return NextResponse.json({ agents: list });
  } catch (err) {
    console.warn("[api/agents] Error fetching agents:", err);
    return NextResponse.json({ agents: defaultAgents });
  }
}

export async function PATCH(req: Request) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id || "anonymous-dev";

  try {
    const body = await req.json();
    const { agentId, model, instructions, tools } = body;
    if (!agentId) {
      return NextResponse.json({ error: "agentId is required" }, { status: 400 });
    }

    saveAgentConfig(agentId, userId, { model, instructions, tools });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
