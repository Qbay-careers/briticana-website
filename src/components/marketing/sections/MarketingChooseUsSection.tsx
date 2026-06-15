import { marketingIcon, marketingImage } from "@/components/marketing/marketingAssetPaths";

type TrustFeature = {
  title: string;
  description: string;
  icon: string;
  isThemeIcon?: boolean;
};

const TRUST_FEATURES: TrustFeature[] = [
  {
    title: "Structured internship-style experience",
    description: "A professional workflow of tasks, reviews, and deliverables — not passive video lessons.",
    icon: "categories1.svg",
    isThemeIcon: true,
  },
  {
    title: "Guided mentorship & reviews",
    description: "Regular mentor checkpoints and review sessions keep your work on track.",
    icon: "instructors.svg",
    isThemeIcon: true,
  },
  {
    title: "Team collaboration model",
    description: "Work inside a small collaborative team, just like a modern startup.",
    icon: "networking.svg",
  },
  {
    title: "Real-world project execution",
    description: "Solve real business challenges and ship outcomes that matter.",
    icon: "categories3.svg",
    isThemeIcon: true,
  },
  {
    title: "Transparent learning process",
    description: "Clear goals, timelines, and expectations at every stage of the journey.",
    icon: "world.svg",
  },
  {
    title: "Performance-based evaluation",
    description: "Assessed on contribution, communication, problem-solving, and execution quality.",
    icon: "categories5.svg",
    isThemeIcon: true,
  },
  {
    title: "Internship certificate with experience verification",
    description: "Finish with a verifiable certificate backed by real project evidence.",
    icon: "resume.svg",
  },
  {
    title: "Practical applications of concepts",
    description:
      "Turn ideas into action with hands-on tasks that mirror how concepts are used on real projects.",
    icon: "categories2.svg",
    isThemeIcon: true,
  },
  {
    title: "Industry relevant skill development",
    description:
      "Grow capabilities that match how modern teams collaborate, communicate, and deliver outcomes.",
    icon: "categories4.svg",
    isThemeIcon: true,
  },
];

export default function MarketingChooseUsSection() {
  return (
    <div className="choose-us-area bg-f7f7f7 marketing-home-section-y">
      <div className="container mw-1345">
        <div className="section-title text-center mx-auto" style={{ maxWidth: "640px" }} data-cues="slideInUp">
          <div className="position-relative z-1">
            <p className="small fw-semibold text-secondary text-uppercase mb-2" style={{ letterSpacing: "0.06em" }}>
              Why students trust Briticana
            </p>
            <h2>
              Real work. Real learning. <span>Real growth.</span>
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
            We focus on execution-based learning. Every participant joins a structured project environment where
            tasks, reviews, collaboration, and deliverables follow a professional workflow — the way real startups and
            modern companies operate.
          </p>
        </div>

        <div className="row g-4 justify-content-center" data-cues="slideInUp">
          {TRUST_FEATURES.map((feature) => (
            <div key={feature.title} className="col-lg-4 col-md-6 d-flex">
              <div className="trust-feature-card bg-white rounded-4 p-4 h-100 w-100">
                <div className="trust-feature-card__icon d-flex justify-content-center align-items-center rounded-circle mb-3">
                  <img src={feature.isThemeIcon ? marketingIcon(feature.icon) : marketingImage(feature.icon)} alt="" />
                </div>
                <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                <p className="text-secondary small mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center fw-semibold mt-4 mb-0 trust-feature-note">
          We do not believe in passive learning. We believe skills are built through doing.
        </p>
      </div>
    </div>
  );
}
