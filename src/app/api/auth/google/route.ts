import { NextResponse } from "next/server";
import { getGoogleAuthRedirectUri, getGoogleAuthUrl, isGoogleConfigured } from "@/lib/auth";

export async function GET(req: Request) {
  if (!isGoogleConfigured()) {
    return NextResponse.json(
      {
        error: "Google OAuth belum dikonfigurasi.",
        hint: "Isi GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET di file .env",
      },
      { status: 400 }
    );
  }

  const { origin } = new URL(req.url);
  const redirectUri = getGoogleAuthRedirectUri(origin);
  const state = Math.random().toString(36).substring(2, 15);

  const authUrl = getGoogleAuthUrl(redirectUri, state);
  return NextResponse.redirect(authUrl);
}

