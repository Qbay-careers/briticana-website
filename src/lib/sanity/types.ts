/** TypeScript shapes aligned with Sanity schemas in `/sanity/schemas`. */

export type SanitySlug = {
  _type?: "slug";
  current?: string;
};

export type SanityImageAsset = {
  _ref: string;
  _type: "reference";
};

export type SanityImage = {
  _type: "image";
  asset?: SanityImageAsset;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type SanityReference<T> = {
  _type?: "reference";
  _ref: string;
  _weak?: boolean;
};

/** Stable slug values for domains (filters, fallbacks when CMS title is absent). */
export type InternshipDomainSlug =
  | "data-analysis"
  | "human-resources"
  | "software-development"
  | "ui-ux-design"
  | "digital-marketing"
  | "business-operations"
  | "product-management"
  | "cybersecurity"
  | "cloud-devops"
  | "ai-automation"
  | "finance-research"
  | "sales-growth";

/** CMS document: `internshipDomain` — referenced from `internship.domain`. */
export interface InternshipDomainDoc {
  _id: string;
  _type: "internshipDomain";
  title: string;
  slug: SanitySlug;
  shortOverview?: string;
  icon?: SanityImage;
}

/** Domain row for `/domains` listing (GROQ `getInternshipDomainsWithCounts`). */
export interface InternshipDomainListItem extends InternshipDomainDoc {
  internshipCount?: number;
}

export type InternshipDurationOption = "3 months" | "6 months" | "9 months";

export type InternshipRegion =
  | "Ireland"
  | "United Kingdom"
  | "Germany"
  | "Finland"
  | "Sweden";

export type InternshipApplicationStatus = "open" | "closed" | "coming-soon";

export interface Internship {
  _id: string;
  _type: "internship";
  title: string;
  slug: SanitySlug;
  /** Dereferenced in GROQ; null if reference missing or broken. */
  domain?: InternshipDomainDoc | null;
  overview?: string;
  skillsCovered?: string[];
  toolsUsed?: string[];
  durationOptions?: InternshipDurationOption[];
  availableRegions?: InternshipRegion[];
  certificationDetails?: string;
  projectStructure?: string;
  applicationStatus?: InternshipApplicationStatus;
  batchStartDate?: string;
  /** Optional per-track form; when empty and status is open, the site default application form is used. */
  googleFormLink?: string;
  featuredImage?: SanityImage;
}

export interface HomePage {
  _id: string;
  _type: "homePage";
  heroHeadline: string;
  heroSubheadline?: string;
  heroOverview?: string;
  /** When set, overrides the default student application URL for hero and journey Apply CTAs. */
  heroCtaApplyUrl?: string;
  heroCtaExploreUrl?: string;
  /** Wide hero for stacked layout on viewports under 1400px (separate from floating tiles). */
  heroImageWide?: SanityImage;
  /** Named floating image slots — slot 1–6 map to banner1–banner6 positions. */
  heroImage1?: SanityImage;
  heroImage2?: SanityImage;
  heroImage3?: SanityImage;
  heroImage4?: SanityImage;
  heroImage5?: SanityImage;
  heroImage6?: SanityImage;
  /** Hero bottom strip images (below pb-120 spacer). */
  stripMainImage?: SanityImage;
  stripSideImage?: SanityImage;
  stripAvatar1?: SanityImage;
  stripAvatar2?: SanityImage;
  stripAvatar3?: SanityImage;
  stripAvatar4?: SanityImage;
  /** About section — left side image. */
  aboutImage?: SanityImage;
  featuredInternships?: SanityReference<Internship>[];
  /** Certification section — certificate mockup image. */
  certImage?: SanityImage;
  /** Set to false to hide the complete testimonials section. */
  showTestimonials?: boolean;
  /** Testimonial section circular avatars. */
  testimonialAvatar1?: SanityImage;
  testimonialAvatar2?: SanityImage;
  testimonialAvatar3?: SanityImage;
  testimonialAvatar4?: SanityImage;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  studentName?: string;
  role?: string;
  cohortTag?: string;
  photo?: SanityImage;
  quote?: string;
}

export interface FaqItem {
  _id: string;
  _type: "faqItem";
  question?: string;
  answer?: string;
  order?: number;
}

export interface StartupPartner {
  _id: string;
  _type: "startupPartner";
  name?: string;
  logo?: SanityImage;
  description?: string;
  collaborationType?: string;
}

export interface FooterNavLink {
  _key: string;
  label?: string;
  href?: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  email?: string;
  whatsappNumber?: string;
  whatsappUrl?: string;
  contactNumber?: string;
  officeAddress?: string;
  googleMapsLink?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  /** Nav "Apply Now" — falls back to default student application form when unset. */
  marketingApplyUrl?: string;
  footerTagline?: string;
  footerLocations?: string;
  footerExploreLinks?: FooterNavLink[];
  footerPageLinks?: FooterNavLink[];
  starterPrice?: string;
  proPrice?: string;
  /** Internships page start-date "Apply Now" — falls back to default student application form when unset. */
  internshipBatchApplyUrl?: string;
}

export type StudentCompletionStatus = "completed" | "in-progress" | "not-started";

export interface Student {
  _id: string;
  _type: "student";
  studentName?: string;
  internshipId: string;
  domain?: string;
  duration?: string;
  region?: string;
  completionStatus?: StudentCompletionStatus;
  certificateIssued?: boolean;
  mentorEvaluation?: string;
}
