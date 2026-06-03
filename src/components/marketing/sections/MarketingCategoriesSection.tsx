import Link from "next/link";

import { marketingIcon, marketingImage } from "@/components/marketing/marketingAssetPaths";
import { CATEGORY_ITEMS } from "@/components/marketing/sections/marketingHomeData";
import type { InternshipDomainDoc } from "@/lib/sanity/types";

/** Theme category icons — cycled when listing Sanity domains. */
const DOMAIN_CARD_ICONS = [
  "categories1.svg",
  "categories2.svg",
  "categories3.svg",
  "categories4.svg",
  "categories5.svg",
  "categories6.svg",
  "categories7.svg",
  "categories8.svg",
] as const;

export type MarketingCategoriesSectionProps = {
  internshipDomains?: InternshipDomainDoc[];
};

export default function MarketingCategoriesSection({
  internshipDomains = [],
}: MarketingCategoriesSectionProps) {
  const useSanityDomains = internshipDomains.length > 0;

  return (
    <div className="categories-area pb-120 tp-panel-pin-area">
      <div className="container mw-1345">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="categories-content position-sticky z-1">
              <h2>
                Explore Internship <span>Domains</span>
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
                {useSanityDomains
                  ? internshipDomains.map((d, index) => {
                      const slug = d.slug?.current?.trim();
                      const href = slug ? `/internships?domain=${encodeURIComponent(slug)}` : "/internships";
                      const icon = DOMAIN_CARD_ICONS[index % DOMAIN_CARD_ICONS.length];
                      return (
                        <div key={d._id} className="col-md-4 col-sm-6">
                          <Link
                            href={href}
                            className="categories-single-item text-decoration-none d-block text-center bg-white"
                          >
                            <div className="icon-border">
                              <div className="icon d-flex justify-content-center align-items-center mx-auto rounded-circle">
                                <img src={marketingIcon(icon)} alt="" />
                              </div>
                            </div>
                            <h3>{d.title}</h3>
                            <div className="d-flex align-items-center gap-2 justify-content-center">
                              <span>View internships</span>
                              <img src={marketingIcon("right-arrow.svg")} className="right-arrow" alt="" />
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  : CATEGORY_ITEMS.map((c) => (
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
                    href="/domains"
                    className="categories-single-item text-decoration-none d-block text-center h-100 d-flex justify-content-center align-items-center all gap-2"
                  >
                    <span>All domains</span>
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
