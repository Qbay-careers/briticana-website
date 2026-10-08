import Link from "next/link";
import type { CSSProperties } from "react";

import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import type { EnrichedInternship } from "@/lib/internships/internshipContentApi";
import { clarifyInternshipForCard } from "@/lib/internships/internshipRoleClarifier";
import type { InternshipApplicationStatus } from "@/lib/sanity/types";
import { buildApplyHref } from "@/lib/studentApplicationForm";

export type InternshipIntroCardProps = {
  internship: EnrichedInternship;
  defaultDurationLabel?: string;
  defaultCtaText?: string;
};

function statusBadgeText(status: InternshipApplicationStatus | undefined): string {
  switch (status) {
    case "open":
      return "Internship • Open";
    case "coming-soon":
      return "Internship • Soon";
    case "closed":
      return "Internship • Closed";
    default:
      return "Internship";
  }
}

export default function InternshipIntroCard({
  internship,
  defaultDurationLabel,
  defaultCtaText,
}: InternshipIntroCardProps) {
  const slug = internship.slug?.current?.trim();
  const detailHref = slug ? `/internships/${slug}` : "/internships";
  const domainLabel = internshipDomainLabel(internship.domain ?? undefined);
  const info = clarifyInternshipForCard(internship, defaultDurationLabel);
  const { visual } = info;

  const applyLabel =
    internship.customCtaButtonText?.trim() || defaultCtaText?.trim() || "Apply Now";
  const applyHref = buildApplyHref({
    internship: info.cleanTitle,
    domain: domainLabel,
    source: "internship-card",
  });

  const cardVars = {
    "--role-accent": visual.accent,
    "--role-accent-secondary": visual.accentSecondary,
    "--role-icon-bg": visual.iconBg,
    "--role-icon-border": visual.iconBorder,
    "--role-badge-bg": visual.badgeBg,
    "--role-badge-text": visual.badgeText,
    "--role-border-hover": visual.cardHoverBorder,
    "--role-glow": visual.cardGlow,
    "--role-top-bar": visual.topBar,
  } as CSSProperties;

  const isOpen = (internship.applicationStatus ?? "open") === "open";

  return (
    <article className="briti-role-card h-100 w-100 d-flex flex-column" style={cardVars}>
      {/* 1. Top Area: Professional Role Icon + Category Name + Small "Internship" Badge */}
      <div className="briti-role-card__top">
        <div className="briti-role-card__category-wrap">
          <div className="briti-role-card__icon" aria-hidden="true">
            {visual.icon}
          </div>
          <div className="briti-role-card__category-text">
            <span className="briti-role-card__category-label">{info.categoryDisplay}</span>
            {info.specialization ? (
              <span className="briti-role-card__spec-label">{info.specialization}</span>
            ) : null}
          </div>
        </div>

        <span
          className={`briti-role-card__badge${
            isOpen ? " briti-role-card__badge--open" : ""
          }`}
        >
          <span className="briti-role-card__badge-dot" aria-hidden="true" />
          {statusBadgeText(internship.applicationStatus)}
        </span>
      </div>

      {/* 2. Role Heading & Plain-English Explanation ("What the role actually means") */}
      <div className="briti-role-card__intro">
        <h3 className="briti-role-card__title">
          <Link href={detailHref} className="briti-role-card__title-link text-decoration-none">
            {info.cleanTitle}
          </Link>
        </h3>
        <p className="briti-role-card__explanation">{info.plainExplanation}</p>
      </div>

      {/* 3. Clear Meta Specs: Duration • Next Batch • Location • Level */}
      <div className="briti-role-card__meta" aria-label="Internship key details">
        <div className="briti-role-card__meta-item">
          <svg
            className="briti-role-card__meta-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>
            <strong>Duration:</strong> {info.durationLabel}
          </span>
        </div>

        <div className="briti-role-card__meta-item briti-role-card__meta-item--batch">
          <svg
            className="briti-role-card__meta-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="16"
              rx="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 3v4M16 3v4M3 10h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>
            <strong>Next batch:</strong>{" "}
            <span className="briti-role-card__batch-val">{info.nextBatchLabel}</span>
          </span>
        </div>

        <div className="briti-role-card__meta-item">
          <svg
            className="briti-role-card__meta-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>
            <strong>Location:</strong> {info.locationLabel}
          </span>
        </div>

        <div className="briti-role-card__meta-item">
          <svg
            className="briti-role-card__meta-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
          <span>
            <strong>Level:</strong> {info.levelLabel}
          </span>
        </div>
      </div>

      {/* 4. What You'll Learn */}
      <div className="briti-role-card__learn">
        <p className="briti-role-card__learn-heading">What you&apos;ll learn</p>
        <div className="briti-role-card__learn-tags">
          {info.learnSkills.map((skill, idx) => (
            <span key={skill} className="briti-role-card__learn-tag">
              {idx > 0 ? (
                <span className="briti-role-card__learn-sep" aria-hidden="true">
                  •
                </span>
              ) : null}
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 5. Footer CTA */}
      <div className="briti-role-card__footer mt-auto">
        <Link href={detailHref} className="briti-role-card__view-btn text-decoration-none">
          <span>View Internship</span>
          <i className="ri-arrow-right-line briti-role-card__view-arrow" aria-hidden="true" />
        </Link>

        <Link href={applyHref} className="briti-role-card__apply-link text-decoration-none">
          <span>{applyLabel}</span>
          <i className="ri-send-plane-fill briti-role-card__apply-icon" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
