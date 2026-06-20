import MarketingCtaLink from "@/components/marketing/MarketingCtaLink";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";

const TALK_TO_US_PHONE_HREF = "tel:+17342498898";

export type MarketingJourneyCtaSectionProps = {
  /** Resolved apply target (Sanity home hero Apply URL or site default). */
  applyHref: string;
};

export default function MarketingJourneyCtaSection({ applyHref }: MarketingJourneyCtaSectionProps) {
  return (
    <div className="journey-area">
      <div className="container mw-1345">
        <div className="journey-content marketing-home-section-y position-relative z-1 overflow-hidden">
          <div className="section-title text-center mx-auto" style={{ maxWidth: "760px" }} data-cues="slideInUp">
            <div className="position-relative z-1 mb-4">
              <h2>
                Start building your experience <span>that actually matters</span>
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
              Join Briticana and gain the practical exposure, confidence, and project experience needed to grow your
              career.
            </p>
            <div className="d-flex flex-wrap justify-content-center mt-lg-4 mt-4" style={{ gap: "20px" }}>
              <MarketingCtaLink href={applyHref} className="main-btn">
                Apply Now
              </MarketingCtaLink>
              <a href={TALK_TO_US_PHONE_HREF} className="main-btn black">
                Talk to Us
              </a>
            </div>
          </div>
          <img src={marketingImage("shape9.png")} className="position-absolute top-50 start-50 translate-middle z-n1" alt="" />
        </div>
      </div>
    </div>
  );
}
