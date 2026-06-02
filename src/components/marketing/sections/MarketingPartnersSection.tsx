import { marketingImage } from "@/components/marketing/marketingAssetPaths";

import { PARTNERS } from "@/components/marketing/sections/marketingHomeData";

export default function MarketingPartnersSection() {
  return (
    <div className="partner-area ptb-120">
      <div className="container mw-1345">
        <span className="partner-title">Recognized by leading industry brands</span>
      </div>
      <div className="partner-slide owl-carousel owl-theme">
        {PARTNERS.map((name) => (
          <div key={name} className="partner-item">
            <img src={marketingImage(name)} alt="partner" />
          </div>
        ))}
      </div>
    </div>
  );
}
