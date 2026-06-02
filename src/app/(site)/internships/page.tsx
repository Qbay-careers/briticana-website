import BatchCalendar from "@/components/internships/BatchCalendar";
import FilterBar from "@/components/internships/FilterBar";
import InternshipCard from "@/components/internships/InternshipCard";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getAllInternships, getInternshipsFiltered } from "@/lib/sanity/queries";
import type { Internship } from "@/lib/sanity/types";

type InternshipsPageProps = {
  searchParams?: { domain?: string; region?: string; duration?: string };
};

export default async function InternshipsPage({ searchParams }: InternshipsPageProps) {
  const sp = searchParams ?? {};
  let internships: Internship[] = [];

  if (isSanityConfigured()) {
    try {
      const hasFilter = Boolean(sp.domain?.trim() || sp.region?.trim() || sp.duration?.trim());
      internships = await client.fetch<Internship[]>(
        hasFilter ? getInternshipsFiltered : getAllInternships,
        hasFilter
          ? {
              domain: sp.domain?.trim() ?? "",
              region: sp.region?.trim() ?? "",
              duration: sp.duration?.trim() ?? "",
            }
          : {},
      );
    } catch {
      internships = [];
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-3">Internships</h1>
      <p className="lead text-secondary col-lg-9">
        Browse Briticana&apos;s open mentor-led tracks, compare batch timing across regions, and apply when your domain and duration align with startup demand.
      </p>
      <FilterBar />
      {internships.length === 0 ? (
        <p className="text-secondary mb-5">
          {isSanityConfigured()
            ? "No internships match your filters yet. Adjust filters or check back soon."
            : "Connect Sanity (set NEXT_PUBLIC_SANITY_PROJECT_ID) and publish internship documents to list live tracks here."}
        </p>
      ) : (
        <div className="row g-4 mb-5">
          {internships.map((row) => (
            <div key={row._id} className="col-md-6 col-xl-4">
              <div className="position-relative h-100">
                <InternshipCard internship={row} />
              </div>
            </div>
          ))}
        </div>
      )}
      <BatchCalendar />
    </div>
  );
}
