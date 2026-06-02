import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

import { TEAM } from "@/components/marketing/sections/marketingHomeData";

export default function MarketingTeamSection() {
  return (
    <div className="team-area pb-120">
      <div className="container mw-1345">
        <div className="section-title text-center mx-auto" style={{ maxWidth: "760px" }}>
          <div className="position-relative z-1" data-cues="slideInUp">
            <h2>
              Expert <span>Instructors Committed</span> to Your Success
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
        <div className="row g-4" data-cues="slideInUp">
          {TEAM.map((m) => (
            <div key={m.name} className="col-lg-4 col-sm-6">
              <Link href="/programs" className="team-single-item d-block text-decoration-none">
                <div className="team-img">
                  <img src={marketingImage(m.img)} alt="" />
                </div>
                <div className="team-content">
                  <h3>{m.name}</h3>
                  <span>{m.role}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <p className="apply">
          Interested in teaching with us?{" "}
          <Link href="/login">Join our instructor team</Link>
        </p>
      </div>
    </div>
  );
}
