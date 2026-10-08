import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";

const BRITICANA_BULLETS = [
  "Work on real business challenges",
  "Collaborate with teams",
  "Learn through execution",
  "Build practical skills",
  "Create portfolio-ready projects",
  "Gain confidence through real experience",
] as const;

const GROWTH_PATH_STEPS = [
  {
    step: "01",
    title: "Structured Startup Projects",
    desc: "Work on practical business & tech challenges instead of passive theory.",
  },
  {
    step: "02",
    title: "Guided Team Execution",
    desc: "Collaborate in real workflows with direct feedback from industry mentors.",
  },
  {
    step: "03",
    title: "Industry-Ready Portfolio",
    desc: "Graduate with verified project proof and confidence for your career.",
  },
] as const;

export type MarketingAboutSectionProps = {
  homeHero: HomeHeroData;
};

export default function MarketingAboutSection(_props: MarketingAboutSectionProps) {
  return (
    <section className="briti-about-section">
      <div className="container mw-1380">
        <div className="briti-about__grid">
          {/* Left Column: Compact, Proportionate "Structured Growth Path" Card Matching Royal Blue Hero */}
          <div className="briti-about__path-card">
            <div className="briti-about__path-top">
              <span className="briti-about__path-badge">
                <span className="briti-about__path-dot" aria-hidden="true" />
                Structured Growth Path
              </span>
              <h3 className="briti-about__path-heading">
                From Classroom Theory to Real Career Proof
              </h3>
            </div>

            <div className="briti-about__path-steps">
              {GROWTH_PATH_STEPS.map((item) => (
                <div key={item.step} className="briti-about__path-step">
                  <span className="briti-about__path-num">{item.step}</span>
                  <div className="briti-about__path-step-body">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="briti-about__path-goal">
              <span className="briti-about__path-goal-icon" aria-hidden="true">
                <i className="ri-shield-check-line" />
              </span>
              <p>
                <strong>Our goal is simple:</strong> help students become industry-ready
                through hands-on project experience.
              </p>
            </div>
          </div>

          {/* Right Column: Clean, Simple, User-Friendly Overview & Check Grid */}
          <div className="briti-about__content">
            <span className="briti-about__eyebrow">What is Briticana?</span>

            <h2 className="briti-about__title">
              Not just a course. Not just an internship. A real{" "}
              <span className="briti-about__title-accent">experience platform.</span>
            </h2>

            <p className="briti-about__desc">
              Briticana is a project-driven experience platform for students, freshers, and
              aspiring professionals. Instead of only learning theory, participants work on
              structured startup-style projects in collaborative teams, guided by mentors and
              industry-focused workflows.
            </p>

            <p className="briti-about__list-heading">At Briticana, you will:</p>

            <ul className="briti-about__check-grid">
              {BRITICANA_BULLETS.map((item) => (
                <li key={item} className="briti-about__check-item">
                  <span className="briti-about__check-icon" aria-hidden="true">
                    <i className="ri-check-line" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="briti-about__actions">
              <Link href="/internships" className="briti-about__cta">
                <span>Explore Internships</span>
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
