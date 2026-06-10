import type { Metadata } from "next";

import { homeHeroFromSanity } from "@/components/marketing/homeHero";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import MarketingVendorScripts from "@/components/marketing/MarketingVendorScripts";
import { resolveFeaturedInternships } from "@/lib/marketing/resolveFeaturedInternships";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import {
  getAllInternshipDomains,
  getAllTestimonials,
  getFeaturedInternshipsForHome,
  getHomePage,
  getSiteSettings,
} from "@/lib/sanity/queries";
import type { HomePage, Internship, InternshipDomainDoc, SiteSettings, Testimonial } from "@/lib/sanity/types";

import "@/styles/marketing-home.css";

const SANITY_REVALIDATE_SECONDS = 60;
const sanityFetchOptions = { next: { revalidate: SANITY_REVALIDATE_SECONDS } };

export const metadata: Metadata = {
  title: "Home",
  description:
    "Briticana — internship experiences and a startup showcase. Learn the skills of tomorrow with mentor-led programs across Europe.",
  icons: {
    icon: "/edumove/images/favicon.png",
  },
};

export default async function HomePage() {
  let homeDoc: HomePage | null = null;
  let internshipDomains: InternshipDomainDoc[] = [];
  let featuredInternships: Internship[] = resolveFeaturedInternships([]);
  let testimonials: Testimonial[] = [];
  let siteSettings: SiteSettings | null = null;

  if (isSanityConfigured()) {
    try {
      const [fetchedHome, fetchedDomains, fetchedFeatured, fetchedTestimonials, fetchedSiteSettings] = await Promise.all([
        client.fetch<HomePage | null>(getHomePage, {}, sanityFetchOptions),
        client.fetch<InternshipDomainDoc[]>(getAllInternshipDomains, {}, sanityFetchOptions),
        client.fetch<Internship[]>(getFeaturedInternshipsForHome, {}, sanityFetchOptions),
        client.fetch<Testimonial[]>(getAllTestimonials, {}, sanityFetchOptions),
        client.fetch<SiteSettings | null>(getSiteSettings, {}, sanityFetchOptions),
      ]);
      homeDoc = fetchedHome;
      internshipDomains = fetchedDomains;
      featuredInternships = resolveFeaturedInternships(fetchedFeatured);
      testimonials = fetchedTestimonials ?? [];
      siteSettings = fetchedSiteSettings;
    } catch {
      homeDoc = null;
      internshipDomains = [];
      featuredInternships = resolveFeaturedInternships([]);
      testimonials = [];
      siteSettings = null;
    }
  }
  const homeHero = homeHeroFromSanity(homeDoc);

  return (
    <>
      <MarketingPageShell
        homeHero={homeHero}
        internshipDomains={internshipDomains}
        featuredInternships={featuredInternships}
        testimonials={testimonials}
        siteSettings={siteSettings}
      />
      <MarketingVendorScripts />
    </>
  );
}
