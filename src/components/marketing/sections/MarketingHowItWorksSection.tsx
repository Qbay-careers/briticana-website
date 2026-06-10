import { marketingImage } from "@/components/marketing/marketingAssetPaths";

type Phase = {
  num: string;
  title: string;
  points: string[];
};

const PHASES: Phase[] = [
  {
    num: "01",
    title: "Apply & Get Assessed ",
    points: ["Submit your application",
      "Share your interests and goals",
      "Highlight your current skill level",
      "Get matched to the right project domain and learning path",
      ],
  },
  {
    num: "02",
    title: "Research & Learning",
    points: ["Self-learning tasks", "Industry understanding", "Tool familiarization", "Market & technical research"],
  },
  {
    num: "03",
    title: "Team Execution",
    points: ["Weekly sprint tasks", "Team collaboration", "Problem solving", "Project development"],
  },
  {
    num: "04",
    title: "Review & Mentorship",
    points: ["Mentor feedback", "Performance reviews", "Quality improvement", "Communication assessments"],
  },
  {
    num: "05",
    title: "Final Delivery",
    points: [
      "Project completion files",
      "What did you learn? (video)",
      "What problem did it solve? (video)",
      "Self-introduction & experience (video)",
    ],
  },
  {
    num: "06",
    title: "Certification & Career Readiness",
    points: ["Experience certification", "Portfolio enhancement", "LinkedIn-ready project proof", "Career readiness guidance"],
  },
];

export default function MarketingHowItWorksSection() {
  return (
    <div className="how-it-works-area marketing-home-section-y">
      <div className="container mw-1345">
        <div className="section-title text-center mx-auto" style={{ maxWidth: "680px" }} data-cues="slideInUp">
          <div className="position-relative z-1">
            <p className="small fw-semibold text-secondary text-uppercase mb-2" style={{ letterSpacing: "0.06em" }}>
              How Briticana works
            </p>
            <h2>
              A simple yet powerful <span>learning journey</span>
            </h2>
            <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block" alt="" />
            <img
              src={marketingImage("shape4.png")}
              className="d-none d-lg-inline-block position-absolute top-0"
              style={{ right: "-40px" }}
              alt=""
            />
          </div>
          <p className="text-secondary mt-3 mb-0">
            Our practical process model simulates how modern startup teams operate — guiding you from onboarding all
            the way to a career-ready portfolio.
          </p>
        </div>

        <div className="row g-4" data-cues="slideInUp">
          {PHASES.map((phase) => (
            <div key={phase.num} className="col-lg-4 col-md-6 d-flex">
              <div className="process-phase-card bg-white rounded-4 p-4 h-100 w-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="process-phase-card__num d-flex justify-content-center align-items-center rounded-circle">
                    {phase.num}
                  </span>
                  <h3 className="h5 fw-bold mb-0">{phase.title}</h3>
                </div>
                <ul className="briti-check-list list-unstyled mb-0">
                  {phase.points.map((p) => (
                    <li key={p} className="d-flex gap-2 small text-secondary">
                      <i className="ri-checkbox-circle-fill" aria-hidden />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
