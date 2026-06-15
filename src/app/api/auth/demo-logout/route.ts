import { NextResponse } from "next/server";

const COOKIE_NAME = "briticana_demo_auth";

const clearOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 0,
};

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", clearOptions);
  return res;
}
