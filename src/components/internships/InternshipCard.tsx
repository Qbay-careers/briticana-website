import Link from "next/link";

import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import type { Internship, InternshipApplicationStatus } from "@/lib/sanity/types";

import StatusBadge from "@/components/shared/StatusBadge";

export type InternshipCardProps = {
  internship: Internship;
};

function statusVariant(status: InternshipApplicationStatus | undefined): "success" | "warning" | "danger" | "secondary" | "info" {
  switch (status) {
    case "open":
      return "success";
    case "coming-soon":
      return "warning";
    case "closed":
      return "danger";
    default:
      return "secondary";
  }
}

function statusLabel(status: InternshipApplicationStatus | undefined): string {
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

export default function InternshipCard({ internship }: InternshipCardProps) {
  const slug = internship.slug?.current;
  const detailHref = slug ? `/internships/${slug}` : "/internships";
  const regions = internship.availableRegions?.length ? internship.availableRegions.join(", ") : "—";
  const durations = internship.durationOptions?.length ? internship.durationOptions.join(", ") : "—";
  const batch = internship.batchStartDate
    ? new Date(internship.batchStartDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBC";

  return (
    <div className="card shadow-sm h-100" data-component="InternshipCard">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <span className="small text-uppercase text-secondary">{internshipDomainLabel(internship.domain)}</span>
          <StatusBadge label={statusLabel(internship.applicationStatus)} variant={statusVariant(internship.applicationStatus)} />
        </div>
        <h2 className="h5 card-title">
          <Link href={detailHref} className="stretched-link text-decoration-none text-body">
            {internship.title}
          </Link>
        </h2>
        <p className="small text-secondary mb-2">
          <span className="fw-semibold text-body">Regions:</span> {regions}
        </p>
        <p className="small text-secondary mb-2">
          <span className="fw-semibold text-body">Durations:</span> {durations}
        </p>
        <p className="small text-secondary mb-3">
          <span className="fw-semibold text-body">Next batch:</span> {batch}
        </p>
        {internship.overview ? <p className="small text-secondary mb-0 flex-grow-1">{internship.overview.slice(0, 180)}{internship.overview.length > 180 ? "…" : ""}</p> : null}
      </div>
    </div>
  );
}
