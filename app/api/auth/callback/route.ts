import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/account?error=${error}`, req.url));
  }

  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");
  const expires_in = url.searchParams.get("expires_in");

  if (!access_token || !refresh_token) {
    return NextResponse.redirect(new URL("/account?error=missing_tokens", req.url));
  }

  const cookieStore = await cookies();

  cookieStore.set("sb-access-token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: Number(expires_in ?? 3600),
    path: "/",
  });

  cookieStore.set("sb-refresh-token", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return NextResponse.redirect(new URL("/account?confirmed=true", req.url));
}
