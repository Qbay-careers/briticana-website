/** On-site application route. All "Apply Now" buttons point here. */
export const APPLY_PATH = "/apply";

export type ApplyContext = {
  /** Internship title the applicant came from (shown + saved as source). */
  internship?: string;
  /** Domain label to preselect. */
  domain?: string;
  /** Duration option (e.g. "6 months") to preselect. */
  duration?: string;
  /** Program region to preselect. */
  region?: string;
  /** Where the click originated (e.g. "nav", "internship-card"). */
  source?: string;
};

/**
 * Builds the internal apply link, optionally carrying prefill context as query
 * params. The apply destination is fixed to {@link APPLY_PATH} and is never
 * overridden from Sanity / admin settings.
 */
export function buildApplyHref(context?: ApplyContext): string {
  if (!context) return APPLY_PATH;
  const params = new URLSearchParams();
  if (context.internship?.trim()) params.set("internship", context.internship.trim());
  if (context.domain?.trim()) params.set("domain", context.domain.trim());
  if (context.duration?.trim()) params.set("duration", context.duration.trim());
  if (context.region?.trim()) params.set("region", context.region.trim());
  if (context.source?.trim()) params.set("source", context.source.trim());
  const qs = params.toString();
  return qs ? `${APPLY_PATH}?${qs}` : APPLY_PATH;
}

export function isInternalAppPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}
