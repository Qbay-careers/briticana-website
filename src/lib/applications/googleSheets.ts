import {
  applicationRecordToRow,
  type ApplicationRecord,
} from "@/lib/applications/applicationTypes";
import { createServiceAccountAuth, hasServiceAccountCredentials } from "@/lib/applications/googleServiceAccount";
import { google } from "googleapis";

/**
 * Server-only Google Sheets client for application submissions.
 * Never import from client components.
 *
 * Required: GOOGLE_SHEETS_SPREADSHEET_ID
 * Credentials: see googleServiceAccount.ts
 * Optional: GOOGLE_SHEETS_TAB_NAME (default "Applications")
 */

const DEFAULT_TAB = "Applications";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export { APPLICATION_SHEET_HEADERS, type ApplicationRecord } from "@/lib/applications/applicationTypes";

export function isSheetsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() && hasServiceAccountCredentials());
}

function getSheetsClient() {
  const auth = createServiceAccountAuth([SHEETS_SCOPE]);
  return google.sheets({ version: "v4", auth });
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
    requestBody: { values: [applicationRecordToRow(record)] },
  });
}
