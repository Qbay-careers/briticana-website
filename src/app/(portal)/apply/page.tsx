import type { Metadata } from "next";
import Link from "next/link";

import ApplyForm, { type ApplyFormInitial } from "@/components/apply/ApplyForm";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to a Briticana mentor-led internship. Share your details and our team will review your application and follow up by email.",
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

  return (
    <>
      <div className="page-banner-area position-relative z-1 pt-100 pb-0">
        <div className="container mw-1345">
          <div className="position-relative z-1">
            <div className="page-banner-content">
              <ul className="p-0 list-unstyled d-flex flex-wrap">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span>Apply</span>
                </li>
              </ul>
              <h2 className="mb-2">
                Apply to an <span>internship</span>
              </h2>
              <p className="text-secondary mt-2 mb-2" style={{ maxWidth: "720px" }}>
                Tell us about yourself and the track you&apos;re interested in. Our team reviews every application and
                follows up by email with the next steps.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-area pt-5 pb-120 bg-f7f7f7">
        <div className="container mw-1345">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <ApplyForm initial={initial} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
