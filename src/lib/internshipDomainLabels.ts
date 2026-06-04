import type { InternshipDomainDoc, InternshipDomainSlug } from "@/lib/sanity/types";

const LABELS: Record<InternshipDomainSlug, string> = {
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

/**
 * Display label for an internship domain: prefers CMS `title`, then slug-based fallback map.
 */
export function internshipDomainLabel(
  domain: InternshipDomainDoc | InternshipDomainSlug | string | undefined | null,
): string {
  if (domain == null) return "Domain";
  if (typeof domain === "object" && domain.title?.trim()) {
    return domain.title.trim();
  }
  const slug = typeof domain === "object" ? domain.slug?.current : typeof domain === "string" ? domain : undefined;
  if (slug) {
    return LABELS[slug as InternshipDomainSlug] ?? slug;
  }
  return "Domain";
}
