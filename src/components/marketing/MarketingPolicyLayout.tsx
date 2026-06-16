import Link from "next/link";
import type { ReactNode } from "react";

export type MarketingPolicyLayoutProps = {
  breadcrumbCurrent: string;
  /** Main banner heading (can include a styled span). */
  title: ReactNode;
  intro?: string;
  lastUpdatedLabel: string;
  children: ReactNode;
};

export default function MarketingPolicyLayout({
  breadcrumbCurrent,
  title,
  intro,
  lastUpdatedLabel,
  children,
}: MarketingPolicyLayoutProps) {
  return (
    <>
      <div className="page-banner-area position-relative z-1 pt-100 pb-0">
        <div className="container mw-1345">
          <div className="position-relative z-1">
            <div className="page-banner-content">
              <ul className="p-0 list-unstyled d-flex flex-wrap">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span>{breadcrumbCurrent}</span>
                </li>
              </ul>
              <h2 className="mb-2">{title}</h2>
              {intro ? (
                <p className="text-secondary mt-2 mb-2" style={{ maxWidth: "720px" }}>
                  {intro}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="courses-area pt-5 pb-120 bg-f7f7f7">
        <div className="container mw-1345">
          <article className="legal-doc bg-white rounded-4 shadow-sm p-4 p-lg-5">
            <p className="small text-secondary text-uppercase mb-4 legal-doc__meta" style={{ letterSpacing: "0.06em" }}>
              Last updated: {lastUpdatedLabel}
            </p>
            {children}
          </article>
        </div>
      </div>
    </>
  );
}
