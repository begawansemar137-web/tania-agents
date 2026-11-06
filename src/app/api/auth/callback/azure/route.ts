import { NextResponse } from "next/server";
import { exchangeAzureCode, getAzureUserProfile, isAllowedTelkomEmail, createSession, getAzureAuthRedirectUri } from "@/lib/auth";
import { upsertUser } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error || !code) {
    console.error("[azure-callback] Error from Microsoft:", error, errorDescription);
    return NextResponse.redirect(`${origin}/masuk?error=${encodeURIComponent(errorDescription || "Login dibatalkan")}`);
  }

  try {
    const redirectUri = getAzureAuthRedirectUri(origin);
    const tokens = await exchangeAzureCode(code, redirectUri);
    const profile = await getAzureUserProfile(tokens.access_token);

    if (!isAllowedTelkomEmail(profile.email)) {
      return NextResponse.redirect(
        `${origin}/masuk?error=${encodeURIComponent(
          `Domain email '${profile.email}' tidak diizinkan. Harap gunakan akun @telkom.co.id atau @digitaltelkom.id.`
        )}`
      );
    }

    const user = upsertUser({
      email: profile.email,
      name: profile.name,
    });

    await createSession(user);
    return NextResponse.redirect(`${origin}/app`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[azure-callback] Exception:", message);
    return NextResponse.redirect(`${origin}/masuk?error=${encodeURIComponent(message || "Gagal masuk via Microsoft")}`);
  }
}
