import { NextResponse } from "next/server";
import { isAllowedTelkomEmail, createSession } from "@/lib/auth";
import { upsertUser } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; name?: string };
    const email = (body.email || "").trim().toLowerCase();
    const name = (body.name || "").trim() || email.split("@")[0];

    if (!email) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }

    if (!isAllowedTelkomEmail(email)) {
      return NextResponse.json(
        {
          error: "Akses dibatasi: Hanya email dengan domain @telkom.co.id atau @digitaltelkom.id yang diizinkan.",
        },
        { status: 403 }
      );
    }

    const user = upsertUser({ email, name });
    await createSession(user);

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[dev-login]", message);
    return NextResponse.json({ error: message || "Gagal memproses login" }, { status: 500 });
  }
}
