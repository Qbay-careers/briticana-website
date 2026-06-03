import type { HomeHeroData } from "@/components/marketing/homeHero";
import MarketingHomeSections from "@/components/marketing/MarketingHomeSections";
import MarketingNav from "@/components/marketing/MarketingNav";
import type { Internship, InternshipDomainDoc } from "@/lib/sanity/types";

type MarketingPageShellProps = {
  homeHero: HomeHeroData;
  internshipDomains?: InternshipDomainDoc[];
  featuredInternships: Internship[];
};

export default function MarketingPageShell({
  homeHero,
  internshipDomains = [],
  featuredInternships,
}: MarketingPageShellProps) {
  return (
    <div className="marketing-home-root">
      <div className="preloader">
        <img src="/edumove/images/preloader.gif" alt="preloader" />
      </div>
      <MarketingNav />
      <MarketingHomeSections
        homeHero={homeHero}
        internshipDomains={internshipDomains}
        featuredInternships={featuredInternships}
      />
    </div>
  );
}
