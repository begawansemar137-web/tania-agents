import { NextResponse } from "next/server";
import { getAzureAuthRedirectUri, getAzureAuthUrl, isAzureConfigured } from "@/lib/auth";

export async function GET(req: Request) {
  if (!isAzureConfigured()) {
    return NextResponse.json(
      {
        error: "Microsoft Entra ID belum dikonfigurasi.",
        hint: "Isi AZURE_CLIENT_ID dan AZURE_CLIENT_SECRET di file .env.local",
      },
      { status: 400 }
    );
  }

  const { origin } = new URL(req.url);
  const redirectUri = getAzureAuthRedirectUri(origin);
  const state = Math.random().toString(36).substring(2, 15);

  const authUrl = getAzureAuthUrl(redirectUri, state);
  return NextResponse.redirect(authUrl);
}
