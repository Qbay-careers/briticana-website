import type { InternshipDomain } from "@/lib/sanity/types";

const LABELS: Record<InternshipDomain, string> = {
  "data-analysis": "Data Analysis",
  "human-resources": "Human Resources (HR)",
  "software-development": "Software Development",
  "ui-ux-design": "UI/UX Design",
  "digital-marketing": "Digital Marketing",
  "business-operations": "Business Operations",
  "product-management": "Product Management",
  cybersecurity: "Cybersecurity",
  "cloud-devops": "Cloud & DevOps",
  "ai-automation": "AI & Automation",
  "finance-research": "Finance & Research",
  "sales-growth": "Sales & Growth",
};

export function internshipDomainLabel(domain: InternshipDomain | string | undefined): string {
  if (!domain) return "Domain";
  return LABELS[domain as InternshipDomain] ?? domain;
}
