import type { Metadata } from "next";
import Link from "next/link";

import FilterBar from "@/components/internships/FilterBar";
import StartDateSelector from "@/components/internships/StartDateSelector";
import InternshipIntroCard from "@/components/marketing/InternshipIntroCard";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import {
  getAllInternshipDomains,
  getAllInternships,
  getInternshipsFiltered,
  getSiteSettings,
} from "@/lib/sanity/queries";
import type { Internship, InternshipDomainDoc, SiteSettings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Browse Briticana mentor-led internship tracks, filter by domain, region, and duration, and apply when your profile matches startup demand.",
};

type InternshipsPageProps = {
  searchParams?: { domain?: string; region?: string; duration?: string };
};

export default async function InternshipsPage({ searchParams }: InternshipsPageProps) {
  const sp = searchParams ?? {};
  let internships: Internship[] = [];
  let filterDomains: InternshipDomainDoc[] = [];
  let batchApplyUrl: string | null = null;

  if (isSanityConfigured()) {
    try {
      const hasFilter = Boolean(sp.domain?.trim() || sp.region?.trim() || sp.duration?.trim());
      const [fetchedInternships, fetchedDomains, siteSettings] = await Promise.all([
        client.fetch<Internship[]>(
          hasFilter ? getInternshipsFiltered : getAllInternships,
          hasFilter
            ? {
                domain: sp.domain?.trim() ?? "",
                region: sp.region?.trim() ?? "",
                duration: sp.duration?.trim() ?? "",
              }
            : {},
        ),
        client.fetch<InternshipDomainDoc[]>(getAllInternshipDomains),
        client.fetch<SiteSettings | null>(getSiteSettings),
      ]);
      internships = fetchedInternships;
      filterDomains = fetchedDomains;
      batchApplyUrl = siteSettings?.internshipBatchApplyUrl?.trim() ?? null;
    } catch {
      internships = [];
      filterDomains = [];
      batchApplyUrl = null;
    }
  }

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
                  <span>Internships</span>
                </li>
              </ul>
              <h2>
                Browse <span>Internships</span>
              </h2>
              <p className="text-secondary mt-2 mb-2" style={{ maxWidth: "600px" }}>
                Compare mentor-led tracks, filter by domain and region, and apply when your timing aligns with the next
                batch.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-area pt-5 pb-120 bg-f7f7f7">
        <div className="container mw-1345">
          <FilterBar
            key={`${sp.domain ?? ""}-${sp.region ?? ""}-${sp.duration ?? ""}`}
            domains={filterDomains}
            initialDomain={sp.domain?.trim() ?? ""}
            initialRegion={sp.region?.trim() ?? ""}
            initialDuration={sp.duration?.trim() ?? ""}
          />

          {internships.length === 0 ? (
            <p className="text-secondary text-center mb-5">
              {isSanityConfigured()
                ? "No internships match your filters yet. Adjust filters or check back soon."
                : "Connect Sanity (set NEXT_PUBLIC_SANITY_PROJECT_ID) and publish internship documents to list live tracks here."}
            </p>
          ) : (
            <div className="row g-4 mb-5">
              {internships.map((row) => (
                <div key={row._id} className="col-lg-4 col-md-6 d-flex">
                  <InternshipIntroCard internship={row} />
                </div>
              ))}
            </div>
          )}

          <div className="d-flex flex-wrap align-items-center gap-3">
            <Link href="/domains" className="main-btn black">
              Browse all domains
            </Link>
          </div>

          <div className="mt-5">
            <StartDateSelector applyUrl={batchApplyUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
