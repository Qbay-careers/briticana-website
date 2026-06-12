import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";
import { urlForSanityImage } from "@/lib/sanity/image";
import type { InternshipDomainListItem } from "@/lib/sanity/types";

const CATEGORY_TILE_ICONS = [
  "categorie1.svg",
  "categorie2.svg",
  "categorie3.svg",
  "categorie4.svg",
  "categorie5.svg",
  "categorie6.svg",
] as const;

function countLabel(n: number): string {
  if (n === 1) return "1 internship";
  return `${n} internships`;
}

export type MarketingDomainsListingSectionProps = {
  domains: InternshipDomainListItem[];
  sanityConfigured?: boolean;
};

export default function MarketingDomainsListingSection({
  domains,
  sanityConfigured = true,
}: MarketingDomainsListingSectionProps) {
  return (
    <>
      <div className="page-banner-area position-relative z-1 ptb-100">
        <div className="container mw-1345">
          <div className="position-relative z-1">
            <div className="page-banner-content">
              <ul className="p-0 list-unstyled d-flex flex-wrap">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span>Domains</span>
                </li>
              </ul>
              <h2>
                Explore internship <span>domains</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-area-three pb-100">
        <div className="container mw-1345">
          
          {domains.length === 0 ? (
            <p className="text-center text-secondary mt-4 mb-0">
              {sanityConfigured
                ? "Publish internship domain documents in Sanity to list categories here."
                : "Connect Sanity (set NEXT_PUBLIC_SANITY_PROJECT_ID) to load internship domains from the CMS."}
            </p>
          ) : (
            <div className="row g-4 justify-content-center">
              {domains.map((d, index) => {
                const slug = d.slug?.current?.trim();
                const href = slug ? `/internships?domain=${encodeURIComponent(slug)}` : "/internships";
                const icon = CATEGORY_TILE_ICONS[index % CATEGORY_TILE_ICONS.length];
                const sanityIconUrl = urlForSanityImage((d as any).icon, 80, 80);
                const n = typeof d.internshipCount === "number" ? d.internshipCount : 0;
                return (
                  <div key={d._id} className="col-xxl-2 col-xl-3 col-md-4 col-sm-6">
                    <Link
                      href={href}
                      className="categories-single-item-three d-block text-decoration-none position-relative z-1"
                    >
                      <div className="d-flex justify-content-center">
                        <div className="icon d-flex justify-content-center align-items-center">
                          <img
                            src={sanityIconUrl ?? marketingImage(icon)}
                            alt={d.title ?? ""}
                            className="domain-icon-img"
                          />
                        </div>
                      </div>
                      <h3>{d.title}</h3>
                      <div className="d-flex justify-content-center gap-1">
                        <span>{countLabel(n)}</span>
                        <i className="ri-arrow-right-long-line" aria-hidden />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
