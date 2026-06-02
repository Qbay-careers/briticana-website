import Link from "next/link";

type FooterProps = Record<string, never>;

export default function Footer(_props: FooterProps) {
  // TODO: render sitemap columns, social links from Sanity site settings, and legal links consistent with Briticana branding.
  return (
    <div className="bg-dark text-light mt-auto py-5" data-component="Footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <p className="fw-semibold mb-2">Briticana</p>
            <p className="small text-secondary mb-0">
              Internship experiences and a curated showcase of startup collaboration across Europe.
            </p>
          </div>
          <div className="col-md-4">
            <p className="fw-semibold mb-2">Explore</p>
            <ul className="list-unstyled small mb-0">
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/internships">
                  Internships
                </Link>
              </li>
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/programs">
                  Programs
                </Link>
              </li>
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/courses">
                  Courses
                </Link>
              </li>
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/verification">
                  Verification
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <p className="fw-semibold mb-2">Policies</p>
            <ul className="list-unstyled small mb-0">
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/privacy-policy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/terms-and-conditions">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/refund-policy">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/certification-policy">
                  Certification policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <p className="small text-secondary mb-0">© {new Date().getFullYear()} Briticana. All rights reserved.</p>
      </div>
    </div>
  );
}
