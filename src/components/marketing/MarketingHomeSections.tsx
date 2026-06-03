import type { HomeHeroData } from "@/components/marketing/homeHero";
import MarketingAboutSection from "@/components/marketing/sections/MarketingAboutSection";
import MarketingBannerSection from "@/components/marketing/sections/MarketingBannerSection";
import MarketingBlogSection from "@/components/marketing/sections/MarketingBlogSection";
import MarketingCategoriesSection from "@/components/marketing/sections/MarketingCategoriesSection";
import MarketingChooseUsSection from "@/components/marketing/sections/MarketingChooseUsSection";
import MarketingCopyrightBar from "@/components/marketing/sections/MarketingCopyrightBar";
import MarketingCoursesSection from "@/components/marketing/sections/MarketingCoursesSection";
import MarketingFaqSection from "@/components/marketing/sections/MarketingFaqSection";
import MarketingFooterSection from "@/components/marketing/sections/MarketingFooterSection";
import MarketingJourneyCtaSection from "@/components/marketing/sections/MarketingJourneyCtaSection";
import MarketingPartnersSection from "@/components/marketing/sections/MarketingPartnersSection";
import MarketingSubscribeSection from "@/components/marketing/sections/MarketingSubscribeSection";
import MarketingTeamSection from "@/components/marketing/sections/MarketingTeamSection";
import MarketingTestimonialsSection from "@/components/marketing/sections/MarketingTestimonialsSection";
import type { Internship, InternshipDomainDoc } from "@/lib/sanity/types";

export type MarketingHomeSectionsProps = {
  homeHero: HomeHeroData;
  internshipDomains?: InternshipDomainDoc[];
  featuredInternships: Internship[];
};

export default function MarketingHomeSections({
  homeHero,
  internshipDomains = [],
  featuredInternships,
}: MarketingHomeSectionsProps) {
  return (
    <>
      <MarketingBannerSection homeHero={homeHero} />
      <MarketingPartnersSection />
      <MarketingCategoriesSection internshipDomains={internshipDomains} />
      <MarketingCoursesSection internships={featuredInternships} />
      <MarketingAboutSection />
      <MarketingChooseUsSection />
      <MarketingTestimonialsSection />
      <MarketingFaqSection />
      <MarketingTeamSection />
      <MarketingJourneyCtaSection />
      <MarketingBlogSection />
      <MarketingSubscribeSection />
      <MarketingFooterSection />
      <MarketingCopyrightBar />
    </>
  );
}
