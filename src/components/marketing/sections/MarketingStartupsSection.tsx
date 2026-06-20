const TALK_TO_US_PHONE_HREF = "tel:+17342498898";

const STARTUP_SUBMISSIONS = ["Product ideas", "MVP concepts", "Research tasks", "Marketing projects", "Design requirements"];

const TEAM_OUTCOMES = [
  "Explore solutions",
  "Test concepts",
  "Build structured outcomes",
  "Support innovation at lower operational cost",
];

export default function MarketingStartupsSection() {
  return (
    <div className="startups-area marketing-home-section-y">
      <div className="container mw-1345">
        <div className="startups-band about-content-three rounded-4 position-relative overflow-hidden" data-cues="slideInUp">
          <div className="row g-4">
            <div className="col-lg-6">
              <p className="small fw-semibold text-uppercase mb-2 startups-band__eyebrow" style={{ letterSpacing: "0.06em" }}>
                For startups &amp; founders
              </p>
              <h2 className="mb-3">Build with mentored talent teams</h2>
              <p className="mb-4">
                Briticana also supports startups and founders exploring early-stage ideas through supervised project
                teams. All projects are mentor-supervised and designed for educational and execution value.
              </p>
              <a href={TALK_TO_US_PHONE_HREF} className="main-btn">
                Talk to us
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-sm-6">
                  <p className="fw-semibold mb-2 startups-band__subtitle">Startups can submit</p>
                  <ul className="briti-check-list briti-check-list--light list-unstyled mb-0">
                    {STARTUP_SUBMISSIONS.map((item) => (
                      <li key={item} className="d-flex gap-2">
                        <i className="ri-checkbox-circle-fill" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-sm-6">
                  <p className="fw-semibold mb-2 startups-band__subtitle">Our teams help</p>
                  <ul className="briti-check-list briti-check-list--light list-unstyled mb-0">
                    {TEAM_OUTCOMES.map((item) => (
                      <li key={item} className="d-flex gap-2">
                        <i className="ri-checkbox-circle-fill" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
