const TALK_TO_US_PHONE_HREF = "tel:+17342498898";

const STARTUP_SUBMISSIONS = [
  "Product ideas",
  "MVP concepts",
  "Research tasks",
  "Marketing projects",
  "Design requirements",
] as const;

const TEAM_OUTCOMES = [
  "Explore solutions",
  "Test concepts",
  "Build structured outcomes",
  "Support innovation at lower operational cost",
] as const;

export default function MarketingStartupsSection() {
  return (
    <section className="briti-startups-section">
      <div className="container mw-1380">
        <div className="briti-startups__grid">
          {/* Left Column: Eyebrow, Heading, Description & CTA */}
          <div className="briti-startups__content">
            <span className="briti-startups__eyebrow">
              <span className="briti-startups__dot" aria-hidden="true" />
              For Startups &amp; Founders
            </span>

            <h2 className="briti-startups__title">Build with mentored talent teams</h2>

            <p className="briti-startups__desc">
              Briticana also supports startups and founders exploring early-stage ideas
              through supervised project teams. All projects are mentor-supervised and
              designed for educational and execution value.
            </p>

            <div className="briti-startups__actions">
              <a href={TALK_TO_US_PHONE_HREF} className="briti-startups__cta">
                <span>Talk to us</span>
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Two Clean Checklist Cards */}
          <div className="briti-startups__columns">
            <div className="briti-startups__card">
              <h3 className="briti-startups__card-title">Startups can submit</h3>
              <ul className="briti-startups__list">
                {STARTUP_SUBMISSIONS.map((item) => (
                  <li key={item} className="briti-startups__item">
                    <span className="briti-startups__check" aria-hidden="true">
                      <i className="ri-check-line" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="briti-startups__card">
              <h3 className="briti-startups__card-title">Our teams help</h3>
              <ul className="briti-startups__list">
                {TEAM_OUTCOMES.map((item) => (
                  <li key={item} className="briti-startups__item">
                    <span className="briti-startups__check" aria-hidden="true">
                      <i className="ri-check-line" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
