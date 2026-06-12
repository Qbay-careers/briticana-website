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

const DEFAULT_STRIP_AVATARS = [
  "/edumove/images/user1.jpg",
  "/edumove/images/user2.jpg",
  "/edumove/images/user3.jpg",
  "/edumove/images/user4.jpg",
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
  /** Hero bottom strip images (below headline / spacer layouts). */
  stripMainImage: string;
  stripSideImage: string;
  stripAvatars: readonly string[];
  /** About section — left side image. */
  aboutImage: string;
  /** Certification section — certificate mockup image. */
  certImage: string;
  /** Whether the complete testimonials section is visible. */
  showTestimonials: boolean;
  /** Testimonial section circular avatars. */
  testimonialAvatars: readonly string[];
};

/** PRD-aligned defaults when Sanity is empty or not configured. */
export const defaultHomeHero: HomeHeroData = {
  headline: "Build Real Industry Experience",
  subheadline: "Before Your First Job",
  overview:
    "Briticana is an execution-focused experience platform where students collaborate on real-world projects under guided mentorship and structured workflows inspired by modern startups and professional teams.",
  ctaApplyHref: "/contact",
  ctaExploreHref: "/internships",
  ctaApplyLabel: "Apply Now",
  ctaExploreLabel: "View Internships",
  heroWideImage: "/edumove/images/banner-1.jpg",
  floatingImages: DEFAULT_FLOATING_IMAGES,
  stripMainImage: "/edumove/images/banner-7.jpg",
  stripSideImage: "/edumove/images/banner-8.jpg",
  stripAvatars: DEFAULT_STRIP_AVATARS,
  aboutImage: "/edumove/images/about.png",
  certImage: "/edumove/images/choose-us.png",
  showTestimonials: true,
  testimonialAvatars: DEFAULT_STRIP_AVATARS,
};

export function homeHeroFromSanity(doc: HomePage | null | undefined): HomeHeroData {
  // ── Floating images (banner1–6): per-slot fallback ───────────────────
  const cmsSlots = [
    doc?.heroImage1,
    doc?.heroImage2,
    doc?.heroImage3,
    doc?.heroImage4,
    doc?.heroImage5,
    doc?.heroImage6,
  ];
  const floatingImages = DEFAULT_FLOATING_IMAGES.map((fallback, i) => urlForSanityImage(cmsSlots[i], 290, 340) ?? fallback);

  const heroWideImage =
    urlForSanityImage(doc?.heroImageWide, 1600, 900) ?? defaultHomeHero.heroWideImage;

  // ── Hero bottom strip ────────────────────────────────────────────────
  const stripMainImage =
    urlForSanityImage(doc?.stripMainImage, 900, 560) ?? defaultHomeHero.stripMainImage;
  const stripSideImage =
    urlForSanityImage(doc?.stripSideImage, 400, 560) ?? defaultHomeHero.stripSideImage;
  const cmsAvatars = [doc?.stripAvatar1, doc?.stripAvatar2, doc?.stripAvatar3, doc?.stripAvatar4];
  const stripAvatars = DEFAULT_STRIP_AVATARS.map((fallback, i) => urlForSanityImage(cmsAvatars[i], 80, 80) ?? fallback);

  // ── About & certification ─────────────────────────────────────────────
  const aboutImage = urlForSanityImage(doc?.aboutImage, 800) ?? defaultHomeHero.aboutImage;
  const certImage = urlForSanityImage(doc?.certImage, 800) ?? defaultHomeHero.certImage;

  const cmsTestimonialAvatars = [
    doc?.testimonialAvatar1,
    doc?.testimonialAvatar2,
    doc?.testimonialAvatar3,
    doc?.testimonialAvatar4,
  ];
  const testimonialAvatars = DEFAULT_STRIP_AVATARS.map(
    (fallback, i) => urlForSanityImage(cmsTestimonialAvatars[i], 80, 80) ?? fallback,
  );

  // If no headline set, return text defaults but keep all resolved images.
  if (!doc?.heroHeadline?.trim()) {
    return {
      ...defaultHomeHero,
      floatingImages,
      heroWideImage,
      stripMainImage,
      stripSideImage,
      stripAvatars,
      aboutImage,
      certImage,
      showTestimonials: doc?.showTestimonials ?? true,
      testimonialAvatars,
    };
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
    stripMainImage,
    stripSideImage,
    stripAvatars,
    aboutImage,
    certImage,
    showTestimonials: doc.showTestimonials ?? true,
    testimonialAvatars,
  };
}
