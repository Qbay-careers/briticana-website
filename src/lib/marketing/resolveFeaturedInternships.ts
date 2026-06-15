import { featuredInternshipsFallback, sortFeaturedInternships } from "@/lib/marketing/featuredInternshipsFallback";
import type { Internship } from "@/lib/sanity/types";

const MAX_FEATURED = 8;

/** Preserve the selected order from CMS; otherwise marketing fallback samples. */
export function resolveFeaturedInternships(fetched: Internship[] | null | undefined): Internship[] {
  const raw = (fetched ?? []).filter((i) => i.slug?.current?.trim());
  if (raw.length === 0) {
    return featuredInternshipsFallback;
  }
  return raw.slice(0, MAX_FEATURED);
}
