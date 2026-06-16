import Link from "next/link";

import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import { splitInternshipTitle } from "@/lib/splitInternshipTitle";
import type { Internship, InternshipApplicationStatus } from "@/lib/sanity/types";
import { resolveStudentApplyUrl } from "@/lib/studentApplicationForm";

export type InternshipIntroCardProps = {
  internship: Internship;
};

function statusLabel(status: InternshipApplicationStatus | undefined): string {
  switch (status) {
    case "open":
      return "Open";
    case "closed":
      return "Closed";
    case "coming-soon":
      return "Coming soon";
    default:
      return "Internship";
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

export default function InternshipIntroCard({ internship }: InternshipIntroCardProps) {
  const slug = internship.slug?.current?.trim();
  const detailHref = slug ? `/internships/${slug}` : "/internships";
  const domainLabel = internshipDomainLabel(internship.domain ?? undefined);
  const { main, subtitle } = splitInternshipTitle(internship.title);
  const skills = internship.skillsCovered?.slice(0, 3) ?? [];
  const duration = internship.durationOptions?.length ? internship.durationOptions.join(" / ") : null;
  const applyHref = resolveStudentApplyUrl(internship.googleFormLink);

  return (
    <article className="internship-intro-card bg-white rounded-4 shadow-sm p-4 p-lg-4 h-100 w-100 d-flex flex-column">
      <p className="internship-intro-card__kicker small text-secondary text-uppercase mb-2">
        {domainLabel} Internship
      </p>

      <h3 className="mb-1">
        <Link href={detailHref} className="internship-intro-card__title fw-bold text-decoration-none">
          {main}
        </Link>
      </h3>
      {subtitle ? (
        <p className="internship-intro-card__subtitle fw-semibold mb-3">{subtitle}</p>
      ) : (
        <div className="mb-3" />
      )}

      <div className="d-flex flex-wrap gap-2 mb-3">
        {duration ? (
          <span className="internship-intro-card__pill internship-intro-card__pill--duration">{duration}</span>
        ) : null}
        <span className="internship-intro-card__pill internship-intro-card__pill--status">
          {statusLabel(internship.applicationStatus)}
        </span>
      </div>

      {internship.overview ? (
        <p className="small text-secondary mb-3 internship-intro-card__overview">{internship.overview}</p>
      ) : null}

      {skills.length > 0 ? (
        <div className="mb-4">
          <p className="fw-bold mb-2">What You&apos;ll Learn</p>
          <ul className="internship-intro-card__learn list-unstyled small text-secondary mb-0">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="internship-intro-card__divider mt-auto pt-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
          <span className="small text-secondary d-block">Next batch</span>
          <span className="fw-bold">{formatBatch(internship.batchStartDate)}</span>
        </div>
        <a className="main-btn" href={applyHref} target="_blank" rel="noopener noreferrer">
          Apply Now
        </a>
      </div>
    </article>
  );
}
