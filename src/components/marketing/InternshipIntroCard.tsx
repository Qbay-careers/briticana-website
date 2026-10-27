import Link from "next/link";
import type { CSSProperties } from "react";

import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import type { EnrichedInternship } from "@/lib/internships/internshipContentApi";
import { clarifyInternshipForCard } from "@/lib/internships/internshipRoleClarifier";
import {
  GOOGLE_CAREERS_DUBLIN_URL,
  isGoogleInternship,
} from "@/lib/internships/supplementalTracks";
import { buildGoogleApplyHref } from "@/lib/googleInternships";
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

function GoogleLogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function InternshipIntroCard({
  internship,
  defaultDurationLabel,
  defaultCtaText,
}: InternshipIntroCardProps) {
  const isGoogle = isGoogleInternship(internship);
  const slug = internship.slug?.current?.trim();
  const detailHref = slug ? `/internships/${slug}` : "/internships";
  const domainLabel = internshipDomainLabel(internship.domain ?? undefined);
  const info = clarifyInternshipForCard(internship, defaultDurationLabel);
  const { visual } = info;

  const defaultApplyText = isGoogle ? "Apply via Google" : "Apply Now";
  const applyLabel =
    internship.customCtaButtonText?.trim() || defaultCtaText?.trim() || defaultApplyText;

  const googleApplyUrl = buildGoogleApplyHref(info.cleanTitle);
  const standardApplyHref = buildApplyHref({
    internship: info.cleanTitle,
    domain: domainLabel,
    source: "internship-card",
  });

  const cardVars = {
    "--role-accent": isGoogle ? "#4285F4" : visual.accent,
    "--role-accent-secondary": isGoogle ? "#34A853" : visual.accentSecondary,
    "--role-icon-bg": isGoogle ? "#ffffff" : visual.iconBg,
    "--role-icon-border": isGoogle ? "rgba(66, 133, 244, 0.3)" : visual.iconBorder,
    "--role-badge-bg": isGoogle ? "rgba(66, 133, 244, 0.12)" : visual.badgeBg,
    "--role-badge-text": isGoogle ? "#1a73e8" : visual.badgeText,
    "--role-border-hover": isGoogle ? "rgba(66, 133, 244, 0.45)" : visual.cardHoverBorder,
    "--role-glow": isGoogle ? "rgba(66, 133, 244, 0.22)" : visual.cardGlow,
    "--role-top-bar": isGoogle
      ? "linear-gradient(90deg, #4285F4 0% 25%, #EA4335 25% 50%, #FBBC05 50% 75%, #34A853 75% 100%)"
      : visual.topBar,
  } as CSSProperties;

  const isOpen = (internship.applicationStatus ?? "open") === "open";

  return (
    <article
      className={`briti-role-card ${
        isGoogle ? "briti-role-card--google " : ""
      }h-100 w-100 d-flex flex-column`}
      style={cardVars}
    >
      {/* Google 4-Color Signature Rainbow Accent Bar */}
      {isGoogle && (
        <div className="briti-google-card-top-bar" aria-hidden="true" />
      )}

      {/* 1. Top Area: Role Icon / Google G Logo + Category Name + Small Badge */}
      <div className="briti-role-card__top">
        <div className="briti-role-card__category-wrap">
          <div
            className={`briti-role-card__icon ${
              isGoogle ? "briti-role-card__icon--google" : ""
            }`}
            aria-hidden="true"
          >
            {isGoogle ? <GoogleLogoIcon /> : visual.icon}
          </div>
          <div className="briti-role-card__category-text">
            <span
              className={`briti-role-card__category-label ${
                isGoogle ? "briti-role-card__category-label--google" : ""
              }`}
            >
              {isGoogle ? "Google Dublin • EMEA HQ" : info.categoryDisplay}
            </span>
            <span
              className={`briti-role-card__spec-label ${
                isGoogle ? "briti-role-card__spec-label--google" : ""
              }`}
            >
              {isGoogle ? "Official 2027 Cohort 🇮🇪" : info.specialization || "Structured Program"}
            </span>
          </div>
        </div>

        <span
          className={`briti-role-card__badge${
            isOpen ? " briti-role-card__badge--open" : ""
          }${isGoogle ? " briti-role-card__badge--google" : ""}`}
        >
          <span className="briti-role-card__badge-dot" aria-hidden="true" />
          {isGoogle ? "Google • Open" : statusBadgeText(internship.applicationStatus)}
        </span>
      </div>

      {/* 2. Role Heading & Plain-English Explanation */}
      <div className="briti-role-card__intro">
        <h3 className="briti-role-card__title">
          <Link
            href={detailHref}
            className={`briti-role-card__title-link text-decoration-none ${
              isGoogle ? "briti-role-card__title-link--google" : ""
            }`}
          >
            {info.cleanTitle}
          </Link>
        </h3>
        <p className="briti-role-card__explanation">{info.plainExplanation}</p>
      </div>

      {/* 3. Clear Meta Specs: Duration • Next Batch • Location • Level */}
      <div
        className={`briti-role-card__meta ${
          isGoogle ? "briti-role-card__meta--google" : ""
        }`}
        aria-label="Internship key details"
      >
        <div className="briti-role-card__meta-item">
          <svg
            className={`briti-role-card__meta-icon ${
              isGoogle ? "briti-role-card__meta-icon--google-duration" : ""
            }`}
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
            <strong>Duration:</strong>{" "}
            {isGoogle ? "12–16 Weeks" : info.durationLabel}
          </span>
        </div>

        <div className="briti-role-card__meta-item briti-role-card__meta-item--batch">
          <svg
            className={`briti-role-card__meta-icon ${
              isGoogle ? "briti-role-card__meta-icon--google-batch" : ""
            }`}
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
            <span
              className={`briti-role-card__batch-val ${
                isGoogle ? "briti-role-card__batch-val--google" : ""
              }`}
            >
              {isGoogle ? "Closes Nov 13 • Summer 2027" : info.nextBatchLabel}
            </span>
          </span>
        </div>

        <div className="briti-role-card__meta-item">
          <svg
            className={`briti-role-card__meta-icon ${
              isGoogle ? "briti-role-card__meta-icon--google-location" : ""
            }`}
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
            <strong>Location:</strong>{" "}
            {isGoogle ? "Dublin, Ireland 🇮🇪" : info.locationLabel}
          </span>
        </div>

        <div className="briti-role-card__meta-item">
          <svg
            className={`briti-role-card__meta-icon ${
              isGoogle ? "briti-role-card__meta-icon--google-level" : ""
            }`}
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
            <strong>Level:</strong>{" "}
            {isGoogle ? "Degree / Penultimate / Masters" : info.levelLabel}
          </span>
        </div>
      </div>

      {/* 4. What You'll Learn / Core Focus & Skills */}
      <div className="briti-role-card__learn">
        <p
          className={`briti-role-card__learn-heading ${
            isGoogle ? "briti-role-card__learn-heading--google" : ""
          }`}
        >
          {isGoogle ? "Core Focus & Skills" : "What you'll learn"}
        </p>
        <div
          className={`briti-role-card__learn-tags ${
            isGoogle ? "briti-role-card__learn-tags--google" : ""
          }`}
        >
          {info.learnSkills.map((skill, idx) => (
            <span
              key={skill}
              className={`briti-role-card__learn-tag ${
                isGoogle ? "briti-role-card__learn-tag--google" : ""
              }`}
            >
              {!isGoogle && idx > 0 ? (
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
          <span>{isGoogle ? "View Details" : "View Internship"}</span>
          <i className="ri-arrow-right-line briti-role-card__view-arrow" aria-hidden="true" />
        </Link>

        {isGoogle ? (
          <Link
            href={googleApplyUrl}
            className="briti-role-card__apply-link briti-role-card__apply-link--google text-decoration-none"
          >
            <span>{applyLabel}</span>
            <i className="ri-arrow-right-up-line briti-role-card__apply-icon" aria-hidden="true" />
          </Link>
        ) : (
          <Link href={standardApplyHref} className="briti-role-card__apply-link text-decoration-none">
            <span>{applyLabel}</span>
            <i className="ri-send-plane-fill briti-role-card__apply-icon" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
