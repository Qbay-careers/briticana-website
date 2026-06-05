import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

import { TESTIMONIALS } from "@/components/marketing/sections/marketingHomeData";

const TESTIMONIAL_USER_AVATARS = ["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg"] as const;

export default function MarketingTestimonialsSection() {
  return (
    <div className="testimonial-area marketing-home-section-y">
      <div className="container mw-1345">
        <div className="section-title text-center mx-auto" style={{ maxWidth: "615px" }}>
          <div className="position-relative z-1">
            <p className="small fw-semibold text-secondary text-uppercase mb-2" style={{ letterSpacing: "0.06em" }}>
              Social proof
            </p>
            <h2>
              Real Experiences From <span>Our Participants</span>
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
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-single-item bg-f7f7f7">
              <img src={marketingImage("quat.svg")} className="quat" alt="" />
              <p>{t.quote}</p>
              <div className="d-flex align-items-center info">
                <div className="flex-shrink-0">
                  <img src={marketingImage(t.img)} style={{ width: "60px" }} className="rounded-circle" alt="" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="more-testimonial d-flex justify-content-center justify-content-md-end">
          <div>
            <h4>
              Join Our Growing <span>Community of Learners</span>
            </h4>
            <ul className="p-0 m-0 list-unstyled d-flex justify-content-center justify-content-md-start">
              {TESTIMONIAL_USER_AVATARS.map((u, i) => (
                <li key={u} className={i === 3 ? "position-relative z-1" : undefined}>
                  <img src={marketingImage(u)} alt="" />
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
