import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

import { BLOGS } from "@/components/marketing/sections/marketingHomeData";

export default function MarketingBlogSection() {
  return (
    <div className="blog-area ptb-120">
      <div className="container mw-1345">
        <div
          className="section-title mw-100 d-flex flex-wrap gap-2 align-items-center justify-content-between"
          data-cues="slideInUp"
        >
          <div className="position-relative z-1 text-center">
            <h2>
              Trending <span>Insights & Articles</span>
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
            Explore All Courses
          </Link>
        </div>
        <div className="row justify-content-center g-4" data-cues="slideInUp">
          {BLOGS.map((b) => (
            <div key={b.title} className="col-lg-4 col-md-6">
              <div className="blog-single-item">
                <Link href="/programs">
                  <img src={marketingImage(b.img)} alt="" />
                </Link>
                <div className="blog-content">
                  <ul className="p-0 list-unstyled info d-flex align-items-center" style={{ gap: "30px" }}>
                    <li className="d-flex align-items-center gap-2">
                      <i className="ri-calendar-line" />
                      <span>{b.date}</span>
                    </li>
                    <li>
                      <Link href="/programs" className="text-decoration-none d-flex align-items-center gap-2">
                        <i className="ri-chat-2-line position-relative" style={{ top: "2px" }} />
                        <span>Comment ({b.comments})</span>
                      </Link>
                    </li>
                  </ul>
                  <Link href="/programs" className="text-decoration-none d-block">
                    <h3>{b.title}</h3>
                  </Link>
                  <Link href="/programs" className="main-btn">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
