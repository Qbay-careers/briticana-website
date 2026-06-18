"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import MarketingCtaLink from "@/components/marketing/MarketingCtaLink";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";
import type { SiteSettings } from "@/lib/sanity/types";
import { resolveStudentApplyUrl } from "@/lib/studentApplicationForm";

const LOGO_SRC = marketingImage("logo/logo.webp");

function navLinkClass(pathname: string, href: string): string {
  if (href === "/") {
    return pathname === "/" ? "nav-link active" : "nav-link";
  }
  if (pathname === href || pathname.startsWith(`${href}/`)) {
    return "nav-link active";
  }
  return "nav-link";
}

export type MarketingNavProps = {
  settings?: SiteSettings | null;
};

export default function MarketingNav({ settings }: MarketingNavProps) {
  const pathname = usePathname() ?? "";
  const applyUrl = resolveStudentApplyUrl(settings?.marketingApplyUrl);

  return (
    <div className="navbar-area">
      <div className="main-nav">
        <div className="container mw-1345">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand m-0 d-inline-flex align-items-center" href="/" aria-label="Briticana home">
              <img src={LOGO_SRC} alt="Briticana" className="d-block" style={{ height: "90px", width: "auto" }} />
            </Link>
            <div className="collapse navbar-collapse for-mobile-menu" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <Link href="/" className={navLinkClass(pathname, "/")}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/domains" className={navLinkClass(pathname, "/domains")}>
                    Domains
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/internships" className={navLinkClass(pathname, "/internships")}>
                    Internships
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/verification" className={navLinkClass(pathname, "/verification")}>
                    Verification
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" className={navLinkClass(pathname, "/login")}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav-right-options">
              <ul>
                <li>
                  <MarketingCtaLink href={applyUrl} className="main-btn">
                    Apply Now
                  </MarketingCtaLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="mobile-nav">
        <div className="container">
          <div className="mobile-menu position-relative">
            <div className="logo">
              <Link href="/" aria-label="Briticana home">
                <img src={LOGO_SRC} alt="Briticana" className="d-block" style={{ height: "70px", width: "auto" }} />
              </Link>
            </div>
            <div className="nav-right-options">
              <ul>
                <li>
                  <MarketingCtaLink href={applyUrl} className="main-btn">
                    Apply Now
                  </MarketingCtaLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
