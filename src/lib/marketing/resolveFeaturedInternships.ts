import { featuredInternshipsFallback, sortFeaturedInternships } from "@/lib/marketing/featuredInternshipsFallback";
import type { Internship } from "@/lib/sanity/types";

const MAX_FEATURED = 6;

/** Prefer CMS list when non-empty; otherwise marketing fallback samples. */
export function resolveFeaturedInternships(fetched: Internship[] | null | undefined): Internship[] {
  const raw = (fetched ?? []).filter((i) => i.slug?.current?.trim());
  if (raw.length === 0) {
    return featuredInternshipsFallback;
  }
  return sortFeaturedInternships(raw).slice(0, MAX_FEATURED);
}
