import type { HomePage } from "@/lib/sanity/types";

/** Hero block passed from Sanity (or defaults) into the marketing template. */
export type HomeHeroData = {
  headline: string;
  subheadline?: string;
  overview?: string;
  ctaApplyHref: string;
  ctaExploreHref: string;
  ctaApplyLabel: string;
  ctaExploreLabel: string;
};

/** PRD-aligned defaults when Sanity is empty or not configured. */
export const defaultHomeHero: HomeHeroData = {
  headline: "Build Real Industry Experience",
  subheadline: "Before Your First Job",
  overview:
    "Briticana is an execution-focused experience platform where students collaborate on real-world projects under guided mentorship and structured workflows inspired by modern startups and professional teams.",
  ctaApplyHref: "/contact",
  ctaExploreHref: "/programs",
  ctaApplyLabel: "Apply Now",
  ctaExploreLabel: "Explore Programs",
};

export function homeHeroFromSanity(doc: HomePage | null | undefined): HomeHeroData {
  if (!doc?.heroHeadline?.trim()) {
    return defaultHomeHero;
  }
  return {
    headline: doc.heroHeadline,
    subheadline: doc.heroSubheadline ?? defaultHomeHero.subheadline,
    ctaApplyHref: doc.heroCtaApplyUrl?.trim() || defaultHomeHero.ctaApplyHref,
    ctaExploreHref: doc.heroCtaExploreUrl?.trim() || defaultHomeHero.ctaExploreHref,
    ctaApplyLabel: defaultHomeHero.ctaApplyLabel,
    ctaExploreLabel: defaultHomeHero.ctaExploreLabel,
  };
}
