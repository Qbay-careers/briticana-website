import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

import { COURSE_CARDS } from "@/components/marketing/sections/marketingHomeData";

export default function MarketingCoursesSection() {
  return (
    <div className="courses-area ptb-120 bg-f7f7f7">
      <div className="container mw-1345">
        <div
          className="section-title mw-100 d-flex flex-wrap gap-2 align-items-center justify-content-between"
          data-cues="slideInUp"
        >
          <div className="position-relative z-1 text-center">
            <h2>
              Most Popular <span>Courses</span>
            </h2>
            <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block " alt="" />
            <img
              src={marketingImage("shape4.png")}
              className="d-none d-lg-inline-block position-absolute top-0"
              style={{ right: "-40px" }}
              alt=""
            />
          </div>
          <Link href="/courses" className="main-btn">
            View All Courses
          </Link>
        </div>

        <div className="row g-4" data-cues="slideInUp">
          {COURSE_CARDS.map((c) => (
            <div key={c.title} className="col-lg-4 col-md-6">
              <div className="courses-single-item">
                <Link href="/internships" className="d-block courses-img">
                  <img src={marketingImage(c.img)} alt="" />
                </Link>
                <div className="courses-content">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link href="/internships" className="tag">
                      {c.tag}
                    </Link>
                    <div className="d-flex align-items-center start">
                      <i className="ri-star-fill" />
                      <i className="ri-star-fill" />
                      <i className="ri-star-fill" />
                      <i className="ri-star-fill" />
                      <i className="ri-star-fill" />
                    </div>
                  </div>
                  <Link href="/internships" className="title text-decoration-none">
                    <h3>{c.title}</h3>
                  </Link>
                  <Link href="/programs" className="d-flex align-items-center text-decoration-none">
                    <div className="flex-shrink-0">
                      <img
                        src={marketingImage(c.userImg)}
                        className="rounded-circle"
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">{c.author}</div>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center course-info">
                    <div className="d-flex align-items-center" style={{ gap: "20px" }}>
                      <div className="d-flex align-items-center" style={{ gap: "7px" }}>
                        <i className="ri-time-line" />
                        <span>{c.hours}</span>
                      </div>
                      <div className="d-flex align-items-center" style={{ gap: "7px" }}>
                        <i className="ri-user-line" />
                        <span>{c.students}</span>
                      </div>
                    </div>
                    <h4 className="mb-0">
                      <del>{c.priceWas}</del>
                      <span>{c.priceNow}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
