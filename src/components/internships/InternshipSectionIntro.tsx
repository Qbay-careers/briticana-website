import Link from "next/link";

export interface InternshipSectionIntroProps {
  /** Show Home -> Internships breadcrumb when used as the /internships page hero */
  showBreadcrumbs?: boolean;
  /** Optional custom heading from Admin Dashboard (when distinct from generic "Browse Internships") */
  customHeading?: string;
  /** Optional custom description from Admin Dashboard (when distinct from generic default) */
  customDescription?: string;
  /** Optional duration badge */
  durationBadge?: string;
}

const DEFAULT_GENERIC_HEADING = "Browse Internships";
const DEFAULT_GENERIC_DESCRIPTION =
  "Compare mentor-led tracks, filter by domain and region, and apply when your timing aligns with the next batch.";

export default function InternshipSectionIntro({
  showBreadcrumbs = false,
  customHeading,
  customDescription,
  durationBadge,
}: InternshipSectionIntroProps) {
  const useCustomHeading =
    customHeading &&
    customHeading.trim() !== "" &&
    customHeading.trim().toLowerCase() !== DEFAULT_GENERIC_HEADING.toLowerCase();

  const useCustomDesc =
    customDescription &&
    customDescription.trim() !== "" &&
    customDescription.trim() !== DEFAULT_GENERIC_DESCRIPTION;

  return (
    <div className="briti-internship-intro">
      <div className="briti-internship-intro__grid">
        {/* Left: Clear Heading & Supporting Text */}
        <div className="briti-internship-intro__content">
          {showBreadcrumbs ? (
            <nav aria-label="Breadcrumb" className="briti-internship-intro__breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Internships</span>
            </nav>
          ) : null}

          <div className="briti-internship-intro__eyebrow">
            <span className="briti-internship-intro__eyebrow-dot" aria-hidden="true" />
            <span>Career-Focused Internship Programs</span>
          </div>

          {useCustomHeading ? (
            <h1 className="briti-internship-intro__heading">{customHeading}</h1>
          ) : showBreadcrumbs ? (
            <h1 className="briti-internship-intro__heading">
              Find the <span>Right Internship</span> for Your Career
            </h1>
          ) : (
            <h2 className="briti-internship-intro__heading">
              Find the <span>Right Internship</span> for Your Career
            </h2>
          )}

          <p className="briti-internship-intro__subtext">
            {useCustomDesc
              ? customDescription
              : "Explore real-world internship opportunities designed to help you build practical skills, gain experience and become career-ready."}
          </p>

          <div className="briti-internship-intro__pills">
            <span className="briti-internship-intro__pill">
              <i className="ri-time-line" aria-hidden="true" />
              {durationBadge || "3 / 6 / 9 Months"}
            </span>
            <span className="briti-internship-intro__pill">
              <i className="ri-map-pin-line" aria-hidden="true" />
              London / Europe • Remote &amp; Hybrid
            </span>
            <span className="briti-internship-intro__pill">
              <i className="ri-sparkling-line" aria-hidden="true" />
              Beginner Friendly &amp; Mentor-Guided
            </span>
          </div>
        </div>

        {/* Right: Compact Premium Career Visual Illustration */}
        <div className="briti-internship-intro__visual" aria-hidden="true">
          <div className="briti-internship-intro__visual-glow" />

          <div className="briti-internship-intro__glass-card">
            <div className="briti-internship-intro__glass-header">
              <div className="briti-internship-intro__glass-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="briti-internship-intro__glass-tag">Your Internship Journey</span>
            </div>

            <div className="briti-internship-intro__steps">
              <div className="briti-internship-intro__step">
                <div className="briti-internship-intro__step-icon briti-internship-intro__step-icon--blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth="2" />
                    <path d="M12 8v4l2.5 2.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="briti-internship-intro__step-text">
                  <strong>1. Pick Your Role</strong>
                  <span>Tech, Business, Design, Marketing or Finance</span>
                </div>
              </div>

              <div className="briti-internship-intro__step">
                <div className="briti-internship-intro__step-icon briti-internship-intro__step-icon--purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="3" stroke="#7c3aed" strokeWidth="2" />
                    <path d="M9 10l-2 2 2 2M15 10l2 2-2 2" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="briti-internship-intro__step-text">
                  <strong>2. Work on Real Tasks</strong>
                  <span>Guided weekly projects &amp; practical skills</span>
                </div>
              </div>

              <div className="briti-internship-intro__step">
                <div className="briti-internship-intro__step-icon briti-internship-intro__step-icon--emerald">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l7 3.5v5.5c0 4.8-3 8.9-7 10.5-4-1.6-7-5.7-7-10.5V6.5L12 3z" stroke="#059669" strokeWidth="2" />
                    <path d="M9 12l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="briti-internship-intro__step-text">
                  <strong>3. Graduate Career-Ready</strong>
                  <span>Verified certificate &amp; portfolio proof</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Floating Accent Pills */}
          <div className="briti-internship-intro__float briti-internship-intro__float--top">
            <span className="briti-internship-intro__float-dot" />
            <span>Mentor-Led Projects</span>
          </div>
          <div className="briti-internship-intro__float briti-internship-intro__float--bottom">
            <i className="ri-verified-badge-fill" />
            <span>Verified Credentials</span>
          </div>
        </div>
      </div>
    </div>
  );
}
