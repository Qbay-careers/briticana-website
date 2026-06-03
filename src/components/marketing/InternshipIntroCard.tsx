import Link from "next/link";

import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import type { Internship, InternshipApplicationStatus } from "@/lib/sanity/types";

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

/** Split "Data Analyst — Advanced Analytics…" into a short title + descriptive subtitle. */
function splitTitle(title: string): { main: string; subtitle?: string } {
  const match = title.split(/\s[—–-]\s/);
  if (match.length > 1) {
    const [main, ...rest] = match;
    return { main: main.trim(), subtitle: rest.join(" — ").trim() };
  }
  return { main: title.trim() };
}

function formatBatch(batchStartDate: string | undefined): string {
  if (!batchStartDate) return "TBC";
  return new Date(batchStartDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildApplyUrl(base: string | undefined, title: string): string | undefined {
  const b = base?.trim();
  if (!b) return undefined;
  try {
    const u = new URL(b);
    u.searchParams.set("internship_title", title);
    return u.toString();
  } catch {
    return `${b}${b.includes("?") ? "&" : "?"}internship_title=${encodeURIComponent(title)}`;
  }
}

export default function InternshipIntroCard({ internship }: InternshipIntroCardProps) {
  const slug = internship.slug?.current?.trim();
  const detailHref = slug ? `/internships/${slug}` : "/internships";
  const domainLabel = internshipDomainLabel(internship.domain ?? undefined);
  const { main, subtitle } = splitTitle(internship.title);
  const skills = internship.skillsCovered?.slice(0, 3) ?? [];
  const duration = internship.durationOptions?.length ? internship.durationOptions.join(" / ") : null;
  const showApply =
    internship.applicationStatus === "open" && Boolean(internship.googleFormLink?.trim());
  const applyHref = showApply ? buildApplyUrl(internship.googleFormLink, internship.title) : undefined;

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
        {applyHref ? (
          <a className="main-btn" href={applyHref} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        ) : (
          <Link href={detailHref} className="main-btn">
            View details
          </Link>
        )}
      </div>
    </article>
  );
}
