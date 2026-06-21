import fs from "node:fs";
import path from "node:path";

import { google } from "googleapis";

export type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

function hasLegacyKeyPair(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim(),
  );
}

export function hasServiceAccountCredentials(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() ||
      process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64?.trim() ||
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH?.trim() ||
      hasLegacyKeyPair(),
  );
}

function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}

function parseServiceAccountJson(raw: string): ServiceAccountCredentials | null {
  try {
    const parsed = JSON.parse(raw) as { client_email?: string; private_key?: string };
    const client_email = parsed.client_email?.trim();
    const private_key = parsed.private_key?.trim();
    if (!client_email || !private_key) return null;
    return { client_email, private_key: normalizePrivateKey(private_key) };
  } catch {
    return null;
  }
}

function readServiceAccountFromFile(relativePath: string): ServiceAccountCredentials | null {
  try {
    const abs = path.isAbsolute(relativePath) ? relativePath : path.join(process.cwd(), relativePath);
    return parseServiceAccountJson(fs.readFileSync(abs, "utf8"));
  } catch {
    return null;
  }
}

export function getServiceAccountCredentials(): ServiceAccountCredentials {
  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64?.trim();
  if (base64) {
    try {
      const decoded = Buffer.from(base64, "base64").toString("utf8");
      const fromBase64 = parseServiceAccountJson(decoded);
      if (fromBase64) return fromBase64;
    } catch {
      console.error("GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 could not be decoded.");
    }
  }

  const jsonEnv = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (jsonEnv) {
    const fromJson = parseServiceAccountJson(jsonEnv);
    if (fromJson) return fromJson;
    console.error("GOOGLE_SERVICE_ACCOUNT_JSON is set but could not be parsed.");
  }

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH?.trim();
  if (keyPath) {
    const fromFile = readServiceAccountFromFile(keyPath);
    if (fromFile) return fromFile;
    console.error("Could not read GOOGLE_SERVICE_ACCOUNT_KEY_PATH:", keyPath);
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim();
  if (email && privateKey) {
    return { client_email: email, private_key: normalizePrivateKey(privateKey) };
  }

  throw new Error("Google service account credentials are not configured.");
}

export function createServiceAccountAuth(scopes: string[], subject?: string) {
  const { client_email, private_key } = getServiceAccountCredentials();
  const impersonate = subject?.trim();
  return new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes,
    ...(impersonate ? { subject: impersonate } : {}),
  });
}
