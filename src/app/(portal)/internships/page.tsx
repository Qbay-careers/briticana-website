import type { Metadata } from "next";

import FilterBar from "@/components/internships/FilterBar";
import InternshipsExplorerSection from "@/components/internships/InternshipsExplorerSection";
import InternshipSectionIntro from "@/components/internships/InternshipSectionIntro";
import StartDateSelector from "@/components/internships/StartDateSelector";
import {
  DEFAULT_OVERVIEW_CONTENT,
  dbContentToInternship,
  fetchAllInternshipContent,
  mergeInternshipWithDbContent,
  type EnrichedInternship,
} from "@/lib/internships/internshipContentApi";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getAllInternshipDomains, getInternshipsFiltered } from "@/lib/sanity/queries";
import type { Internship, InternshipDomainDoc } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Explore real-world internship opportunities designed to help you build practical skills, gain experience and become career-ready.",
};

type InternshipsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

/** Next.js may pass a query value as `string` or `string[]`; normalize so `.trim()` never throws. */
function searchParamFirst(v: string | string[] | undefined): string {
  if (v === undefined) return "";
  const raw = Array.isArray(v) ? v[0] : v;
  return typeof raw === "string" ? raw.trim() : "";
}

export default async function InternshipsPage({ searchParams }: InternshipsPageProps) {
  const sp = searchParams ?? {};
  const domain = searchParamFirst(sp.domain);
  const region = searchParamFirst(sp.region);
  const duration = searchParamFirst(sp.duration);

  const [allDbContent, sanityBundle] = await Promise.all([
    fetchAllInternshipContent(),
    (async () => {
      if (!isSanityConfigured()) {
        return { internships: [] as Internship[], domains: [] as InternshipDomainDoc[] };
      }
      try {
        const [fetchedInternships, fetchedDomains] = await Promise.all([
          client.fetch<Internship[]>(
            getInternshipsFiltered,
            { domain, region, duration },
            { cache: "no-store" },
          ),
          client.fetch<InternshipDomainDoc[]>(getAllInternshipDomains, {}, { cache: "no-store" }),
        ]);
        return { internships: fetchedInternships, domains: fetchedDomains };
      } catch {
        return { internships: [] as Internship[], domains: [] as InternshipDomainDoc[] };
      }
    })(),
  ]);

  const overviewContent =
    allDbContent.find((item) => item.page_key === "internships-overview") ??
    DEFAULT_OVERVIEW_CONTENT;

  const dbTrackMap = new Map(
    allDbContent
      .filter((item) => item.page_type === "track")
      .map((item) => [item.page_key, item]),
  );

  let internships: EnrichedInternship[] = sanityBundle.internships.map((row) => {
    const slug = row.slug?.current?.trim() || "";
    return mergeInternshipWithDbContent(row, dbTrackMap.get(slug));
  });

  if (internships.length === 0 && !domain && !region && !duration && dbTrackMap.size > 0) {
    internships = Array.from(dbTrackMap.values())
      .filter((item) => item.application_status === "open")
      .map((item) => dbContentToInternship(item));
  }

  const filterDomains = sanityBundle.domains;

  return (
    <>
      <section className="briti-internships-page-hero">
        <div className="container mw-1380">
          <InternshipSectionIntro
            showBreadcrumbs={true}
            customHeading={overviewContent.heading}
            customDescription={overviewContent.description}
            durationBadge={overviewContent.duration}
          />
        </div>
      </section>

      <section className="courses-area briti-internship-section briti-internship-section--page">
        <div className="container mw-1380">
          <InternshipsExplorerSection
            internships={internships}
            defaultDurationLabel={overviewContent.duration}
            defaultCtaText={overviewContent.cta_button_text}
            isHomePreview={false}
            advancedFilterSlot={
              <FilterBar
                key={`${domain}-${region}-${duration}`}
                domains={filterDomains}
                initialDomain={domain}
                initialRegion={region}
                initialDuration={duration}
              />
            }
          />

          {overviewContent.program_details ||
          overviewContent.learning_outcomes?.length ||
          overviewContent.responsibilities?.length ||
          overviewContent.skills_and_requirements?.length ||
          overviewContent.eligibility_information ? (
            <div
              className="briti-program-overview-card mt-5"
              data-component="InternshipsProgramOverview"
            >
              <div className="row g-4">
                <div className="col-lg-6">
                  <span className="small text-uppercase fw-semibold text-secondary d-block mb-1">
                    Program Structure &amp; Duration ({overviewContent.duration})
                  </span>
                  <h3 className="h4 fw-bold mb-3">{overviewContent.title}</h3>
                  {overviewContent.program_details ? (
                    <p className="text-secondary mb-3" style={{ whiteSpace: "pre-wrap" }}>
                      {overviewContent.program_details}
                    </p>
                  ) : null}
                  {overviewContent.eligibility_information ? (
                    <div className="small text-secondary">
                      <span className="fw-semibold text-dark">Eligibility &amp; Regions: </span>
                      <span>{overviewContent.eligibility_information}</span>
                    </div>
                  ) : null}
                </div>
                <div className="col-lg-6">
                  <div className="row g-3">
                    {overviewContent.learning_outcomes?.length ? (
                      <div className="col-sm-6">
                        <p className="fw-bold small text-uppercase text-secondary mb-2">
                          Learning Outcomes
                        </p>
                        <ul className="list-unstyled small text-secondary mb-0 d-flex flex-column gap-1">
                          {overviewContent.learning_outcomes.map((item) => (
                            <li key={item} className="d-flex align-items-start gap-2">
                              <i
                                className="ri-checkbox-circle-fill text-success mt-1"
                                aria-hidden
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {overviewContent.responsibilities?.length ? (
                      <div className="col-sm-6">
                        <p className="fw-bold small text-uppercase text-secondary mb-2">
                          Responsibilities
                        </p>
                        <ul className="list-unstyled small text-secondary mb-0 d-flex flex-column gap-1">
                          {overviewContent.responsibilities.map((item) => (
                            <li key={item} className="d-flex align-items-start gap-2">
                              <i className="ri-check-line text-primary mt-1" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {overviewContent.skills_and_requirements?.length ? (
                      <div className="col-12 pt-2 border-top">
                        <p className="fw-bold small text-uppercase text-secondary mb-2">
                          Skills &amp; Requirements
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          {overviewContent.skills_and_requirements.map((skill) => (
                            <span
                              key={skill}
                              className="internship-intro-card__pill internship-intro-card__pill--status"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-5">
            <StartDateSelector overviewContent={overviewContent} />
          </div>
        </div>
      </section>
    </>
  );
}
