import type { EnrichedInternship } from "@/lib/internships/internshipContentApi";

export const GOOGLE_CAREERS_DUBLIN_URL =
  "https://www.google.com/about/careers/applications/jobs/results?e=72477625&location=Dublin,%20Ireland&q=Intern&src=Online/Social/GS_EMEA";

export function isGoogleInternship(
  internship: { title?: string; slug?: { current?: string }; _id?: string } | null | undefined,
): boolean {
  if (!internship) return false;
  const title = (internship.title || "").toLowerCase();
  const slug = (internship.slug?.current || "").toLowerCase();
  const id = (internship._id || "").toLowerCase();
  return title.includes("google") || slug.includes("google") || id.includes("google");
}

export const SUPPLEMENTAL_CORE_TRACKS: EnrichedInternship[] = [
  // ═════════════════════════════════════════════════════════════════
  // BRITICANA CORE MENTOR-LED STARTUP TRACKS
  // ═════════════════════════════════════════════════════════════════
  {
    _id: "showcase-software-development",
    _type: "internship",
    title: "Software Development & Cloud Engineering",
    slug: { _type: "slug", current: "enterprise-cloud-native-net-devops" },
    domain: {
      _id: "internshipDomain-software-development",
      _type: "internshipDomain",
      title: "Software Development",
      slug: { _type: "slug", current: "software-development" },
    },
    overview:
      "Build websites and applications while learning how real software teams work.",
    skillsCovered: ["Programming", "Web development", "APIs & backend", "Git & teamwork"],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-digital-marketing",
    _type: "internship",
    title: "Digital Marketing, Brand Growth & Campaign Analytics",
    slug: { _type: "slug", current: "enterprise-digital-marketing-analytics-optimization" },
    domain: {
      _id: "internshipDomain-marketing",
      _type: "internshipDomain",
      title: "Marketing",
      slug: { _type: "slug", current: "marketing" },
    },
    overview:
      "Plan digital campaigns, grow brand awareness and learn how startups attract and engage customers.",
    skillsCovered: [
      "Campaign strategy",
      "Content marketing",
      "SEO & analytics",
      "Brand growth",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-ui-ux-design",
    _type: "internship",
    title: "UI/UX & Brand Design Studio",
    slug: { _type: "slug", current: "graphic-design-branding-creative-operations" },
    domain: {
      _id: "internshipDomain-ux",
      _type: "internshipDomain",
      title: "UX",
      slug: { _type: "slug", current: "ux" },
    },
    overview:
      "Design intuitive websites, mobile apps and brand visuals through user research and interactive prototypes.",
    skillsCovered: [
      "UI/UX wireframing",
      "Visual branding",
      "Figma prototypes",
      "Design systems",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-finance-accounting",
    _type: "internship",
    title: "Finance, FP&A & Financial Analytics",
    slug: { _type: "slug", current: "financial-analytics-accounting-automation" },
    domain: {
      _id: "internshipDomain-finance",
      _type: "internshipDomain",
      title: "Finance",
      slug: { _type: "slug", current: "finance" },
    },
    overview:
      "Analyse financial performance, build budgets and support smart investment and business decisions.",
    skillsCovered: [
      "Financial modeling",
      "Budgeting & FP&A",
      "Market analysis",
      "Financial reporting",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-human-resources",
    _type: "internship",
    title: "Human Resources (HR) & People Operations",
    slug: { _type: "slug", current: "startup-hr-operations-digital-people" },
    domain: {
      _id: "internshipDomain-hr",
      _type: "internshipDomain",
      title: "HR",
      slug: { _type: "slug", current: "hr" },
    },
    overview:
      "Help companies recruit great talent, onboard new team members and build a strong workplace culture.",
    skillsCovered: [
      "Talent recruitment",
      "People analytics",
      "Onboarding workflows",
      "Team culture",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
];

export function getSupplementalTrackBySlug(slug: string): EnrichedInternship | null {
  const normalized = (slug || "").trim().toLowerCase();
  return (
    SUPPLEMENTAL_CORE_TRACKS.find(
      (t) => (t.slug?.current || "").trim().toLowerCase() === normalized,
    ) ?? null
  );
}
