import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export type MarketingBannerSectionProps = {
  homeHero: HomeHeroData;
};

export default function MarketingBannerSection({ homeHero }: MarketingBannerSectionProps) {
  const heroWideBg = `url(${JSON.stringify(homeHero.heroWideImage)})`;

  return (
    <div className="banner-area">
      <div
        className="marketing-hero-stack"
        style={{ ["--marketing-hero-wide-src" as string]: heroWideBg }}
      >
        <div className="container mw-1345 position-relative z-1 marketing-hero-stack__inner">
          <div className="banner-content text-center" data-cues="slideInUp" data-group="images">
            <h3 className="display-3 fw-bold">{homeHero.headline}</h3>
            {homeHero.subheadline ? (
              <p className="marketing-hero-subheadline mx-auto col-lg-10 col-xl-8 mt-3 mb-4">
                {homeHero.subheadline}
              </p>
            ) : null}
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {/* <Link href={homeHero.ctaApplyHref} className="main-btn">
                {homeHero.ctaApplyLabel}
              </Link> */}
              <Link href={homeHero.ctaExploreHref} className="main-btn">
                {homeHero.ctaExploreLabel}
              </Link>
            </div>
          </div>

          {/* Six-image orbit: ≥ 1400px only */}
          <div className="marketing-hero-collage d-none d-xxl-inline-block" data-cues="slideInUp" data-group="images">
            {homeHero.floatingImages.map((src, index) => (
              <img
                key={index}
                src={src}
                className={`banner${index + 1} position-absolute z-n1 rounded-3`}
                alt=""
              />
            ))}
            <img src={marketingImage("shape1.png")} className="shape1 position-absolute z-n1 rounded-3" alt="" />
          </div>
        </div>
      </div>
      {/* <div className="pb-120" />
      <div className="container mw-1345 position-relative z-1">
        ...
      </div> */}
    </div>
  );
}
