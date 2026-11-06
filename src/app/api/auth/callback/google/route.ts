import { NextResponse } from "next/server";
import { exchangeGoogleCode, getGoogleUserProfile, isAllowedTelkomEmail, createSession, getGoogleAuthRedirectUri } from "@/lib/auth";
import { upsertUser } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    console.error("[google-callback] Error from Google:", error);
    return NextResponse.redirect(`${origin}/masuk?error=${encodeURIComponent(error || "Login Google dibatalkan")}`);
  }

  try {
    const redirectUri = getGoogleAuthRedirectUri(origin);
    const tokens = await exchangeGoogleCode(code, redirectUri);
    const profile = await getGoogleUserProfile(tokens.access_token);

    if (!profile.email) {
      return NextResponse.redirect(`${origin}/masuk?error=${encodeURIComponent("Gagal mengambil email dari akun Google")}`);
    }

    if (!isAllowedTelkomEmail(profile.email)) {
      return NextResponse.redirect(
        `${origin}/masuk?error=${encodeURIComponent(
          `Domain email '${profile.email}' tidak diizinkan. Harap gunakan akun Google kedinasan (@telkom.co.id atau @digitaltelkom.id).`
        )}`
      );
    }

    const user = upsertUser({
      email: profile.email,
      name: profile.name,
      avatar_url: profile.avatar_url,
    });

    await createSession(user);
    return NextResponse.redirect(`${origin}/app`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[google-callback] Exception:", message);
    return NextResponse.redirect(`${origin}/masuk?error=${encodeURIComponent(message || "Gagal masuk via Google")}`);
  }
}

