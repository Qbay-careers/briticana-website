import fs from "node:fs";
import path from "node:path";

import { google } from "googleapis";

/**
 * Server-only Google Sheets client for storing application submissions.
 * Never import this module from a client component.
 *
 * Required environment variables (set in .env.local / hosting provider):
 *   GOOGLE_SHEETS_SPREADSHEET_ID        — the long ID from the sheet URL
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL        — service account ...@...iam.gserviceaccount.com
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  — the private key (keep \n escapes; wrap in quotes)
 * Optional:
 *   GOOGLE_SHEETS_TAB_NAME              — worksheet/tab name (default "Applications")
 *   GOOGLE_SERVICE_ACCOUNT_KEY_PATH     — local dev only: path to service account JSON file
 */

const DEFAULT_TAB = "Applications";

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

export function isSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH),
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
  // Hosting env vars often store literal "\n"; restore real PEM line breaks.
  return key.replace(/\\n/g, "\n");
}

function readPrivateKeyFromJsonFile(relativePath: string): string | null {
  try {
    const abs = path.isAbsolute(relativePath) ? relativePath : path.join(process.cwd(), relativePath);
    const parsed = JSON.parse(fs.readFileSync(abs, "utf8")) as { private_key?: string };
    const key = parsed.private_key?.trim();
    return key ? normalizePrivateKey(key) : null;
  } catch {
    return null;
  }
}

function getPrivateKey(): string {
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH?.trim();
  if (keyPath) {
    const fromFile = readPrivateKeyFromJsonFile(keyPath);
    if (fromFile) return fromFile;
    console.error("Could not read GOOGLE_SERVICE_ACCOUNT_KEY_PATH:", keyPath);
  }

  const fromEnv = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (fromEnv) return normalizePrivateKey(fromEnv);

  throw new Error("Google service account private key is not configured.");
}

function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
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
