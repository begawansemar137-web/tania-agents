import { NextResponse } from "next/server";
import { getCurrentUser, isAzureConfigured, isGoogleConfigured } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({
    user,
    isAzureConfigured: isAzureConfigured(),
    isGoogleConfigured: isGoogleConfigured(),
  });
}
