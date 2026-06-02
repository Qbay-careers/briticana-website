import MarketingHomeBottom from "@/components/marketing/MarketingHomeBottom";
import MarketingHomeTop from "@/components/marketing/MarketingHomeTop";
import MarketingNav from "@/components/marketing/MarketingNav";

export default function MarketingPageShell() {
  return (
    <div className="marketing-home-root">
      <div className="preloader">
        <img src="/edumove/images/preloader.gif" alt="preloader" />
      </div>
      <MarketingNav />
      <MarketingHomeTop />
      <MarketingHomeBottom />
    </div>
  );
}
