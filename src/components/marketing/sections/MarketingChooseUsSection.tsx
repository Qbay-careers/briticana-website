import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export default function MarketingChooseUsSection() {
  return (
    <div className="choose-us-area">
      <div className="container mw-1345">
        <div className="choose-us-wrap bg-f7f7f7 pb-0 position-relative z-1" data-cues="slideInUp">
          <div className="section-title" style={{ maxWidth: "525px" }}>
            <div className="position-relative z-1">
              <h2>
                Why Choose Us for Your <span>Learning</span>
              </h2>
              <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block ms-lg-5" alt="" />
              <img
                src={marketingImage("shape4.png")}
                className="d-none d-lg-inline-block position-absolute top-0"
                style={{ right: "-40px" }}
                alt=""
              />
            </div>
          </div>
          <Link href="/contact" className="text-center d-block text-lg-center">
            <img src={marketingImage("choose-us.png")} alt="" />
          </Link>
          <img
            src={marketingImage("shape8.png")}
            className="position-absolute d-none d-lg-inline-block"
            style={{ top: "130px", right: "160px" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
