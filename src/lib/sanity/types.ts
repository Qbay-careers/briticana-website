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

export type InternshipDomain =
  | "software-engineering"
  | "data-science-analytics"
  | "cybersecurity"
  | "ux-ui-design"
  | "digital-marketing"
  | "cloud-devops"
  | "artificial-intelligence"
  | "mobile-development"
  | "web-development"
  | "product-management"
  | "business-analysis"
  | "fintech";

export type InternshipDurationOption = "3 months" | "6 months" | "9 months";

export type InternshipRegion = "Ireland" | "UK" | "Germany" | "Finland";

export type InternshipApplicationStatus = "open" | "closed" | "coming-soon";

export interface Internship {
  _id: string;
  _type: "internship";
  title: string;
  slug: SanitySlug;
  domain: InternshipDomain;
  overview?: string;
  skillsCovered?: string[];
  toolsUsed?: string[];
  durationOptions?: InternshipDurationOption[];
  availableRegions?: InternshipRegion[];
  certificationDetails?: string;
  projectStructure?: string;
  applicationStatus?: InternshipApplicationStatus;
  batchStartDate?: string;
  googleFormLink?: string;
  featuredImage?: SanityImage;
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

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  email?: string;
  whatsappNumber?: string;
  contactNumber?: string;
  officeAddress?: string;
  googleMapsLink?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  starterPrice?: string;
  proPrice?: string;
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
