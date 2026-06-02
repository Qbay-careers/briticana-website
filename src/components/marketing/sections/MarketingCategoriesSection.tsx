import Link from "next/link";

import { marketingIcon, marketingImage } from "@/components/marketing/marketingAssetPaths";

import { CATEGORY_ITEMS } from "@/components/marketing/sections/marketingHomeData";

export default function MarketingCategoriesSection() {
  return (
    <div className="categories-area pb-120 tp-panel-pin-area">
      <div className="container mw-1345">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="categories-content position-sticky z-1">
              <h2>
                Browse Course <span>Categories</span>
              </h2>
              <div className="ms-lg-5 d-none d-lg-block">
                <img src={marketingImage("title-shape.png")} alt="" />
              </div>
              <img
                src={marketingImage("shape4.png")}
                className="position-absolute top-0 d-none d-lg-inline-block"
                style={{ right: "-30px" }}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="categories-wrap">
              <div className="row g-4" data-cues="slideInUp">
                {CATEGORY_ITEMS.map((c) => (
                  <div key={c.title} className="col-md-4 col-sm-6">
                    <Link
                      href={c.href}
                      className="categories-single-item text-decoration-none d-block text-center bg-white"
                    >
                      <div className="icon-border">
                        <div className="icon d-flex justify-content-center align-items-center mx-auto rounded-circle">
                          <img src={marketingIcon(c.icon)} alt="" />
                        </div>
                      </div>
                      <h3>{c.title}</h3>
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <span>{c.count}</span>
                        <img src={marketingIcon("right-arrow.svg")} className="right-arrow" alt="" />
                      </div>
                    </Link>
                  </div>
                ))}
                <div className="col-md-4 col-sm-6">
                  <Link
                    href="/programs"
                    className="categories-single-item text-decoration-none d-block text-center h-100 d-flex justify-content-center align-items-center all gap-2"
                  >
                    <span>All Categories</span>
                    <img src={marketingIcon("right-arrow.svg")} className="right-arrow" alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
