import type { HomePage } from "@/lib/sanity/types";
import { urlForSanityImage } from "@/lib/sanity/image";

const DEFAULT_FLOATING_IMAGES = [
  "/edumove/images/banner-1.jpg",
  "/edumove/images/banner-2.jpg",
  "/edumove/images/banner-3.jpg",
  "/edumove/images/banner-4.jpg",
  "/edumove/images/banner-5.jpg",
  "/edumove/images/banner-6.jpg",
] as const;

/** Hero block passed from Sanity (or defaults) into the marketing template. */
export type HomeHeroData = {
  headline: string;
  subheadline?: string;
  overview?: string;
  ctaApplyHref: string;
  ctaExploreHref: string;
  ctaApplyLabel: string;
  ctaExploreLabel: string;
  /** Resolved URL for the wide stacked hero (viewports under 1400px). */
  heroWideImage: string;
  /** Resolved URLs for the 6 floating hero images (slot 1–6). */
  floatingImages: readonly string[];
};

/** PRD-aligned defaults when Sanity is empty or not configured. */
export const defaultHomeHero: HomeHeroData = {
  headline: "Get Real Startup Experience Before Your First Job",
  subheadline: "Work on real startup projects, collaborate with ambitious teams, and build practical experience that helps you stand out in today’s competitive job market.",
  overview:
    "Briticana is an execution-focused experience platform where students collaborate on real-world projects under guided mentorship and structured workflows inspired by modern startups and professional teams.",
  ctaApplyHref: "/contact",
  ctaExploreHref: "/programs",
  ctaApplyLabel: "Apply Now",
  ctaExploreLabel: "Explore Programs",
  /** Default wide hero when CMS field is empty (same stock as slot 1 until a landscape asset is added). */
  heroWideImage: "/edumove/images/banner-1.jpg",
  floatingImages: DEFAULT_FLOATING_IMAGES,
};

export function homeHeroFromSanity(doc: HomePage | null | undefined): HomeHeroData {
  // Always resolve floating images independently — each slot falls back to its
  // own default, regardless of whether headline or other text fields are set.
  const cmsSlots = [
    doc?.heroImage1,
    doc?.heroImage2,
    doc?.heroImage3,
    doc?.heroImage4,
    doc?.heroImage5,
    doc?.heroImage6,
  ];

  const floatingImages = DEFAULT_FLOATING_IMAGES.map((fallback, i) => {
    const url = urlForSanityImage(cmsSlots[i], 290, 340);
    return url ?? fallback;
  });

  const heroWideImage =
    urlForSanityImage(doc?.heroImageWide, 1600, 900) ?? defaultHomeHero.heroWideImage;

  // If no headline is set, use text/link defaults but keep the resolved images.
  if (!doc?.heroHeadline?.trim()) {
    return { ...defaultHomeHero, floatingImages, heroWideImage };
  }

  return {
    headline: doc.heroHeadline,
    subheadline: doc.heroSubheadline ?? defaultHomeHero.subheadline,
    ctaApplyHref: doc.heroCtaApplyUrl?.trim() || defaultHomeHero.ctaApplyHref,
    ctaExploreHref: doc.heroCtaExploreUrl?.trim() || defaultHomeHero.ctaExploreHref,
    ctaApplyLabel: defaultHomeHero.ctaApplyLabel,
    ctaExploreLabel: defaultHomeHero.ctaExploreLabel,
    heroWideImage,
    floatingImages,
  };
}
