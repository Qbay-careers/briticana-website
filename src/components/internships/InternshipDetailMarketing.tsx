import Image from "next/image";
import Link from "next/link";

import InternshipIntroCard from "@/components/marketing/InternshipIntroCard";
import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import { splitInternshipTitle } from "@/lib/splitInternshipTitle";
import { urlForSanityImage } from "@/lib/sanity/image";
import type { Internship, InternshipApplicationStatus } from "@/lib/sanity/types";
import { buildApplyHref } from "@/lib/studentApplicationForm";

export type InternshipDetailMarketingProps = {
  internship: Internship;
  related: Internship[];
};

function truncateForBreadcrumb(title: string, max = 52): string {
  const t = title.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function detailStatusLabel(status: InternshipApplicationStatus | undefined): string {
  switch (status) {
    case "open":
      return "Applications open";
    case "closed":
      return "Applications closed";
    case "coming-soon":
      return "Coming soon";
    default:
      return "Status";
  }
}

function formatBatch(batchStartDate: string | undefined): string {
  if (!batchStartDate) return "TBC";
  return new Date(batchStartDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function statusMetaClass(status: InternshipApplicationStatus | undefined): { icon: string; text: string } {
  switch (status) {
    case "open":
      return { icon: "ri-checkbox-circle-line text-success", text: "text-body" };
    case "closed":
      return { icon: "ri-close-circle-line text-danger", text: "text-body" };
    case "coming-soon":
      return { icon: "ri-timer-line text-warning", text: "text-body" };
    default:
      return { icon: "ri-information-line text-secondary", text: "text-secondary" };
  }
}

export default function InternshipDetailMarketing({ internship, related }: InternshipDetailMarketingProps) {
  const imgUrl = urlForSanityImage(internship.featuredImage, 1100);
  const domainSlug = internship.domain?.slug?.current?.trim();
  const domainFilterHref = domainSlug ? `/internships?domain=${encodeURIComponent(domainSlug)}` : null;
  const domainLabel = internshipDomainLabel(internship.domain ?? undefined);
  const showApply = internship.applicationStatus === "open";
  const applyHref = showApply
    ? buildApplyHref({ internship: internship.title, domain: domainLabel, source: "internship-detail" })
    : undefined;
  const { main, subtitle } = splitInternshipTitle(internship.title);
  const statusMeta = statusMetaClass(internship.applicationStatus);

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
                  <Link href="/internships">Internships</Link>
                </li>
                <li>
                  <span>{truncateForBreadcrumb(internship.title)}</span>
                </li>
              </ul>
              <h2 className="mb-3">
                {main}
                {subtitle ? (
                  <>
                    {" "}
                    <span className="internship-detail-banner__subtitle">— {subtitle}</span>
                  </>
                ) : null}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="course-details-area pt-100 pb-120 bg-f7f7f7">
        <div className="container mw-1345">
          <div className="course-title text-center internship-detail-title">
            {/* <h2 className="mb-0">{internship.title}</h2> */}
            <ul className="p-0 m-0 list-unstyled d-flex flex-wrap justify-content-center align-items-center gap-md-4 gap-2 mt-3">
              <li className="d-flex align-items-center gap-1">
                <i className={`${statusMeta.icon} lh-1`} aria-hidden />
                <span className={`fw-semibold ${statusMeta.text}`}>{detailStatusLabel(internship.applicationStatus)}</span>
              </li>
              <li className="d-flex align-items-center gap-1 text-secondary">
                <i className="ri-calendar-event-line lh-1" aria-hidden />
                <span>Next batch: {formatBatch(internship.batchStartDate)}</span>
              </li>
              {domainFilterHref ? (
                <li>
                  <Link
                    href={domainFilterHref}
                    className="d-flex text-decoration-none align-items-center gap-2 text-secondary"
                  >
                    <i className="ri-folder-user-line lh-1" aria-hidden />
                    <span>Domain: {domainLabel}</span>
                  </Link>
                </li>
              ) : (
                <li className="d-flex align-items-center gap-1 text-secondary">
                  <i className="ri-folder-user-line lh-1" aria-hidden />
                  <span>Domain: {domainLabel}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="course-details-content internship-detail-content bg-white rounded-4 p-4 p-lg-5">
                {imgUrl ? (
                  <div className="ratio ratio-21x9 mb-4 rounded-3 overflow-hidden bg-body-secondary position-relative internship-detail-hero">
                    <Image
                      src={imgUrl}
                      alt=""
                      fill
                      className="object-fit-cover"
                      sizes="(max-width: 991px) 100vw, 860px"
                      priority
                    />
                  </div>
                ) : null}

                {internship.overview ? (
                  <>
                    <h2>Overview</h2>
                    <p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                      {internship.overview}
                    </p>
                  </>
                ) : null}

                {internship.skillsCovered?.length ? (
                  <>
                    <h2>Skills covered</h2>
                    <ul className="mb-0">
                      {internship.skillsCovered.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {internship.toolsUsed?.length ? (
                  <>
                    <h2>Tools used</h2>
                    <ul className="mb-0">
                      {internship.toolsUsed.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {internship.projectStructure ? (
                  <>
                    <h2>Project structure</h2>
                    <p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                      {internship.projectStructure}
                    </p>
                  </>
                ) : null}

                {internship.certificationDetails ? (
                  <>
                    <h2>Certification</h2>
                    <p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                      {internship.certificationDetails}
                    </p>
                  </>
                ) : null}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="course-details-sidebar internship-detail-sidebar">
                <p className="small text-secondary text-uppercase fw-semibold mb-2">Program</p>
                <p className="fw-bold fs-4 mb-1">{domainLabel}</p>
                <p className="text-secondary small mb-4">Mentor-led internship track</p>

                {applyHref ? (
                  <Link
                    className="main-btn rounded-3 gap-2 d-flex justify-content-center align-items-center w-100"
                    href={applyHref}
                  >
                    <span>Apply now</span>
                    <i className="ri-arrow-right-long-line lh-1" aria-hidden />
                  </Link>
                ) : (
                  <Link
                    href="/internships"
                    className="main-btn black rounded-3 gap-2 d-flex justify-content-center align-items-center w-100"
                  >
                    <span>Browse internships</span>
                    <i className="ri-arrow-right-long-line lh-1" aria-hidden />
                  </Link>
                )}

                <ul className="p-0 m-0 list-unstyled internship-detail-sidebar-meta">
                  <li className="d-flex justify-content-between align-items-start gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="ri-folder-user-line fs-5 text-secondary" aria-hidden />
                      <span className="label">Domain</span>
                    </div>
                    <span className="text-secondary text-end">
                      {domainFilterHref ? (
                        <Link href={domainFilterHref} className="text-decoration-none">
                          {domainLabel}
                        </Link>
                      ) : (
                        domainLabel
                      )}
                    </span>
                  </li>
                  {internship.availableRegions?.length ? (
                    <li className="d-flex justify-content-between align-items-start gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <i className="ri-map-pin-line fs-5 text-secondary" aria-hidden />
                        <span className="label">Regions</span>
                      </div>
                      <span className="text-secondary text-end">{internship.availableRegions.join(", ")}</span>
                    </li>
                  ) : null}
                  {internship.durationOptions?.length ? (
                    <li className="d-flex justify-content-between align-items-start gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <i className="ri-time-line fs-5 text-secondary" aria-hidden />
                        <span className="label">Durations</span>
                      </div>
                      <span className="text-secondary text-end">{internship.durationOptions.join(", ")}</span>
                    </li>
                  ) : null}
                  <li className="d-flex justify-content-between align-items-start gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="ri-calendar-event-line fs-5 text-secondary" aria-hidden />
                      <span className="label">Next batch</span>
                    </div>
                    <span className="text-secondary text-end">{formatBatch(internship.batchStartDate)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {related.length > 0 ? (
            <div className="mt-5 pt-4 border-top">
              <div className="section-title mw-100 text-center mx-auto mb-4">
                <div className="position-relative z-1">
                  <h2>
                    More in <span>this domain</span>
                  </h2>
                  <p className="text-secondary col-lg-8 mx-auto mt-3 mb-0">
                    Comparable tracks you may want to review before you apply.
                  </p>
                </div>
              </div>
              <div className="row g-4">
                {related.map((r) => (
                  <div key={r._id} className="col-md-6 d-flex">
                    <InternshipIntroCard internship={r} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
