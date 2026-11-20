import type { Metadata } from "next";

import { homeHeroFromSanity } from "@/components/marketing/homeHero";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import {
  fetchAllInternshipContent,
  mergeInternshipWithDbContent,
} from "@/lib/internships/internshipContentApi";
import { resolveFeaturedInternships } from "@/lib/marketing/resolveFeaturedInternships";
import { buildPageAlternates } from "@/lib/seo/siteSeo";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import {
  getHomePageBundle,
} from "@/lib/sanity/queries";
import type { HomePage, Internship, InternshipDomainDoc, SiteSettings, Testimonial } from "@/lib/sanity/types";

import "@/styles/marketing-home.css";

export const revalidate = 3600;

const SANITY_REVALIDATE_SECONDS = 3600;
const sanityFetchOptions = { next: { revalidate: SANITY_REVALIDATE_SECONDS } };

type HomeSanityBundle = {
  home: HomePage | null;
  domains: InternshipDomainDoc[];
  featured: Internship[];
  testimonials: Testimonial[];
  siteSettings: SiteSettings | null;
};

type HomeSanityCache = {
  data: HomeSanityBundle;
  timestamp: number;
};

let cachedHomeBundle: HomeSanityCache | null = null;
const SANITY_CACHE_TTL_MS = 3_600_000;

export const metadata: Metadata = {
  title: {
    absolute: "Briticana: Real Project Internships, Work & Skill Experience",
  },
  description:
    "Join Briticana for real project internships and hands-on work experience. Learn practical skills, view Google & European tracks, and grow your career.",
  alternates: buildPageAlternates("/"),
};

export default async function HomePage() {
  let homeDoc: HomePage | null = null;
  let internshipDomains: InternshipDomainDoc[] = [];
  let featuredInternships: Internship[] = resolveFeaturedInternships([]);
  let testimonials: Testimonial[] = [];
  let siteSettings: SiteSettings | null = null;

  const dbContentPromise = fetchAllInternshipContent();

  const now = Date.now();
  if (cachedHomeBundle && now - cachedHomeBundle.timestamp < SANITY_CACHE_TTL_MS) {
    homeDoc = cachedHomeBundle.data.home;
    internshipDomains = cachedHomeBundle.data.domains ?? [];
    featuredInternships = resolveFeaturedInternships(cachedHomeBundle.data.featured ?? []);
    testimonials = cachedHomeBundle.data.testimonials ?? [];
    siteSettings = cachedHomeBundle.data.siteSettings ?? null;
  } else if (isSanityConfigured()) {
    try {
      const fetchPromise = client.fetch<HomeSanityBundle>(
        getHomePageBundle,
        {},
        sanityFetchOptions,
      );
      const timeoutPromise = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 2000),
      );
      const data = await Promise.race([fetchPromise, timeoutPromise]);
      if (data) {
        cachedHomeBundle = { data, timestamp: now };
        homeDoc = data.home ?? null;
        internshipDomains = data.domains ?? [];
        featuredInternships = resolveFeaturedInternships(data.featured ?? []);
        testimonials = data.testimonials ?? [];
        siteSettings = data.siteSettings ?? null;
      }
    } catch {
      if (cachedHomeBundle) {
        homeDoc = cachedHomeBundle.data.home;
        internshipDomains = cachedHomeBundle.data.domains ?? [];
        featuredInternships = resolveFeaturedInternships(cachedHomeBundle.data.featured ?? []);
        testimonials = cachedHomeBundle.data.testimonials ?? [];
        siteSettings = cachedHomeBundle.data.siteSettings ?? null;
      } else {
        homeDoc = null;
        internshipDomains = [];
        featuredInternships = resolveFeaturedInternships([]);
        testimonials = [];
        siteSettings = null;
      }
    }
  }

  const allDbContent = await dbContentPromise;
  const dbTrackMap = new Map(
    allDbContent
      .filter((item) => item.page_type === "track")
      .map((item) => [item.page_key, item]),
  );
  featuredInternships = featuredInternships.map((item) => {
    const slug = item.slug?.current?.trim() || "";
    return mergeInternshipWithDbContent(item, dbTrackMap.get(slug));
  });

  const homeHero = homeHeroFromSanity(homeDoc);

  return (
    <MarketingPageShell
      homeHero={homeHero}
      internshipDomains={internshipDomains}
      featuredInternships={featuredInternships}
      testimonials={testimonials}
      siteSettings={siteSettings}
    />
  );
}
