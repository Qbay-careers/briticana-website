import Link from "next/link";

import { marketingIcon, marketingImage } from "@/components/marketing/marketingAssetPaths";

export default function MarketingAboutSection() {
  return (
    <div className="about-area ptb-120">
      <div className="container mw-1345">
        <div className="row g-4 align-items-center" data-cues="slideInUp">
          <div className="col-lg-6">
            <div className="about-img position-relative z-1">
              <img src={marketingImage("about.png")} alt="" />
              <img src={marketingImage("shape5.png")} className="shape5 position-absolute d-none d-lg-inline-block" alt="" />
              <img src={marketingImage("shape6.png")} className="shape6 position-absolute d-none d-lg-inline-block" alt="" />
              <img src={marketingImage("shape7.png")} className="shape7 position-absolute d-none d-lg-inline-block" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-content">
              <div className="d-inline-block position-relative z-1 mb-50">
                <h2>
                  A Fresh Approach to Enhancing <span>Your Skills</span>
                </h2>
                <img src={marketingImage("title-shape.png")} className="ms-lg-5" alt="" />
                <img
                  src={marketingImage("shape4.png")}
                  className="shape4 position-absolute top-0"
                  style={{ right: "-20px" }}
                  alt=""
                />
              </div>
              <p className="dec">
                Possessing a strong education is among the most important advantages a person can hold. It profoundly
                impacts personal and professional development.
              </p>
              <div className="d-sm-flex about-info mt-40">
                <div className="flex-shrink-0">
                  <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                    <img src={marketingIcon("call.svg")} alt="" />
                  </div>
                </div>
                <div className="flex-grow-1 mt-3 mt-sm-0">
                  <h3>Flexible Study Hours</h3>
                  <p>Flexible scheduling empowers students to learn at their own pace and convenience.</p>
                </div>
              </div>
              <div className="d-sm-flex about-info">
                <div className="flex-shrink-0">
                  <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                    <img src={marketingIcon("instructors.svg")} alt="" />
                  </div>
                </div>
                <div className="flex-grow-1 mt-3 mt-sm-0">
                  <h3>Qualified Instructors</h3>
                  <p>
                    Every Instructor is certified and holds advanced degrees, ensuring you&apos;re guided by true
                    professionals.
                  </p>
                </div>
              </div>
              <div className="d-sm-flex about-info">
                <div className="flex-shrink-0">
                  <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                    <img src={marketingIcon("career.svg")} alt="" />
                  </div>
                </div>
                <div className="flex-grow-1 mt-3 mt-sm-0">
                  <h3>Advance Your Career</h3>
                  <p>
                    Build confidence for job interviews through realistic practice sessions, detailed feedback, and
                    presentation tips.
                  </p>
                </div>
              </div>
              <Link href="/programs" className="main-btn">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
