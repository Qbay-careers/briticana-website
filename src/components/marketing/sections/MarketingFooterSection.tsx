import Link from "next/link";

export default function MarketingFooterSection() {
  return (
    <div className="footer-area bg-03010d">
      <div className="container mw-1345 border-top-bottom ptb-100">
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <Link href="/" className="fw-bold logo text-white">
                <span>Briti</span>cana
              </Link>
              <p>Internship experiences and startup collaboration across Ireland, the UK, Germany, and Finland.</p>
              <ul className="p-0 list-unstyled d-flex align-items-center social">
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                    <i className="ri-facebook-fill" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                    <i className="ri-twitter-fill" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                    <i className="ri-linkedin-fill" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                    <i className="ri-instagram-fill" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <h3>Explore</h3>
              <ul className="import-links p-0 b-0 list-unstyled">
                <li>
                  <Link href="/programs">Programs</Link>
                </li>
                <li>
                  <Link href="/courses">Courses</Link>
                </li>
                <li>
                  <Link href="/internships">Internships</Link>
                </li>
                <li>
                  <Link href="/verification">Verification</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <h3>Pages</h3>
              <ul className="import-links p-0 b-0 list-unstyled">
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/refund-policy">Refund Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <h3>Contact Us</h3>
              <ul className="import-links p-0 b-0 list-unstyled">
                <li>
                  <div className="d-flex align-items-center gap-2">
                    <i className="ri-phone-fill text-white" />
                    <a href="tel:+353000000000">+353 (0) 000 0000</a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-2">
                    <i className="ri-mail-line text-white" />
                    <a href="mailto:hello@briticana.com">hello@briticana.com</a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-2">
                    <i className="ri-map-pin-line text-white" />
                    <span className="text-white">Dublin · London · Berlin</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
