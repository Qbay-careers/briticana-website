import fs from "node:fs";
import path from "node:path";

import { google } from "googleapis";

/**
 * Server-only Google Sheets client for storing application submissions.
 * Never import this module from a client component.
 *
 * Required:
 *   GOOGLE_SHEETS_SPREADSHEET_ID
 *
 * Service account credentials (first match wins):
 *   1. GOOGLE_SERVICE_ACCOUNT_JSON     — full JSON key (recommended for Vercel/production)
 *   2. GOOGLE_SERVICE_ACCOUNT_KEY_PATH — path to JSON file (local dev)
 *   3. GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *
 * Optional:
 *   GOOGLE_SHEETS_TAB_NAME             — worksheet/tab name (default "Applications")
 */

const DEFAULT_TAB = "Applications";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

/** Column order written to the sheet; the first row should hold these headers. */
export const APPLICATION_SHEET_HEADERS = [
  "Submitted At",
  "Full Name",
  "Email",
  "Phone",
  "Country / Region",
  "Domain",
  "Duration",
  "Program Region",
  "Education Level",
  "Introduction",
  "Internship",
  "Source",
] as const;

export type ApplicationRecord = {
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  domain: string;
  duration: string;
  region: string;
  educationLevel: string;
  introduction: string;
  internship: string;
  source: string;
};

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

function hasLegacyKeyPair(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim(),
  );
}

export function isSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() &&
      (process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() ||
        process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH?.trim() ||
        hasLegacyKeyPair()),
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

function getServiceAccountCredentials(): ServiceAccountCredentials {
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

function getSheetsClient() {
  const { client_email, private_key } = getServiceAccountCredentials();
  const auth = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: [SHEETS_SCOPE],
  });
  return google.sheets({ version: "v4", auth });
}

function recordToRow(record: ApplicationRecord): string[] {
  return [
    record.submittedAt,
    record.fullName,
    record.email,
    record.phone,
    record.country,
    record.domain,
    record.duration,
    record.region,
    record.educationLevel,
    record.introduction,
    record.internship,
    record.source,
  ];
}

/** Appends a single application as a new row. Throws if the API call fails. */
export async function appendApplicationRow(record: ApplicationRecord): Promise<void> {
  const sheets = getSheetsClient();
  const tab = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || DEFAULT_TAB;

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [recordToRow(record)] },
  });
}
