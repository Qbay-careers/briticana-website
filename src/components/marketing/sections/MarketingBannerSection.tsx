import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";

const BANNER_USER_AVATARS = ["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg"] as const;

export type MarketingBannerSectionProps = {
  homeHero: HomeHeroData;
};

export default function MarketingBannerSection({ homeHero }: MarketingBannerSectionProps) {
  return (
    <div className="banner-area">
      <div className="container mw-1345">
        <div className="position-relative z-1">
          <div className="banner-content text-center" data-cues="slideInUp" data-group="images">
            <h1>{homeHero.headline}</h1>
            {homeHero.subheadline ? (
              <p className="mx-auto text-secondary col-lg-10 col-xl-8 mt-3 mb-4">{homeHero.subheadline}</p>
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

          <div className="d-none d-md-inline-block" data-cues="slideInUp" data-group="images">
            <img src={marketingImage("banner-1.jpg")} className="banner1 position-absolute z-n1 rounded-3" alt="" />
            <img src={marketingImage("banner-2.jpg")} className="banner2 position-absolute z-n1 rounded-3" alt="" />
            <img src={marketingImage("banner-3.jpg")} className="banner3 position-absolute z-n1 rounded-3" alt="" />
            <img src={marketingImage("banner-4.jpg")} className="banner4 position-absolute z-n1 rounded-3" alt="" />
            <img src={marketingImage("banner-5.jpg")} className="banner5 position-absolute z-n1 rounded-3" alt="" />
            <img src={marketingImage("banner-6.jpg")} className="banner6 position-absolute z-n1 rounded-3" alt="" />
            <img src={marketingImage("shape1.png")} className="shape1 position-absolute z-n1 rounded-3" alt="" />
          </div>
        </div>
      </div>
      <div className="pb-120" />
      <div className="container mw-1345 position-relative z-1">
        <div className="row g-4" data-cues="slideInUp">
          <div className="col-lg-9">
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="banner-img7">
                  <img src={marketingImage("banner-7.jpg")} className="rounded-4" alt="" />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="qualified-success-wrap">
                  <div className="qualified mb-4">
                    <ul className="p-0 list-unstyled d-flex align-items-center user-list">
                      {BANNER_USER_AVATARS.map((u) => (
                        <li key={u}>
                          <img src={marketingImage(u)} className="rounded-circle" alt="" />
                        </li>
                      ))}
                    </ul>
                    <h3>Learn from 40+ Qualified Educators</h3>
                  </div>
                  <div className="success-wrap">
                    <p>&ldquo;Keep growing, believe in your path, and success will find you.&rdquo;</p>
                    <h4>Eddie Lenz</h4>
                    <span>Quote from our teacher</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="banner-img8 h-100">
              <img src={marketingImage("banner-8.jpg")} className="h-100 rounded-4" alt="" />
            </div>
          </div>
        </div>
        <img src={marketingImage("shape2.png")} className="shape2 d-none d-lg-inline-block position-absolute" alt="" />
      </div>
    </div>
  );
}
