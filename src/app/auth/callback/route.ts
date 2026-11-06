import { GET as handleAzure } from "@/app/api/auth/callback/azure/route";
import { GET as handleGoogle } from "@/app/api/auth/callback/google/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get("scope") || "";

  // Google OAuth includes "google" or "openid https://www.googleapis.com" in scope
  if (scope.includes("google") || scope.includes("googleapis")) {
    return handleGoogle(req);
  }

  // Default to Azure
  try {
    return await handleAzure(req);
  } catch {
    return handleGoogle(req);
  }
}
