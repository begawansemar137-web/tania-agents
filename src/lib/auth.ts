import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getUserByEmail, getUserById, type DbUser } from "./db";

export const ALLOWED_DOMAINS = ["telkom.co.id", "digitaltelkom.id"];

// Default to Telkom Indonesia's Entra Tenant ID (as configured in Multica & PWD)
export const TELKOM_AZURE_TENANT_ID =
  process.env.AZURE_TENANT_ID || "1e894b01-b0d3-4e42-adf7-19288728a2c7";

export const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID || "";
export const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET || "";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

const SESSION_COOKIE_NAME = "tania_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "tania-secret-key-telkom-agentic-32chars!";

export function isAllowedTelkomEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const lower = email.trim().toLowerCase();
  return ALLOWED_DOMAINS.some((domain) => lower.endsWith(`@${domain}`));
}

export function isAzureConfigured(): boolean {
  return Boolean(AZURE_CLIENT_ID && AZURE_CLIENT_SECRET);
}

export function isGoogleConfigured(): boolean {
  return Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);
}

// Simple signed session token using Node's built-in crypto
function signData(data: string): string {
  const hmac = crypto.createHmac("sha256", SESSION_SECRET);
  hmac.update(data);
  const signature = hmac.digest("base64url");
  return `${data}.${signature}`;
}

function verifySignedData(signed: string): string | null {
  const parts = signed.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const hmac = crypto.createHmac("sha256", SESSION_SECRET);
  hmac.update(data);
  const expectedSignature = hmac.digest("base64url");
  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return data;
  }
  return null;
}

export async function createSession(user: DbUser) {
  const cookieStore = await cookies();
  const payload = JSON.stringify({
    userId: user.id,
    email: user.email,
    name: user.name,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const signed = signData(Buffer.from(payload).toString("base64url"));

  cookieStore.set(SESSION_COOKIE_NAME, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function getCurrentUser(): Promise<DbUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) return null;

    const dataB64 = verifySignedData(sessionCookie);
    if (!dataB64) return null;

    const payloadStr = Buffer.from(dataB64, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadStr) as { userId: string; email: string; exp: number };

    if (Date.now() > payload.exp) return null;

    return getUserById(payload.userId) || getUserByEmail(payload.email);
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// ----------------- MICROSOFT ENTRA ID (AZURE AD) HELPERS -----------------
export function getAzureAuthRedirectUri(origin: string): string {
  if (process.env.AZURE_REDIRECT_URI) {
    return process.env.AZURE_REDIRECT_URI.replace("${FRONTEND_ORIGIN}", origin);
  }
  return `${origin}/api/auth/callback/azure`;
}

export function getAzureAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: AZURE_CLIENT_ID,
    response_type: "code",
    redirect_uri: redirectUri,
    response_mode: "query",
    scope: "openid profile email User.Read",
    state,
  });
  return `https://login.microsoftonline.com/${TELKOM_AZURE_TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;
}

export async function exchangeAzureCode(code: string, redirectUri: string) {
  const body = new URLSearchParams({
    client_id: AZURE_CLIENT_ID,
    client_secret: AZURE_CLIENT_SECRET,
    scope: "openid profile email User.Read",
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch(`https://login.microsoftonline.com/${TELKOM_AZURE_TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gagal menukar kode Azure: ${err}`);
  }

  return (await res.json()) as { access_token: string; id_token?: string };
}

export async function getAzureUserProfile(accessToken: string) {
  const res = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gagal mengambil profil Microsoft Graph: ${err}`);
  }

  const data = (await res.json()) as {
    displayName?: string;
    mail?: string;
    userPrincipalName?: string;
    id?: string;
  };

  const email = data.mail || data.userPrincipalName || "";
  return {
    id: data.id,
    name: data.displayName || email.split("@")[0],
    email,
  };
}

// ----------------- GOOGLE WORKSPACE OAUTH HELPERS -----------------
export function getGoogleAuthRedirectUri(origin: string): string {
  if (process.env.GOOGLE_REDIRECT_URI) {
    return process.env.GOOGLE_REDIRECT_URI.replace("${FRONTEND_ORIGIN}", origin);
  }
  return `${origin}/api/auth/callback/google`;
}

export function getGoogleAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "select_account",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string, redirectUri: string) {
  const body = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gagal menukar kode Google: ${err}`);
  }

  return (await res.json()) as { access_token: string; id_token?: string };
}

export async function getGoogleUserProfile(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gagal mengambil profil Google: ${err}`);
  }

  const data = (await res.json()) as {
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
  };

  return {
    id: data.sub,
    name: data.name || (data.email ? data.email.split("@")[0] : "User Google"),
    email: data.email || "",
    avatar_url: data.picture,
  };
}

