import type { Metadata } from "next";

import ApplyForm, { type ApplyFormInitial } from "@/components/apply/ApplyForm";

export const metadata: Metadata = {
  title: "Internship Application | Briticana",
  description:
    "Apply below to join the Briticana remote internship programme. Upload your CV — it covers education, skills and experience.",
};

type ApplyPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function first(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  return trimmed || undefined;
}

export default function ApplyPage({ searchParams }: ApplyPageProps) {
  const sp = searchParams ?? {};
  const initial: ApplyFormInitial = {
    internship: first(sp.internship),
    domain: first(sp.domain),
    duration: first(sp.duration),
    region: first(sp.region),
    source: first(sp.source),
  };

  return <ApplyForm initial={initial} />;
}
