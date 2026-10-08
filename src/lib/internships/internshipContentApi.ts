import type { Internship, InternshipDurationOption, InternshipRegion } from "@/lib/sanity/types";

export interface InternshipPageContentDTO {
  id: number;
  page_key: string;
  page_type: "overview" | "track";
  title: string;
  heading: string;
  duration: string;
  description: string;
  introductory_text: string;
  program_details: string;
  learning_outcomes: string[];
  responsibilities: string[];
  skills_and_requirements: string[];
  benefits_and_features: string;
  eligibility_information: string;
  application_instructions: string;
  cta_button_text: string;
  domain_title: string;
  domain_slug: string;
  application_status: string;
  batch_start_date: string;
  updated_at: string;
}

export const DEFAULT_OVERVIEW_CONTENT: InternshipPageContentDTO = {
  id: 0,
  page_key: "internships-overview",
  page_type: "overview",
  title: "Internships — Browse Mentor-Led Tracks",
  heading: "Browse Internships",
  duration: "3 Months",
  description:
    "Compare mentor-led tracks, filter by domain and region, and apply when your timing aligns with the next batch.",
  introductory_text:
    "Select a start date that fits your schedule. New batches begin every Monday — see completion dates instantly and apply in seconds.",
  program_details:
    "We focus on execution-based learning. Every participant joins a structured project environment where tasks, reviews, collaboration, and deliverables follow a professional workflow — the way real startups and modern companies operate.",
  learning_outcomes: [
    "Work on real business challenges",
    "Collaborate with teams",
    "Learn through execution",
    "Build practical skills",
    "Create portfolio-ready projects",
    "Gain confidence through real experience",
  ],
  responsibilities: [
    "Weekly sprint tasks and team collaboration",
    "Self-learning tasks and industry research",
    "Mentor feedback and performance reviews",
    "Project completion files and final delivery walkthroughs",
  ],
  skills_and_requirements: [
    "Data Visualization and Storytelling",
    "SQL for Data Querying and Database Management",
    "Financial Modeling, Business Analysis & Operations",
    "Cloud, DevOps, Cybersecurity & Software Engineering",
  ],
  benefits_and_features: "Mentor-Led Projects | Real-World Experience | Verifiable Certificate",
  eligibility_information:
    "Open to students, freshers, and aspiring professionals across Ireland, United Kingdom, Germany, Finland, and Sweden.",
  application_instructions:
    "* Completion dates are approximate and may vary based on program requirements.",
  cta_button_text: "Apply Now",
  domain_title: "All Domains",
  domain_slug: "",
  application_status: "open",
  batch_start_date: "",
  updated_at: "",
};

export function getBackendApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000").replace(/\/+$/, "");
}

export async function fetchAllInternshipContent(): Promise<InternshipPageContentDTO[]> {
  const baseUrl = getBackendApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/v1/internships/content/`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { results?: InternshipPageContentDTO[] };
    return Array.isArray(data.results) ? data.results : [];
  } catch {
    return [];
  }
}

export async function fetchInternshipContentByKey(
  pageKey: string,
): Promise<InternshipPageContentDTO | null> {
  const baseUrl = getBackendApiBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/v1/internships/content/${encodeURIComponent(pageKey)}/`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: InternshipPageContentDTO };
    return data.content ?? null;
  } catch {
    return null;
  }
}

export type EnrichedInternship = Internship & {
  customHeading?: string;
  customIntroductoryText?: string;
  customResponsibilities?: string[];
  customApplicationInstructions?: string;
  customCtaButtonText?: string;
};

/**
 * Overlays saved PostgreSQL InternshipPageContent fields onto a Sanity/fallback Internship object.
 */
export function mergeInternshipWithDbContent(
  internship: Internship,
  dbContent: InternshipPageContentDTO | undefined | null,
): EnrichedInternship {
  if (!dbContent) return internship;

  const parsedDurations = dbContent.duration
    ? (dbContent.duration
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean) as InternshipDurationOption[])
    : internship.durationOptions;

  const parsedRegions = dbContent.eligibility_information
    ? (dbContent.eligibility_information
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean) as InternshipRegion[])
    : internship.availableRegions;

  return {
    ...internship,
    title: dbContent.heading || dbContent.title || internship.title,
    overview: dbContent.description || internship.overview,
    durationOptions: parsedDurations?.length ? parsedDurations : internship.durationOptions,
    skillsCovered:
      dbContent.learning_outcomes?.length > 0
        ? dbContent.learning_outcomes
        : internship.skillsCovered,
    toolsUsed:
      dbContent.skills_and_requirements?.length > 0
        ? dbContent.skills_and_requirements
        : internship.toolsUsed,
    projectStructure: dbContent.program_details || internship.projectStructure,
    certificationDetails: dbContent.benefits_and_features || internship.certificationDetails,
    availableRegions: parsedRegions?.length ? parsedRegions : internship.availableRegions,
    batchStartDate: dbContent.batch_start_date || internship.batchStartDate,
    customHeading: dbContent.heading,
    customIntroductoryText: dbContent.introductory_text,
    customResponsibilities: dbContent.responsibilities,
    customApplicationInstructions: dbContent.application_instructions,
    customCtaButtonText: dbContent.cta_button_text,
  };
}

/**
 * Converts a standalone PostgreSQL InternshipPageContent track record into an EnrichedInternship
 * when Sanity is not configured or a track exists only in PostgreSQL.
 */
export function dbContentToInternship(dbContent: InternshipPageContentDTO): EnrichedInternship {
  const parsedDurations = (dbContent.duration || "3 Months")
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean) as InternshipDurationOption[];
  const parsedRegions = (dbContent.eligibility_information || "")
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean) as InternshipRegion[];

  return {
    _id: `pg-internship-${dbContent.page_key}`,
    _type: "internship",
    title: dbContent.heading || dbContent.title,
    slug: { _type: "slug", current: dbContent.page_key },
    domain: dbContent.domain_title
      ? {
          _id: `pg-domain-${dbContent.domain_slug || "general"}`,
          _type: "internshipDomain",
          title: dbContent.domain_title,
          slug: { _type: "slug", current: dbContent.domain_slug || "general" },
        }
      : null,
    overview: dbContent.description,
    skillsCovered: dbContent.learning_outcomes ?? [],
    toolsUsed: dbContent.skills_and_requirements ?? [],
    durationOptions: parsedDurations,
    availableRegions: parsedRegions,
    certificationDetails: dbContent.benefits_and_features,
    projectStructure: dbContent.program_details,
    applicationStatus:
      dbContent.application_status === "closed" || dbContent.application_status === "coming-soon"
        ? dbContent.application_status
        : "open",
    batchStartDate: dbContent.batch_start_date || undefined,
    customHeading: dbContent.heading,
    customIntroductoryText: dbContent.introductory_text,
    customResponsibilities: dbContent.responsibilities,
    customApplicationInstructions: dbContent.application_instructions,
    customCtaButtonText: dbContent.cta_button_text,
  };
}
