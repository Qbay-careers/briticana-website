import { NextResponse } from "next/server";

import { appendApplicationRow, isSheetsConfigured } from "@/lib/applications/googleSheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FIELD_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ApplicationBody = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  domain?: unknown;
  duration?: unknown;
  region?: unknown;
  educationLevel?: unknown;
  introduction?: unknown;
  internship?: unknown;
  source?: unknown;
  /** Honeypot — must stay empty; bots tend to fill every field. */
  website?: unknown;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

// Best-effort in-memory rate limit (per server instance).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let body: ApplicationBody;
  try {
    body = (await request.json()) as ApplicationBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept so bots think they succeeded, but store nothing.
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  const fullName = str(body.fullName);
  const email = str(body.email);
  const phone = str(body.phone);
  const country = str(body.country);
  const domain = str(body.domain);
  const duration = str(body.duration);
  const region = str(body.region);
  const educationLevel = str(body.educationLevel);
  const introduction = str(body.introduction);
  const internship = str(body.internship);
  const source = str(body.source);

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Please enter your full name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (!phone) errors.phone = "Please enter your phone number.";
  if (!domain) errors.domain = "Please choose a domain.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please check the form.", fields: errors }, { status: 400 });
  }

  if (!isSheetsConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Applications aren't configured yet. Please try again later or email us." },
      { status: 503 },
    );
  }

  try {
    await appendApplicationRow({
      submittedAt: new Date().toISOString(),
      fullName,
      email,
      phone,
      country,
      domain,
      duration,
      region,
      educationLevel,
      introduction,
      internship,
      source,
    });
  } catch (err) {
    console.error("Failed to append application to Google Sheets:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your application. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
