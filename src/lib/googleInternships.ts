/**
 * Dedicated Google Internship definitions, allowlist, and helpers.
 * Exclusively for the 10 official Google internship opportunities.
 */

export const GOOGLE_SPREADSHEET_ID = "11wClAcJIwXkwLyShfdjaXrNgxMUIOxVkwl3jfI7ALdQ";
export const GOOGLE_TARGET_TAB = "Google Internship Applications";

export const GOOGLE_APPLY_PATH = "/google-apply";

export const GOOGLE_INTERNSHIP_ROLES = [
  "Google \u2014 Software Engineering Intern (Dublin, Ireland)",
  "Google \u2014 Site Reliability Engineering (SRE) Intern (Dublin)",
  "Google \u2014 Cloud Solutions & Architecture Intern (Dublin)",
  "Google \u2014 Data Center Facilities Operations Intern (Dublin)",
  "Google \u2014 Business & Global Customer Growth Intern (Dublin)",
  "Google \u2014 Business Analyst MBA Intern (Dublin, Ireland)",
  "Google \u2014 APMM Product Marketing Intern (Dublin, Ireland)",
  "Google \u2014 Media & Digital Campaign Analytics Intern (Dublin)",
  "Google \u2014 Financial Analyst & Commercial FP&A Intern (Dublin)",
  "Google \u2014 UI/UX & Digital Product Design Intern (Dublin)",
] as const;

export type GoogleInternshipRole = (typeof GOOGLE_INTERNSHIP_ROLES)[number];

export const GOOGLE_INTERNSHIP_SLUG_MAP: Record<string, GoogleInternshipRole> = {
  "google-software-engineering-intern-dublin":
    "Google \u2014 Software Engineering Intern (Dublin, Ireland)",
  "google-site-reliability-engineering-intern-dublin":
    "Google \u2014 Site Reliability Engineering (SRE) Intern (Dublin)",
  "google-cloud-solutions-architecture-dublin":
    "Google \u2014 Cloud Solutions & Architecture Intern (Dublin)",
  "google-data-center-facilities-dublin":
    "Google \u2014 Data Center Facilities Operations Intern (Dublin)",
  "google-business-customer-growth-dublin":
    "Google \u2014 Business & Global Customer Growth Intern (Dublin)",
  "google-business-analyst-mba-dublin":
    "Google \u2014 Business Analyst MBA Intern (Dublin, Ireland)",
  "google-product-marketing-apmm-dublin":
    "Google \u2014 APMM Product Marketing Intern (Dublin, Ireland)",
  "google-digital-marketing-analytics-dublin":
    "Google \u2014 Media & Digital Campaign Analytics Intern (Dublin)",
  "google-financial-analyst-dublin":
    "Google \u2014 Financial Analyst & Commercial FP&A Intern (Dublin)",
  "google-ux-design-product-dublin":
    "Google \u2014 UI/UX & Digital Product Design Intern (Dublin)",
};

/**
 * Validates whether a given title is one of the exact 10 allowed Google internships.
 */
export function isGoogleInternshipTitle(title?: string | null): boolean {
  if (!title) return false;
  const clean = title.trim();
  return GOOGLE_INTERNSHIP_ROLES.some(
    (role) => role.toLowerCase() === clean.toLowerCase()
  );
}

/**
 * Normalizes an incoming role, title, or slug into one of the 10 exact Google internship names.
 */
export function matchGoogleInternshipRole(
  input?: string | null
): GoogleInternshipRole | undefined {
  if (!input) return undefined;
  const trimmed = input.trim();

  // 1. Exact match
  const exact = GOOGLE_INTERNSHIP_ROLES.find(
    (role) => role.toLowerCase() === trimmed.toLowerCase()
  );
  if (exact) return exact;

  // 2. Slug match
  if (GOOGLE_INTERNSHIP_SLUG_MAP[trimmed]) {
    return GOOGLE_INTERNSHIP_SLUG_MAP[trimmed];
  }

  // 3. Substring match (e.g. "Software Engineering" or "SRE" or "APMM")
  const lower = trimmed.toLowerCase();
  const partial = GOOGLE_INTERNSHIP_ROLES.find((role) => {
    const roleLower = role.toLowerCase();
    return roleLower.includes(lower) || lower.includes(roleLower);
  });

  return partial;
}

/**
 * Builds the URL pointing to the dedicated /google-apply form.
 */
export function buildGoogleApplyHref(roleTitleOrSlug?: string | null): string {
  if (!roleTitleOrSlug?.trim()) return GOOGLE_APPLY_PATH;
  const matched = matchGoogleInternshipRole(roleTitleOrSlug);
  const val = matched || roleTitleOrSlug.trim();
  const params = new URLSearchParams();
  params.set("role", val);
  return `${GOOGLE_APPLY_PATH}?${params.toString()}`;
}

/**
 * Standard list of countries for the searchable dropdown.
 */
export const COUNTRY_OPTIONS = [
  "Ireland",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Switzerland",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Belgium",
  "Austria",
  "Poland",
  "Portugal",
  "Czech Republic",
  "Romania",
  "Greece",
  "Hungary",
  "India",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Singapore",
  "Australia",
  "New Zealand",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Egypt",
  "Brazil",
  "Mexico",
  "Argentina",
  "Chile",
  "Colombia",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Thailand",
  "Japan",
  "South Korea",
  "Turkey",
  "Pakistan",
  "Bangladesh",
  "Sri Lanka",
  "Other",
] as const;
