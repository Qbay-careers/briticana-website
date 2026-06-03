import type { HomeHeroData } from "@/components/marketing/homeHero";
import MarketingHomeSections from "@/components/marketing/MarketingHomeSections";
import MarketingNav from "@/components/marketing/MarketingNav";
import type { InternshipDomainDoc } from "@/lib/sanity/types";

type MarketingPageShellProps = {
  homeHero: HomeHeroData;
  internshipDomains?: InternshipDomainDoc[];
};

export default function MarketingPageShell({ homeHero, internshipDomains = [] }: MarketingPageShellProps) {
  return (
    <div className="marketing-home-root">
      <div className="preloader">
        <img src="/edumove/images/preloader.gif" alt="preloader" />
      </div>
      <MarketingNav />
      <MarketingHomeSections homeHero={homeHero} internshipDomains={internshipDomains} />
    </div>
  );
}
