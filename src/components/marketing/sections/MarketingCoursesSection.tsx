import Link from "next/link";

import InternshipIntroCard from "@/components/marketing/InternshipIntroCard";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";
import type { Internship } from "@/lib/sanity/types";

export type MarketingCoursesSectionProps = {
  internships: Internship[];
};

export default function MarketingCoursesSection({ internships }: MarketingCoursesSectionProps) {
  return (
    <div className="courses-area marketing-home-section-y bg-f7f7f7">
      <div className="container mw-1345">
        <div
          className="section-title mw-100 d-flex flex-wrap gap-2 align-items-center justify-content-between"
          data-cues="slideInUp"
        >
          <div className="position-relative z-1 text-center">
            <h2>
              Featured <span>internships</span>
            </h2>
            <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block " alt="" />
            <img
              src={marketingImage("shape4.png")}
              className="d-none d-lg-inline-block position-absolute top-0"
              style={{ right: "-40px" }}
              alt=""
            />
          </div>
          <Link href="/internships" className="main-btn black">
            View all internships
          </Link>
        </div>

        <div className="row g-4" data-cues="slideInUp">
          {internships.map((internship) => (
            <div key={internship._id} className="col-lg-4 col-md-6 d-flex">
              <InternshipIntroCard internship={internship} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
