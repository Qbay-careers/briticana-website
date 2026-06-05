import type { Metadata } from "next";

import { homeHeroFromSanity } from "@/components/marketing/homeHero";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import MarketingVendorScripts from "@/components/marketing/MarketingVendorScripts";
import { resolveFeaturedInternships } from "@/lib/marketing/resolveFeaturedInternships";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getAllInternshipDomains, getAllTestimonials, getFeaturedInternshipsForHome, getHomePage } from "@/lib/sanity/queries";
import type { HomePage, Internship, InternshipDomainDoc, Testimonial } from "@/lib/sanity/types";

import "@/styles/marketing-home.css";

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

  if (isSanityConfigured()) {
    try {
      const [fetchedHome, fetchedDomains, fetchedFeatured, fetchedTestimonials] = await Promise.all([
        client.fetch<HomePage | null>(getHomePage),
        client.fetch<InternshipDomainDoc[]>(getAllInternshipDomains),
        client.fetch<Internship[]>(getFeaturedInternshipsForHome),
        client.fetch<Testimonial[]>(getAllTestimonials),
      ]);
      homeDoc = fetchedHome;
      internshipDomains = fetchedDomains;
      featuredInternships = resolveFeaturedInternships(fetchedFeatured);
      testimonials = fetchedTestimonials ?? [];
    } catch {
      homeDoc = null;
      internshipDomains = [];
      featuredInternships = resolveFeaturedInternships([]);
      testimonials = [];
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
      />
      <MarketingVendorScripts />
    </>
  );
}
