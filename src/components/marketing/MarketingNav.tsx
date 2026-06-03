import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";

const LOGO_SRC = marketingImage("logo/logo.webp");

export default function MarketingNav() {
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
                  <Link href="/" className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/internships" className="nav-link">
                    Internships
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/verification" className="nav-link">
                    Verification
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" className="nav-link">
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
