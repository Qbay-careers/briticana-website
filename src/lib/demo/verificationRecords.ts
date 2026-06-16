/** Static demo records for the certificate verification lookup (no API, no Sanity, no persistence). */

export type VerificationRecord = {
  code: string;
  name: string;
  domain: string;
  duration: string;
  region: string;
  status: string;
  certificateIssued: boolean;
  mentorEvaluation: string;
};

export const demoVerificationRecords: readonly VerificationRecord[] = [
  {
    code: "BRT-2026-884",
    name: "Priya Nair",
    domain: "Data Analysis & Business Intelligence",
    duration: "3 months",
    region: "Germany",
    status: "Completed",
    certificateIssued: true,
    mentorEvaluation: "Excellent",
  },
  {
    code: "BRT-2026-001",
    name: "John Doe",
    domain: "Data Analyst",
    duration: "3 Months",
    region: "United Kingdom",
    status: "Completed",
    certificateIssued: true,
    mentorEvaluation: "Excellent",
  },
  {
    code: "BRT-2026-213",
    name: "Joseph",
    domain: "Product Design",
    duration: "6 Months",
    region: "Sweden",
    status: "Completed",
    certificateIssued: true,
    mentorEvaluation: "Excellent",
  },
  {
    code: "BRT-2026-365",
    name: "Anna",
    domain: "UI/UX Design",
    duration: "9 Months",
    region: "Germany",
    status: "Completed",
    certificateIssued: true,
    mentorEvaluation: "Excellent",
  },
] as const;

/** Pure lookup: normalizes input (trim + uppercase) and matches against `code`. */
export function findVerificationRecord(code: string): VerificationRecord | undefined {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return undefined;
  return demoVerificationRecords.find((r) => r.code.toUpperCase() === normalized);
}
