import Link from "next/link";

export default function MarketingNav() {
  return (
    <div className="navbar-area">
      <div className="main-nav">
        <div className="container mw-1345">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link className="navbar-brand fw-bold m-0" href="/">
              <span>Briti</span>cana
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
                  <Link href="/programs" className="nav-link">
                    Programs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/courses" className="nav-link">
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/verification" className="nav-link">
                    Verification
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact" className="nav-link">
                    Contact
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
              <Link href="/">
                <span>Briti</span>cana
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
