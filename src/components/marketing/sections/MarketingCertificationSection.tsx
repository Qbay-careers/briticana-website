import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";

const CERTIFICATE_INCLUDES = [
  "Project role",
  "Skills applied",
  "Project contribution",
  "Mentor evaluation",
  "Completion verification",
];

const PERFECT_FOR = ["Job applications", "LinkedIn profiles", "Freelance opportunities", "Portfolio building"];

export type MarketingCertificationSectionProps = {
  homeHero: HomeHeroData;
};

export default function MarketingCertificationSection({ homeHero }: MarketingCertificationSectionProps) {
  return (
    <div className="certification-area bg-f7f7f7 ptb-120">
      <div className="container mw-1345">
        <div className="row g-4 align-items-center" data-cues="slideInUp">
          <div className="col-lg-6 order-lg-2">
            <div className="about-img position-relative z-1 text-center text-lg-end">
              {/* Certificate image: managed via Sanity "Certification section" tab */}
              <img
                src={homeHero.certImage}
                className="cert-main-img img-fluid"
                alt="Briticana experience certificate"
              />
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="about-content">
              <div className="d-inline-block position-relative z-1 mb-4">
                <p className="small fw-semibold text-secondary text-uppercase mb-2" style={{ letterSpacing: "0.06em" }}>
                  Certification
                </p>
                <h2>
                  Earn Experience You <span>Can Actually Show</span>
                </h2>
                <img src={marketingImage("title-shape.png")} className="ms-lg-5" alt="" />
              </div>
              <p className="dec mb-4">
                After successful completion, participants receive a Briticana Experience Certificate that documents the
                work you actually did:
              </p>

              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <p className="fw-semibold mb-2">Your certificate includes</p>
                  <ul className="briti-check-list list-unstyled mb-0">
                    {CERTIFICATE_INCLUDES.map((item) => (
                      <li key={item} className="d-flex gap-2 text-secondary">
                        <i className="ri-checkbox-circle-fill" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-sm-6">
                  <p className="fw-semibold mb-2">Perfect for</p>
                  <ul className="briti-check-list list-unstyled mb-0">
                    {PERFECT_FOR.map((item) => (
                      <li key={item} className="d-flex gap-2 text-secondary">
                        <i className="ri-checkbox-circle-fill" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/verification" className="main-btn">
                Verify a certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
