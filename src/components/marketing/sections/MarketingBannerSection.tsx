"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import UkEuropeGoldMap from "@/components/marketing/sections/UkEuropeGoldMap";

export type MarketingBannerSectionProps = {
  homeHero: HomeHeroData;
};

type SixFeatureTheme = "blue" | "indigo" | "emerald" | "amber" | "slate" | "teal";

type SixFeatureItem = {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  theme: SixFeatureTheme;
  symbol: ReactNode;
};

const SIX_FEATURE_DIVS: SixFeatureItem[] = [
  {
    id: "turn-skills-into-proof",
    number: "01",
    tag: "Skill Validation",
    title: "Turn Skills Into Proof",
    description: "Turn your learning into real-world proof.",
    theme: "blue",
    symbol: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M9.5 10L11.2 11.7L14.8 8.3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 15.2L7 21L12 18.8L17 21L15.5 15.2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "from-learning-to-doing",
    number: "02",
    tag: "Hands-On Execution",
    title: "From Learning to Doing",
    description: "Move beyond theory and work on practical ideas.",
    theme: "indigo",
    symbol: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 9H21" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M8 13L10.5 15.5L8 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 18H16.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "verified-project-proof",
    number: "03",
    tag: "Verified Credentials",
    title: "Verified Project Proof",
    description: "Build verified proof of the work you have completed.",
    theme: "emerald",
    symbol: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3L19 6V11.5C19 16.2 16 19.8 12 21C8 19.8 5 16.2 5 11.5V6L12 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 12L11.1 13.9L15.2 9.8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "work-on-live-ideas",
    number: "04",
    tag: "Live Startup Challenges",
    title: "Work on Live Ideas",
    description: "Work on real ideas and practical startup challenges.",
    theme: "amber",
    symbol: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 18H15M10 21H14M12 3C8.686 3 6 5.686 6 9C6 11.22 7.206 13.158 9 14.197V15.5C9 16.052 9.448 16.5 10 16.5H14C14.552 16.5 15 16.052 15 15.5V14.197C16.794 13.158 18 11.22 18 9C18 5.686 15.314 3 12 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "product-building-journey",
    number: "05",
    tag: "Idea to Product",
    title: "Product Building Journey",
    description: "Experience the journey from idea to product.",
    theme: "slate",
    symbol: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3L3.5 7.5L12 12L20.5 7.5L12 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 12L12 16.5L20.5 12"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 16.5L12 21L20.5 16.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "gain-real-exposure",
    number: "06",
    tag: "Global Team Exposure",
    title: "Gain Real Exposure",
    description: "Get practical exposure by working with real projects and teams.",
    theme: "teal",
    symbol: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M3.6 15H20.4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
];

const HERO_MAP_PILLARS: { id: string; label: string; icon: ReactNode }[] = [
  {
    id: "build-real-skills",
    label: "Build Real Skills",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.5 8.5L4.5 12L8.5 15.5M15.5 8.5L19.5 12L15.5 15.5M13.2 6.5L10.8 17.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "work-globally",
    label: "Work Globally",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="3.8" ry="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.2 9.2H19.8M4.2 14.8H19.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "learn-from-experts",
    label: "Learn from Experts",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8.5" r="2.6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="15.5" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4.5 17.5C4.5 15.1 6.5 13.5 9 13.5C11.5 13.5 13.5 15.1 13.5 17.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M13.8 17.5C14 15.5 15.5 14.2 17.5 14.2C19.3 14.2 20.6 15.4 20.8 17.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "get-certified",
    label: "Get Certified",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="4" width="14" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="10.5" r="2.6" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M10.6 12.8L9.8 17L12 15.8L14.2 17L13.4 12.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function WhiteEuEmblem() {
  const coords = [
    [12, 12], [16.67, 12], [21.33, 12], [26, 12],
    [26, 16.67], [26, 21.33], [26, 26],
    [21.33, 26], [16.67, 26], [12, 26],
    [12, 21.33], [12, 16.67],
  ];

  return (
    <span className="briti-royal-hero__emblem" aria-hidden="true">
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="19" r="19" fill="#FFFFFF" />
        {coords.map(([cx, cy], idx) => (
          <circle key={idx} cx={cx} cy={cy} r="1.25" fill="#003885" />
        ))}
      </svg>
    </span>
  );
}

export default function MarketingBannerSection({ homeHero }: MarketingBannerSectionProps) {
  return (
    <>
      {/* 1. Royal Blue Hero Banner with Clean Blue Global Map & 4 Bottom-Right Pillars */}
      <section className="banner-area briti-royal-hero position-relative">
        <div className="briti-royal-hero__top">
          <div className="container mw-1380 position-relative">
            <div className="briti-royal-hero__grid">
              {/* Left Column: Eyebrow, 3-Line Headline, Supporting Text & Pill CTAs */}
              <div className="briti-royal-hero__content">
                <div className="briti-royal-hero__eyebrow">
                  <WhiteEuEmblem />
                  <span className="briti-royal-hero__eyebrow-text">
                    Europe&apos;s Premier Project Experience Platform
                  </span>
                </div>

                <h1 className="briti-royal-hero__headline">
                  <span>Real Projects.</span>
                  <span>Real Skills.</span>
                  <span className="briti-royal-hero__headline-accent">Real Opportunities.</span>
                </h1>

                <p className="briti-royal-hero__subheadline">
                  Join internship programs, work with industry mentors, and get a verified
                  certificate to boost your career.
                </p>

                <div className="briti-royal-hero__actions">
                  <Link
                    href={homeHero.ctaApplyHref || "/apply"}
                    className="briti-royal-hero__btn-primary"
                    prefetch={true}
                  >
                    <span>{homeHero.ctaApplyLabel || "Apply Now"}</span>
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>

                  <Link
                    href={homeHero.ctaExploreHref || "/internships"}
                    className="briti-royal-hero__btn-secondary"
                    prefetch={true}
                  >
                    <span>Explore Programs</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Clean Blue Global Map + 4 Bottom Feature Icons */}
              <div className="briti-royal-hero__map-col">
                <UkEuropeGoldMap />

                <div className="briti-royal-hero__pillars" role="list">
                  {HERO_MAP_PILLARS.map((pillar) => (
                    <div key={pillar.id} className="briti-royal-hero__pillar" role="listitem">
                      <span className="briti-royal-hero__pillar-icon" aria-hidden="true">
                        {pillar.icon}
                      </span>
                      <span className="briti-royal-hero__pillar-title">{pillar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Six Feature Cards Section Directly Below the Hero */}
      <section className="briti-six-features-section position-relative">
        <div className="container mw-1380">
          <div className="briti-six-features-grid">
            {SIX_FEATURE_DIVS.map((feature) => (
              <div
                key={feature.id}
                className={`briti-six-feature-card briti-six-feature-card--${feature.theme}`}
              >
                <div className="briti-six-feature-card__top">
                  <div className="briti-six-feature-card__icon-wrap" aria-hidden="true">
                    {feature.symbol}
                  </div>
                  <div className="briti-six-feature-card__meta">
                    <span className="briti-six-feature-card__tag">{feature.tag}</span>
                    <span className="briti-six-feature-card__num">{feature.number}</span>
                  </div>
                </div>
                <h3 className="briti-six-feature-card__title">{feature.title}</h3>
                <p className="briti-six-feature-card__desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
