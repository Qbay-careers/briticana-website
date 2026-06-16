const CANONICAL_DEFAULT_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSfPhiyXsWr8-jnrMOWAx6lUVJ75NUFNxdOiqwWGx59G-w6LGA/viewform?usp=header";

/**
 * Fixes pasted Google Form URLs where spaces or `%20` ended up inside the form id
 * (e.g. `Wr%208` → `Wr8`, `vie%20wform` / `vie wform` → `viewform`).
 */
export function normalizeGoogleFormsApplyUrl(url: string): string {
  const t = url.trim();
  if (!t || !/docs\.google\.com\/forms\//i.test(t)) return t;
  try {
    const u = new URL(t);
    u.pathname = u.pathname.replace(/\s+/g, "").replace(/%20/gi, "");
    return u.toString();
  } catch {
    return t.replace(/\s+/g, "").replace(/%20/gi, "");
  }
}

/** Default student application (Google Form) when Sanity does not set a URL. */
export const DEFAULT_STUDENT_APPLICATION_FORM_URL = normalizeGoogleFormsApplyUrl(CANONICAL_DEFAULT_FORM);

/** Prefer CMS value; otherwise the default Google Form. */
export function resolveStudentApplyUrl(cmsOverride?: string | null): string {
  const t = cmsOverride?.trim();
  if (t) return normalizeGoogleFormsApplyUrl(t);
  return DEFAULT_STUDENT_APPLICATION_FORM_URL;
}

export function isInternalAppPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Append `internship_title` so the form can pre-identify the track.
 * `googleFormLink` may be empty — falls back to {@link DEFAULT_STUDENT_APPLICATION_FORM_URL}.
 */
export function buildInternshipPrefilledApplyUrl(googleFormLink: string | undefined, internshipTitle: string): string {
  const base = resolveStudentApplyUrl(googleFormLink);
  try {
    const u = new URL(base);
    u.searchParams.set("internship_title", internshipTitle);
    return u.toString();
  } catch {
    return `${base}${base.includes("?") ? "&" : "?"}internship_title=${encodeURIComponent(internshipTitle)}`;
  }
}
