import type { Metadata } from "next";

import GoogleInternshipApplyForm from "@/components/apply/GoogleInternshipApplyForm";

export const metadata: Metadata = {
  title: "Application | Briticana",
  description: "Internship Application Form",
};

type GoogleApplyPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  return trimmed || undefined;
}

export default function GoogleApplyPage({ searchParams }: GoogleApplyPageProps) {
  const sp = searchParams ?? {};
  const initialRole = firstParam(sp.role) || firstParam(sp.internship);

  return <GoogleInternshipApplyForm initialRole={initialRole} />;
}
