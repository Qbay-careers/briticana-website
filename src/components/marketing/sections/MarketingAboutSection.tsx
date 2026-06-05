import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";

const BRITICANA_BULLETS = [
  "Work on real business challenges",
  "Collaborate with teams",
  "Learn through execution",
  "Build practical skills",
  "Create portfolio-ready projects",
  "Gain confidence through real experience",
] as const;

export type MarketingAboutSectionProps = {
  homeHero: HomeHeroData;
};

export default function MarketingAboutSection({ homeHero }: MarketingAboutSectionProps) {
  return (
    <div className="about-area marketing-home-section-y">
      <div className="container mw-1345">
        <div className="row g-4 align-items-center" data-cues="slideInUp">
          <div className="col-lg-6">
            <div className="about-img position-relative z-1">
              {/* Main image: managed via Sanity "About section" tab */}
              <img
                src={homeHero.aboutImage}
                className="about-main-img"
                alt="What is Briticana?"
              />
              <img src={marketingImage("shape5.png")} className="shape5 position-absolute d-none d-lg-inline-block" alt="" />
              <img src={marketingImage("shape6.png")} className="shape6 position-absolute d-none d-lg-inline-block" alt="" />
              <img src={marketingImage("shape7.png")} className="shape7 position-absolute d-none d-lg-inline-block" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-content">
              <div className="d-inline-block position-relative z-1 mb-3">
                <p
                  className="small fw-semibold text-secondary text-uppercase mb-2"
                  style={{ letterSpacing: "0.06em" }}
                >
                  What is Briticana?
                </p>
                <h2>
                  Not Just a Course. Not Just an Internship. A Real{" "}
                  <span>Experience Platform.</span>
                </h2>
                <img src={marketingImage("title-shape.png")} className="ms-lg-5" alt="" />
                <img
                  src={marketingImage("shape4.png")}
                  className="shape4 position-absolute top-0"
                  style={{ right: "-20px" }}
                  alt=""
                />
              </div>
              <p className="dec mb-3">
                Briticana is a project-driven experience platform for students, freshers, and aspiring professionals.
                Instead of only learning theory, participants work on structured startup-style projects in
                collaborative teams, guided by mentors and industry-focused workflows.
              </p>
              <p className="fw-semibold mb-2">At Briticana, you will:</p>
              <ul className="list-unstyled mb-4 about-bullets row g-2">
                {BRITICANA_BULLETS.map((item) => (
                  <li key={item} className="col-sm-6 d-flex gap-2">
                    <span
                      className="flex-shrink-0"
                      style={{ color: "var(--mainColor, #7a4dfc)" }}
                      aria-hidden
                    >
                      ●
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="dec mb-4">
                <span className="fw-semibold">Our goal is simple:</span> help students become industry-ready through
                hands-on project experience.
              </p>
              <Link href="/internships" className="main-btn">
                Explore internships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
