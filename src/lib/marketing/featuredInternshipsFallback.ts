import type { Internship, InternshipDomainDoc } from "@/lib/sanity/types";
import { DEFAULT_STUDENT_APPLICATION_FORM_URL } from "@/lib/studentApplicationForm";

const domainDataAnalysis: InternshipDomainDoc = {
  _id: "fallback-domain-data-analysis",
  _type: "internshipDomain",
  title: "Data Analysis",
  slug: { _type: "slug", current: "data-analysis" },
};

const domainFinance: InternshipDomainDoc = {
  _id: "fallback-domain-finance-research",
  _type: "internshipDomain",
  title: "Finance & Research",
  slug: { _type: "slug", current: "finance-research" },
};

/** Sample internships when Sanity is off or returns no documents (PRD-style copy, trimmed for cards). */
export const featuredInternshipsFallback: Internship[] = [
  {
    _id: "fallback-internship-data-analyst",
    _type: "internship",
    title:
      "Data Analyst — Advanced Data Analytics, Business Intelligence & Decision Support Systems",
    slug: { _type: "slug", current: "data-analyst-advanced-analytics-demo" },
    domain: domainDataAnalysis,
    overview:
      "As a Data Analyst Intern, you will work with real-world data to uncover meaningful insights that help organizations make informed decisions. You will learn to gather, organize, clean, and analyze data from various sources, turning raw information into reports and visualizations.",
    skillsCovered: [
      "Data Visualization and Storytelling",
      "Data Collection and Data Management",
      "SQL for Data Querying and Database Management",
      "Microsoft Excel for Data Analysis",
    ],
    toolsUsed: ["Microsoft Excel", "Google Sheets", "Python", "MySQL"],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["Ireland", "United Kingdom", "Germany", "Finland", "Sweden"],
    certificationDetails:
      "Certificate with participant name, internship title, duration, and domain specialization upon successful completion within the program duration.",
    projectStructure:
      "Three phases — Foundation (core skills), Advanced Development (techniques and emerging tools), Professional Integration (projects and industry scenarios). Scope scales with 3, 6, or 9 month tracks.",
    applicationStatus: "open",
    batchStartDate: "2026-06-15",
    googleFormLink: DEFAULT_STUDENT_APPLICATION_FORM_URL,
  },
  {
    _id: "fallback-internship-finance-research",
    _type: "internship",
    title:
      "Finance & Research — Advanced Financial Analysis, Investment Research & Strategic Decision Intelligence",
    slug: { _type: "slug", current: "finance-research-advanced-demo" },
    domain: domainFinance,
    overview:
      "Gain practical exposure to financial analysis, market research, business intelligence, and strategic decision-making. Learn to analyze financial data, evaluate trends, conduct company research, and turn complex information into actionable insights.",
    skillsCovered: [
      "Budgeting and Financial Planning",
      "Financial Modeling and Forecasting",
      "Economic and Market Trend Analysis",
      "Financial Statement Analysis",
    ],
    toolsUsed: ["Google Finance", "Microsoft Excel", "Financial Research Databases"],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["Ireland", "United Kingdom", "Germany", "Finland", "Sweden"],
    certificationDetails:
      "Certificate with participant name, internship title, duration, and domain specialization upon successful completion within the program duration.",
    projectStructure:
      "Three phases — Foundation (core finance and research skills), Advanced Development (valuation, forecasting, frameworks), Professional Integration (case studies and industry assignments). Scope scales with 3, 6, or 9 month tracks.",
    applicationStatus: "open",
    batchStartDate: "2026-06-22",
    googleFormLink: DEFAULT_STUDENT_APPLICATION_FORM_URL,
  },
];

const STATUS_RANK: Record<string, number> = {
  open: 0,
  "coming-soon": 1,
  closed: 2,
};

/** Open first, then coming soon, then closed; within group sort by batch date descending. */
export function sortFeaturedInternships(list: Internship[]): Internship[] {
  return [...list].sort((a, b) => {
    const ra = STATUS_RANK[a.applicationStatus ?? "closed"] ?? 9;
    const rb = STATUS_RANK[b.applicationStatus ?? "closed"] ?? 9;
    if (ra !== rb) return ra - rb;
    const da = a.batchStartDate ?? "";
    const db = b.batchStartDate ?? "";
    return db.localeCompare(da);
  });
}
