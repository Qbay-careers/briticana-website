import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export default function MarketingJourneyCtaSection() {
  return (
    <div className="journey-area">
      <div className="container mw-1345">
        <div className="journey-content ptb-120 position-relative z-1 overflow-hidden">
          <div className="section-title text-center mx-auto" style={{ maxWidth: "760px" }} data-cues="slideInUp">
            <div className="position-relative z-1 mb-4">
              <h2>
                Ready to <span>Begin Your</span> Learning Journey?
              </h2>
              <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block" alt="" />
              <img
                src={marketingImage("shape4.png")}
                className="d-none d-lg-inline-block position-absolute top-0"
                style={{ right: "-40px" }}
                alt=""
              />
            </div>
            <p>
              A gentle calm has wrapped around me, much like the tender embrace of a spring morning that fills my
              heart with quiet joy.
            </p>
            <div className="d-flex flex-wrap justify-content-center mt-lg-5 mt-4" style={{ gap: "20px" }}>
              <Link href="/courses" className="main-btn black">
                Browse Courses
              </Link>
              <Link href="/programs" className="main-btn">
                Become A Teacher
              </Link>
            </div>
          </div>
          <img src={marketingImage("shape9.png")} className="position-absolute top-50 start-50 translate-middle z-n1" alt="" />
        </div>
      </div>
    </div>
  );
}
