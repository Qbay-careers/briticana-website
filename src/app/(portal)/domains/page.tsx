import type { Metadata } from "next";

import MarketingDomainsListingSection from "@/components/marketing/sections/MarketingDomainsListingSection";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getInternshipDomainsWithCounts } from "@/lib/sanity/queries";
import type { InternshipDomainListItem } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Domains",
  description:
    "Browse Briticana internship domains — from data and software to operations and design — and jump to live tracks in each area.",
};

export default async function DomainsPage() {
  let domains: InternshipDomainListItem[] = [];

  if (isSanityConfigured()) {
    try {
      domains = await client.fetch<InternshipDomainListItem[]>(getInternshipDomainsWithCounts);
    } catch {
      domains = [];
    }
  }

  return <MarketingDomainsListingSection domains={domains} sanityConfigured={isSanityConfigured()} />;
}
