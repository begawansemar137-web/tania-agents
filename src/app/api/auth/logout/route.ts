import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST(req: Request) {
  await clearSession();
  const { origin } = new URL(req.url);
  return NextResponse.redirect(`${origin}/masuk`, { status: 303 });
}

export async function GET(req: Request) {
  await clearSession();
  const { origin } = new URL(req.url);
  return NextResponse.redirect(`${origin}/masuk`, { status: 303 });
}

