import type { HomeHeroData } from "@/components/marketing/homeHero";
import MarketingHomeSections from "@/components/marketing/MarketingHomeSections";
import MarketingNav from "@/components/marketing/MarketingNav";

type MarketingPageShellProps = {
  homeHero: HomeHeroData;
};

export default function MarketingPageShell({ homeHero }: MarketingPageShellProps) {
  return (
    <div className="marketing-home-root">
      <div className="preloader">
        <img src="/edumove/images/preloader.gif" alt="preloader" />
      </div>
      <MarketingNav />
      <MarketingHomeSections homeHero={homeHero} />
    </div>
  );
}
