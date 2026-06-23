import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export type MarketingBannerSectionProps = {
  homeHero: HomeHeroData;
};

const BACKGROUND_MODE_CLASS: Record<HomeHeroData["smallScreenBackground"], string> = {
  image: "marketing-hero-stack--bg-image",
  white: "marketing-hero-stack--bg-white",
  none: "marketing-hero-stack--bg-none",
};

export default function MarketingBannerSection({ homeHero }: MarketingBannerSectionProps) {
  const { smallScreenBackground, backgroundOverlay } = homeHero;
  const stackClassName = [
    "marketing-hero-stack",
    BACKGROUND_MODE_CLASS[smallScreenBackground],
  ].join(" ");

  const stackStyle =
    smallScreenBackground === "image"
      ? {
          ["--marketing-hero-wide-src" as string]: `url(${JSON.stringify(homeHero.heroWideImage)})`,
          ["--marketing-hero-overlay" as string]: String(backgroundOverlay),
        }
      : undefined;

  return (
    <div className="banner-area">
      <div className={stackClassName} style={stackStyle}>
        <div className="container mw-1345 position-relative z-1 marketing-hero-stack__inner">
          <div className="banner-content text-center" data-cues="slideInUp" data-group="images">
            <h3 className="display-3 fw-bold">{homeHero.headline}</h3>
            {homeHero.subheadline ? (
              <p className="marketing-hero-subheadline mx-auto col-lg-10 col-xl-8 mt-3 mb-4">
                {homeHero.subheadline}
              </p>
            ) : null}
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link href={homeHero.ctaExploreHref} className="main-btn">
                {homeHero.ctaExploreLabel}
              </Link>
            </div>
          </div>

          {/* Six-image orbit: ≥ 1200px only */}
          <div className="marketing-hero-collage d-none d-xl-inline-block" data-cues="slideInUp" data-group="images">
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
    </div>
  );
}
