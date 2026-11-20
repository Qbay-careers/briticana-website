"use client";

import { useRef } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const hasSanity = testimonials.length > 0;

  const handlePrev = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstElementChild?.clientWidth || 360;
      trackRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstElementChild?.clientWidth || 360;
      trackRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
    }
  };

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
            <img
              src={marketingImage("title-shape.webp")}
              className="d-none d-lg-inline-block"
              alt="Decorative title underline"
              loading="lazy"
              decoding="async"
            />
            <img
              src={marketingImage("shape4.webp")}
              className="d-none d-lg-inline-block position-absolute top-0"
              style={{ right: "-40px" }}
              alt="Decorative accent shape"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Native CSS Scroll-Snap Testimonials Track (Zero jQuery / Zero Layout Shift) */}
        <div
          ref={trackRef}
          className="d-flex gap-4 overflow-x-auto pb-3 pt-2"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {hasSanity
            ? testimonials.map((t) => {
                const photoUrl = urlForSanityImage(t.photo, 80, 80) ?? marketingImage("user1.webp");
                return (
                  <div
                    key={t._id}
                    className="testimonial-single-item bg-f7f7f7 flex-shrink-0"
                    style={{
                      scrollSnapAlign: "start",
                      width: "clamp(290px, 31vw, 410px)",
                    }}
                  >
                    <img
                      src={marketingImage("quat.svg")}
                      className="quat"
                      alt="Testimonial quote icon"
                      loading="lazy"
                      decoding="async"
                    />
                    <p>{t.quote}</p>
                    <div className="d-flex align-items-center info">
                      <div className="flex-shrink-0">
                        <img
                          src={photoUrl}
                          className="testimonial-avatar rounded-circle"
                          alt={`${t.studentName || "Briticana Participant"} avatar`}
                          loading="lazy"
                          decoding="async"
                          width={48}
                          height={48}
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
                <div
                  key={t.name}
                  className="testimonial-single-item bg-f7f7f7 flex-shrink-0"
                  style={{
                    scrollSnapAlign: "start",
                    width: "clamp(290px, 31vw, 410px)",
                  }}
                >
                  <img
                    src={marketingImage("quat.svg")}
                    className="quat"
                    alt="Testimonial quote icon"
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{t.quote}</p>
                  <div className="d-flex align-items-center info">
                    <div className="flex-shrink-0">
                      <img
                        src={marketingImage(t.img)}
                        className="testimonial-avatar rounded-circle"
                        alt={`${t.name} - Briticana Intern`}
                        loading="lazy"
                        decoding="async"
                        width={48}
                        height={48}
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
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "44px", height: "44px" }}
              onClick={handlePrev}
              aria-label="Previous testimonials"
            >
              <i className="ri-arrow-left-line" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "44px", height: "44px" }}
              onClick={handleNext}
              aria-label="Next testimonials"
            >
              <i className="ri-arrow-right-line" aria-hidden="true" />
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
                  <img
                    src={u}
                    alt={`Briticana Community Participant ${i + 1}`}
                    className="testimonial-community-avatar"
                    loading="lazy"
                    decoding="async"
                    width={40}
                    height={40}
                  />
                  {i === 3 ? (
                    <Link
                      href="/internships"
                      className="more d-flex justify-content-center align-items-center text-decoration-none text-white"
                      aria-label="View more internships"
                    >
                      <i className="ri-add-line" aria-hidden="true" />
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
