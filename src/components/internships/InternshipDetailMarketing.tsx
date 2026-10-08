import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import InternshipIntroCard from "@/components/marketing/InternshipIntroCard";
import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import type { EnrichedInternship } from "@/lib/internships/internshipContentApi";
import {
  clarifyInternshipForCard,
  formatInternshipBatchDate,
  sanitizeInternshipText,
} from "@/lib/internships/internshipRoleClarifier";
import { urlForSanityImage } from "@/lib/sanity/image";
import type { InternshipApplicationStatus } from "@/lib/sanity/types";
import { buildApplyHref } from "@/lib/studentApplicationForm";

export type InternshipDetailMarketingProps = {
  internship: EnrichedInternship;
  related: EnrichedInternship[];
};

function truncateForBreadcrumb(title: string, max = 56): string {
  const t = sanitizeInternshipText(title);
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function detailStatusLabel(status: InternshipApplicationStatus | undefined): string {
  switch (status) {
    case "open":
      return "Applications Open";
    case "closed":
      return "Applications Closed";
    case "coming-soon":
      return "Coming Soon";
    default:
      return "Applications Open";
  }
}

export default function InternshipDetailMarketing({
  internship,
  related,
}: InternshipDetailMarketingProps) {
  const imgUrl = urlForSanityImage(internship.featuredImage, 1100);
  const domainSlug = internship.domain?.slug?.current?.trim();
  const domainFilterHref = domainSlug
    ? `/internships?domain=${encodeURIComponent(domainSlug)}`
    : "/internships";
  const domainLabel = internshipDomainLabel(internship.domain ?? undefined);
  const info = clarifyInternshipForCard(internship);
  const { visual } = info;

  const isOpen = (internship.applicationStatus ?? "open") === "open";
  const showApply = isOpen;
  const applyHref = showApply
    ? buildApplyHref({
        internship: info.cleanTitle,
        domain: domainLabel,
        source: "internship-detail",
      })
    : undefined;

  const introText =
    sanitizeInternshipText(internship.customIntroductoryText) ||
    "Mentor-led remote & hybrid internship track";
  const ctaButtonText =
    sanitizeInternshipText(internship.customCtaButtonText) || "Apply Now";
  const batchDateText = formatInternshipBatchDate(internship.batchStartDate);

  const cleanOverview = sanitizeInternshipText(internship.overview);
  const cleanProjectStructure = sanitizeInternshipText(internship.projectStructure);
  const cleanCertification = sanitizeInternshipText(internship.certificationDetails);
  const cleanInstructions = sanitizeInternshipText(internship.customApplicationInstructions);

  const rawTools = (internship.toolsUsed ?? [])
    .map((t) => sanitizeInternshipText(t))
    .filter(Boolean);
  const rawResponsibilities = (internship.customResponsibilities ?? [])
    .map((r) => sanitizeInternshipText(r))
    .filter(Boolean);

  // Combine role-clarified skills with any extra non-generic skills from the DB/CMS
  const rawSkills = (internship.skillsCovered ?? [])
    .map((s) => sanitizeInternshipText(s))
    .filter(Boolean);
  const displaySkills =
    rawSkills.length > 0 &&
    !(
      rawSkills[0]?.toLowerCase() === "data analysis" &&
      rawSkills[1]?.toLowerCase() === "documentation"
    )
      ? rawSkills
      : info.learnSkills;

  const heroVars = {
    "--detail-accent": visual.accent,
    "--detail-accent-secondary": visual.accentSecondary,
    "--detail-icon-bg": visual.iconBg,
    "--detail-icon-border": visual.iconBorder,
    "--detail-top-bar": visual.topBar,
    "--detail-glow": visual.cardGlow,
  } as CSSProperties;

  return (
    <div className="briti-detail-page" style={heroVars}>
      {/* 1. PREMIUM HERO BANNER */}
      <section className="briti-detail-hero">
        <div className="briti-detail-hero__grid-bg" aria-hidden="true" />
        <div className="container mw-1380 position-relative z-1">
          {/* Clean Sanitized Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="briti-detail-hero__breadcrumb-nav">
            <ol className="briti-detail-hero__breadcrumbs list-unstyled m-0 p-0">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true" className="briti-detail-hero__breadcrumb-sep">
                /
              </li>
              <li>
                <Link href="/internships">Internships</Link>
              </li>
              <li aria-hidden="true" className="briti-detail-hero__breadcrumb-sep">
                /
              </li>
              <li>
                <Link href={domainFilterHref}>{info.categoryDisplay}</Link>
              </li>
              <li aria-hidden="true" className="briti-detail-hero__breadcrumb-sep">
                /
              </li>
              <li aria-current="page" className="briti-detail-hero__breadcrumb-current">
                {truncateForBreadcrumb(info.cleanTitle)}
              </li>
            </ol>
          </nav>

          <div className="briti-detail-hero__layout">
            {/* Left Column: Badges, Executive Role Heading, Plain Explanation, Key Metrics & CTAs */}
            <div className="briti-detail-hero__main">
              <div className="briti-detail-hero__badges">
                <span className="briti-detail-hero__category-pill">
                  <span className="briti-detail-hero__category-icon" aria-hidden="true">
                    {visual.icon}
                  </span>
                  <span>{info.categoryDisplay}</span>
                </span>

                <span className="briti-detail-hero__track-pill">
                  <i className="ri-verified-badge-line" aria-hidden="true" />
                  <span>90-Day Mentor-Led Track</span>
                </span>

                <span
                  className={`briti-detail-hero__status-pill${
                    isOpen ? " briti-detail-hero__status-pill--open" : ""
                  }`}
                >
                  <span className="briti-detail-hero__status-dot" aria-hidden="true" />
                  <span>{detailStatusLabel(internship.applicationStatus)}</span>
                </span>
              </div>

              <h1 className="briti-detail-hero__title">
                {info.cleanTitle}
                {info.specialization ? (
                  <span className="briti-detail-hero__title-accent">
                    {" "}
                    — {info.specialization}
                  </span>
                ) : null}
              </h1>

              <p className="briti-detail-hero__lead">{info.plainExplanation}</p>

              {/* 4 Key Info Pills: Duration • Next Batch • Location • Level */}
              <div className="briti-detail-hero__metrics">
                <div className="briti-detail-hero__metric-card">
                  <span className="briti-detail-hero__metric-icon" aria-hidden="true">
                    <i className="ri-calendar-event-line" />
                  </span>
                  <div>
                    <span className="briti-detail-hero__metric-label">Next Batch</span>
                    <strong className="briti-detail-hero__metric-val">{batchDateText}</strong>
                  </div>
                </div>

                <div className="briti-detail-hero__metric-card">
                  <span className="briti-detail-hero__metric-icon" aria-hidden="true">
                    <i className="ri-time-line" />
                  </span>
                  <div>
                    <span className="briti-detail-hero__metric-label">Duration</span>
                    <strong className="briti-detail-hero__metric-val">{info.durationLabel}</strong>
                  </div>
                </div>

                <div className="briti-detail-hero__metric-card">
                  <span className="briti-detail-hero__metric-icon" aria-hidden="true">
                    <i className="ri-map-pin-2-line" />
                  </span>
                  <div>
                    <span className="briti-detail-hero__metric-label">Location &amp; Mode</span>
                    <strong className="briti-detail-hero__metric-val">{info.locationLabel}</strong>
                  </div>
                </div>

                <div className="briti-detail-hero__metric-card">
                  <span className="briti-detail-hero__metric-icon" aria-hidden="true">
                    <i className="ri-Focus-3-line ri-award-line" />
                  </span>
                  <div>
                    <span className="briti-detail-hero__metric-label">Experience Level</span>
                    <strong className="briti-detail-hero__metric-val">{info.levelLabel}</strong>
                  </div>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="briti-detail-hero__actions">
                {applyHref ? (
                  <Link href={applyHref} className="briti-detail-apply-btn text-decoration-none">
                    <span>{ctaButtonText}</span>
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                ) : null}

                <Link
                  href="/internships"
                  className="briti-detail-secondary-btn text-decoration-none"
                >
                  <i className="ri-layout-grid-line" aria-hidden="true" />
                  <span>Explore All Internships</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Glassmorphic Role Snapshot Card */}
            <div className="briti-detail-hero__aside">
              <div className="briti-detail-snapshot">
                <div className="briti-detail-snapshot__top">
                  <div className="briti-detail-snapshot__icon" aria-hidden="true">
                    {visual.icon}
                  </div>
                  <div>
                    <span className="briti-detail-snapshot__kicker">Role Career Snapshot</span>
                    <h2 className="briti-detail-snapshot__domain">{domainLabel}</h2>
                  </div>
                </div>

                <div className="briti-detail-snapshot__section">
                  <span className="briti-detail-snapshot__label">What you&apos;ll learn</span>
                  <div className="briti-detail-snapshot__skills">
                    {info.learnSkills.map((skill) => (
                      <span key={skill} className="briti-detail-snapshot__skill-chip">
                        <i className="ri-check-line" aria-hidden="true" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="briti-detail-snapshot__section">
                  <span className="briti-detail-snapshot__label">What you&apos;ll walk away with</span>
                  <ul className="briti-detail-snapshot__deliverables list-unstyled m-0 p-0">
                    <li>
                      <i className="ri-checkbox-circle-fill" aria-hidden="true" />
                      <span>Verified real-world project portfolio proof</span>
                    </li>
                    <li>
                      <i className="ri-checkbox-circle-fill" aria-hidden="true" />
                      <span>Structured mentor feedback &amp; practical reviews</span>
                    </li>
                    <li>
                      <i className="ri-checkbox-circle-fill" aria-hidden="true" />
                      <span>Official Briticana Internship Completion Certificate</span>
                    </li>
                  </ul>
                </div>

                <div className="briti-detail-snapshot__footer">
                  <div>
                    <span className="briti-detail-snapshot__batch-caption">Upcoming Intake</span>
                    <strong className="briti-detail-snapshot__batch-date">{batchDateText}</strong>
                  </div>
                  {applyHref ? (
                    <Link
                      href={applyHref}
                      className="briti-detail-snapshot__cta text-decoration-none"
                    >
                      <span>{ctaButtonText}</span>
                      <i className="ri-arrow-right-up-line" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT & STICKY SIDEBAR */}
      <section className="briti-detail-body">
        <div className="container mw-1380">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="briti-detail-content-card">
                {imgUrl ? (
                  <div className="ratio ratio-21x9 mb-4 rounded-4 overflow-hidden bg-body-secondary position-relative internship-detail-hero">
                    <Image
                      src={imgUrl}
                      alt={info.cleanTitle}
                      fill
                      className="object-fit-cover"
                      sizes="(max-width: 991px) 100vw, 860px"
                      priority
                    />
                  </div>
                ) : null}

                {/* Role Overview */}
                <div className="briti-detail-block">
                  <div className="briti-detail-block__head">
                    <span className="briti-detail-block__icon" aria-hidden="true">
                      <i className="ri-compass-3-line" />
                    </span>
                    <h2 className="briti-detail-block__title">Internship Overview</h2>
                  </div>
                  <p className="briti-detail-block__highlight">{info.plainExplanation}</p>
                  {cleanOverview && cleanOverview !== info.plainExplanation ? (
                    <p className="briti-detail-block__text mb-0" style={{ whiteSpace: "pre-wrap" }}>
                      {cleanOverview}
                    </p>
                  ) : null}
                </div>

                {/* Skills Covered */}
                {displaySkills.length > 0 ? (
                  <div className="briti-detail-block">
                    <div className="briti-detail-block__head">
                      <span className="briti-detail-block__icon" aria-hidden="true">
                        <i className="ri-lightbulb-flash-line" />
                      </span>
                      <h2 className="briti-detail-block__title">Skills You&apos;ll Gain</h2>
                    </div>
                    <div className="briti-detail-skills-grid">
                      {displaySkills.map((skill) => (
                        <div key={skill} className="briti-detail-skill-item">
                          <i className="ri-checkbox-circle-fill" aria-hidden="true" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Tools Used */}
                {rawTools.length > 0 ? (
                  <div className="briti-detail-block">
                    <div className="briti-detail-block__head">
                      <span className="briti-detail-block__icon" aria-hidden="true">
                        <i className="ri-tools-line" />
                      </span>
                      <h2 className="briti-detail-block__title">Tools &amp; Workflows</h2>
                    </div>
                    <div className="briti-detail-tools-wrap">
                      {rawTools.map((tool) => (
                        <span key={tool} className="briti-detail-tool-badge">
                          <i className="ri-stack-line" aria-hidden="true" />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Project Structure */}
                {cleanProjectStructure ? (
                  <div className="briti-detail-block">
                    <div className="briti-detail-block__head">
                      <span className="briti-detail-block__icon" aria-hidden="true">
                        <i className="ri-Folders-line ri-folder-chart-line" />
                      </span>
                      <h2 className="briti-detail-block__title">Project Structure</h2>
                    </div>
                    <p className="briti-detail-block__text mb-0" style={{ whiteSpace: "pre-wrap" }}>
                      {cleanProjectStructure}
                    </p>
                  </div>
                ) : null}

                {/* Responsibilities */}
                {rawResponsibilities.length > 0 ? (
                  <div className="briti-detail-block">
                    <div className="briti-detail-block__head">
                      <span className="briti-detail-block__icon" aria-hidden="true">
                        <i className="ri-task-line" />
                      </span>
                      <h2 className="briti-detail-block__title">What You&apos;ll Work On</h2>
                    </div>
                    <ul className="briti-detail-resp-list list-unstyled m-0 p-0">
                      {rawResponsibilities.map((item) => (
                        <li key={item}>
                          <i className="ri-arrow-right-circle-fill" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Certification */}
                <div className="briti-detail-block briti-detail-block--cert mb-0">
                  <div className="briti-detail-block__head">
                    <span className="briti-detail-block__icon" aria-hidden="true">
                      <i className="ri-medal-line" />
                    </span>
                    <h2 className="briti-detail-block__title">
                      Certification &amp; Verified Proof
                    </h2>
                  </div>
                  <p className="briti-detail-block__text mb-0" style={{ whiteSpace: "pre-wrap" }}>
                    {cleanCertification ||
                      "Upon successful completion of your project milestones and mentor evaluations, you receive a verified Briticana Internship Certificate and documented project proof for your CV and LinkedIn profile."}
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Application Sidebar */}
            <div className="col-lg-4">
              <aside className="briti-detail-sidebar">
                <div className="briti-detail-sidebar__head">
                  <span className="briti-detail-sidebar__kicker">Internship Track</span>
                  <h3 className="briti-detail-sidebar__domain">{domainLabel}</h3>
                  <p className="briti-detail-sidebar__intro mb-0">{introText}</p>
                </div>

                <div className="briti-detail-sidebar__batch-box">
                  <div className="briti-detail-sidebar__batch-icon" aria-hidden="true">
                    <i className="ri-calendar-check-line" />
                  </div>
                  <div>
                    <span className="briti-detail-sidebar__batch-label">Next Batch Starts</span>
                    <strong className="briti-detail-sidebar__batch-val">{batchDateText}</strong>
                  </div>
                </div>

                {applyHref ? (
                  <Link
                    className="briti-detail-apply-btn briti-detail-apply-btn--full text-decoration-none"
                    href={applyHref}
                  >
                    <span>{ctaButtonText}</span>
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link
                    href="/internships"
                    className="briti-detail-secondary-btn w-100 justify-content-center text-decoration-none"
                  >
                    <span>Browse Internships</span>
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                )}

                <ul className="briti-detail-sidebar__meta list-unstyled m-0 p-0">
                  <li>
                    <span className="briti-detail-sidebar__meta-key">
                      <i className="ri-folder-user-line" aria-hidden="true" />
                      <span>Domain</span>
                    </span>
                    <span className="briti-detail-sidebar__meta-val">
                      <Link href={domainFilterHref} className="text-decoration-none">
                        {domainLabel}
                      </Link>
                    </span>
                  </li>

                  <li>
                    <span className="briti-detail-sidebar__meta-key">
                      <i className="ri-calendar-event-line" aria-hidden="true" />
                      <span>Next batch</span>
                    </span>
                    <span className="briti-detail-sidebar__meta-val fw-bold text-dark">
                      {batchDateText}
                    </span>
                  </li>

                  <li>
                    <span className="briti-detail-sidebar__meta-key">
                      <i className="ri-time-line" aria-hidden="true" />
                      <span>Durations</span>
                    </span>
                    <span className="briti-detail-sidebar__meta-val">
                      {internship.durationOptions?.length
                        ? internship.durationOptions.join(", ")
                        : info.durationLabel}
                    </span>
                  </li>

                  <li>
                    <span className="briti-detail-sidebar__meta-key">
                      <i className="ri-map-pin-line" aria-hidden="true" />
                      <span>Regions</span>
                    </span>
                    <span className="briti-detail-sidebar__meta-val">
                      {internship.availableRegions?.length
                        ? internship.availableRegions.join(", ")
                        : "UK & Europe (Remote / Hybrid)"}
                    </span>
                  </li>

                  <li>
                    <span className="briti-detail-sidebar__meta-key">
                      <i className="ri-award-line" aria-hidden="true" />
                      <span>Level</span>
                    </span>
                    <span className="briti-detail-sidebar__meta-val">{info.levelLabel}</span>
                  </li>
                </ul>

                {cleanInstructions ? (
                  <p className="briti-detail-sidebar__note mb-0">{cleanInstructions}</p>
                ) : null}
              </aside>
            </div>
          </div>

          {related.length > 0 ? (
            <div className="briti-detail-related">
              <div className="briti-detail-related__header">
                <span className="briti-career-matcher__eyebrow">Similar Opportunities</span>
                <h2 className="briti-detail-related__title">
                  More Internships in <span>{domainLabel}</span>
                </h2>
                <p className="briti-detail-related__subtitle">
                  Explore comparable mentor-led tracks in this career domain before you apply.
                </p>
              </div>
              <div className="briti-internship-cards-grid">
                {related.map((r) => (
                  <div key={r._id} className="briti-internship-cards-grid__cell d-flex">
                    <InternshipIntroCard internship={r} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
