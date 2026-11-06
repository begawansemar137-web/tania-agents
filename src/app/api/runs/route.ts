import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getUserRuns } from "@/lib/db";
import { runs as fallbackRuns } from "@/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get("agentId") || undefined;

  const currentUser = await getCurrentUser();
  const userId = currentUser?.id || "anonymous-dev";

  try {
    const dbRuns = getUserRuns(userId, agentId);
    if (dbRuns.length > 0) {
      return NextResponse.json({ runs: dbRuns });
    }
  } catch (err) {
    console.warn("[api/runs] Failed to fetch db runs:", err);
  }

  // Fallback to initial runs if DB is empty
  const list = agentId && agentId !== "semua" ? fallbackRuns.filter((r) => r.agentId === agentId) : fallbackRuns;
  return NextResponse.json({ runs: list });
}

