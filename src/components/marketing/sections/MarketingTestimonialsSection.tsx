import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";
import { TESTIMONIALS } from "@/components/marketing/sections/marketingHomeData";
import { urlForSanityImage } from "@/lib/sanity/image";
import type { Testimonial } from "@/lib/sanity/types";

export type MarketingTestimonialsSectionProps = {
  testimonials: Testimonial[];
  homeHero: HomeHeroData;
};

export default function MarketingTestimonialsSection({ testimonials, homeHero }: MarketingTestimonialsSectionProps) {
  // Use Sanity testimonials if available, otherwise fall back to static placeholders.
  const hasSanity = testimonials.length > 0;

  return (
    <div className="testimonial-area marketing-home-section-y">
      <div className="container mw-1345">
        <div className="section-title text-center mx-auto" style={{ maxWidth: "615px" }}>
          <div className="position-relative z-1">
            <p className="small fw-semibold text-secondary text-uppercase mb-2" style={{ letterSpacing: "0.06em" }}>
              Social proof
            </p>
            <h2>
              Real experiences from <span>our participants</span>
            </h2>
            <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block" alt="" />
            <img
              src={marketingImage("shape4.png")}
              className="d-none d-lg-inline-block position-absolute top-0"
              style={{ right: "-40px" }}
              alt=""
            />
          </div>
        </div>
        <div className="testimonial-slide owl-carousel owl-theme">
          {hasSanity
            ? testimonials.map((t) => {
                const photoUrl = urlForSanityImage(t.photo, 80, 80) ?? marketingImage("user1.jpg");
                return (
                  <div key={t._id} className="testimonial-single-item bg-f7f7f7">
                    <img src={marketingImage("quat.svg")} className="quat" alt="" />
                    <p>{t.quote}</p>
                    <div className="d-flex align-items-center info">
                      <div className="flex-shrink-0">
                        <img
                          src={photoUrl}
                          className="testimonial-avatar rounded-circle"
                          alt={t.studentName ?? ""}
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h4>{t.studentName}</h4>
                        <span>{t.role ?? t.cohortTag}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            : TESTIMONIALS.map((t) => (
                <div key={t.name} className="testimonial-single-item bg-f7f7f7">
                  <img src={marketingImage("quat.svg")} className="quat" alt="" />
                  <p>{t.quote}</p>
                  <div className="d-flex align-items-center info">
                    <div className="flex-shrink-0">
                      <img
                        src={marketingImage(t.img)}
                        className="testimonial-avatar rounded-circle"
                        alt=""
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>{t.name}</h4>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="testimonial-nav d-flex justify-content-between align-items-center mt-3">
          <button type="button" className="testimonial-prev btn btn-light rounded-circle">
            <i className="ri-arrow-left-line" />
          </button>
          <button type="button" className="testimonial-next btn btn-light rounded-circle">
            <i className="ri-arrow-right-line" />
          </button>
          <div className="featured-internships-controls d-flex gap-2">
            <button type="button" className="featured-internships-prev btn btn-outline-light rounded-circle">
              <i className="ri-arrow-left-line" />
            </button>
            <button type="button" className="featured-internships-next btn btn-outline-light rounded-circle">
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>

        <div className="more-testimonial d-flex justify-content-center justify-content-md-end">
          <div>
            <h4>
              Join Our Growing <span>Community of Learners</span>
            </h4>
            <ul className="p-0 m-0 list-unstyled d-flex justify-content-center justify-content-md-start">
              {homeHero.testimonialAvatars.map((u, i) => (
                <li key={i} className={i === 3 ? "position-relative z-1" : undefined}>
                  <img src={u} alt={`Participant ${i + 1}`} className="testimonial-community-avatar" />
                  {i === 3 ? (
                    <Link href="/internships" className="more d-flex justify-content-center align-items-center text-decoration-none text-white">
                      <i className="ri-add-line" />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
