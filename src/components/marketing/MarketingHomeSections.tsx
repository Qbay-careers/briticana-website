import type { HomeHeroData } from "@/components/marketing/homeHero";
import MarketingAboutSection from "@/components/marketing/sections/MarketingAboutSection";
import MarketingBannerSection from "@/components/marketing/sections/MarketingBannerSection";
import MarketingCategoriesSection from "@/components/marketing/sections/MarketingCategoriesSection";
import MarketingCertificationSection from "@/components/marketing/sections/MarketingCertificationSection";
import MarketingChooseUsSection from "@/components/marketing/sections/MarketingChooseUsSection";
import MarketingCopyrightBar from "@/components/marketing/sections/MarketingCopyrightBar";
import MarketingCoursesSection from "@/components/marketing/sections/MarketingCoursesSection";
import MarketingFaqSection from "@/components/marketing/sections/MarketingFaqSection";
import MarketingFooterSection from "@/components/marketing/sections/MarketingFooterSection";
import MarketingHowItWorksSection from "@/components/marketing/sections/MarketingHowItWorksSection";
import MarketingJourneyCtaSection from "@/components/marketing/sections/MarketingJourneyCtaSection";
import MarketingStartupsSection from "@/components/marketing/sections/MarketingStartupsSection";
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
      <MarketingCategoriesSection internshipDomains={internshipDomains} />
      <MarketingCoursesSection internships={featuredInternships} />
      <MarketingAboutSection />
      <MarketingChooseUsSection />
      <MarketingHowItWorksSection />
      <MarketingCertificationSection />
      <MarketingStartupsSection />
      <MarketingTestimonialsSection />
      <MarketingFaqSection />
      <MarketingJourneyCtaSection />
      <MarketingFooterSection />
      <MarketingCopyrightBar />
    </>
  );
}
