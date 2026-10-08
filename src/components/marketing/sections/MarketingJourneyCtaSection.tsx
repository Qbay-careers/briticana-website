import MarketingCtaLink from "@/components/marketing/MarketingCtaLink";
import { buildApplyHref } from "@/lib/studentApplicationForm";

const TALK_TO_US_PHONE_HREF = "tel:+17342498898";

export default function MarketingJourneyCtaSection() {
  const applyHref = buildApplyHref({ source: "journey-cta" });
  return (
    <section className="briti-journey-cta-section">
      <div className="container mw-1380">
        <div className="briti-journey-cta__inner">
          <span className="briti-journey-cta__eyebrow">Start Your Career Journey</span>
          <h2 className="briti-journey-cta__title">
            Start building your experience{" "}
            <span className="briti-journey-cta__accent">that actually matters</span>
          </h2>
          <p className="briti-journey-cta__desc">
            Join Briticana and gain the practical exposure, confidence, and project
            experience needed to grow your career.
          </p>
          <div className="briti-journey-cta__actions">
            <MarketingCtaLink href={applyHref} className="briti-journey-cta__btn-primary">
              <span>Apply Now</span>
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </MarketingCtaLink>
            <a href={TALK_TO_US_PHONE_HREF} className="briti-journey-cta__btn-secondary">
              <span>Talk to Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
