import type { Metadata } from "next";

import MarketingDomainsListingSection from "@/components/marketing/sections/MarketingDomainsListingSection";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getInternshipDomainsWithCounts } from "@/lib/sanity/queries";
import type { InternshipDomainListItem } from "@/lib/sanity/types";
import { buildPageAlternates } from "@/lib/seo/siteSeo";

export const metadata: Metadata = {
  title: "Domains",
  description:
    "Browse Briticana internship domains — from data and software to operations and design — and jump to live tracks in each area.",
  alternates: buildPageAlternates("/domains"),
};

export default async function DomainsPage() {
  let domains: InternshipDomainListItem[] = [];

  if (isSanityConfigured()) {
    try {
      const fetched = await client.fetch<InternshipDomainListItem[]>(
        getInternshipDomainsWithCounts,
      );
      domains = fetched.filter(
        (d) =>
          !(d.title || "").toLowerCase().includes("google") &&
          !(d.slug?.current || "").toLowerCase().includes("google"),
      );
    } catch {
      domains = [];
    }
  }

  return <MarketingDomainsListingSection domains={domains} sanityConfigured={isSanityConfigured()} />;
}
