"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

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

export default function MarketingNav() {
  const pathname = usePathname() ?? "";
  return (
    <div className="navbar-area">
      <div className="main-nav">
        <div className="container mw-1345">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link className="navbar-brand m-0 d-inline-flex align-items-center" href="/" aria-label="Briticana home">
              <img src={LOGO_SRC} alt="Briticana" className="d-block" style={{ height: "44px", width: "auto" }} />
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
                  <Link href="/contact" className="main-btn">
                    Contact Us
                  </Link>
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
                <img src={LOGO_SRC} alt="Briticana" className="d-block" style={{ height: "40px", width: "auto" }} />
              </Link>
            </div>
            <div className="nav-right-options">
              <ul>
                <li>
                  <Link href="/contact" className="main-btn">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
