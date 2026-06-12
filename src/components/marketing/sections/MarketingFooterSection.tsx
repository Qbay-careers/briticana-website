import Link from "next/link";

import type { FooterNavLink, SiteSettings } from "@/lib/sanity/types";

const DEFAULT_TAGLINE =
  "Internship experiences and startup collaboration across Ireland, the UK, Germany, and Finland.";
const DEFAULT_LOCATIONS = "Dublin · London · Berlin";

const DEFAULT_EXPLORE_LINKS: FooterNavLink[] = [
  // { _key: "1", label: "Programs", href: "/programs" },
  // { _key: "2", label: "Courses", href: "/courses" },
  { _key: "3", label: "Internships", href: "/internships" },
  { _key: "4", label: "Verification", href: "/verification" },
];

const DEFAULT_PAGE_LINKS: FooterNavLink[] = [
  // { _key: "1", label: "Contact", href: "/contact" },
  { _key: "2", label: "Privacy Policy", href: "/privacy-policy" },
  { _key: "3", label: "Terms & Conditions", href: "/terms-and-conditions" },
  { _key: "4", label: "Refund Policy", href: "/refund-policy" },
];

type SocialEntry = { url: string; icon: string };

export type MarketingFooterSectionProps = {
  settings?: SiteSettings | null;
};

export default function MarketingFooterSection({ settings }: MarketingFooterSectionProps) {
  const tagline = settings?.footerTagline?.trim() || DEFAULT_TAGLINE;
  const locations = settings?.footerLocations?.trim() || DEFAULT_LOCATIONS;
  const phone = settings?.contactNumber?.trim() || "+353 (0) 000 0000";
  const email = settings?.email?.trim() || "hello@briticana.com";

  const exploreLinks =
    settings?.footerExploreLinks?.length ? settings.footerExploreLinks : DEFAULT_EXPLORE_LINKS;
  const pageLinks =
    settings?.footerPageLinks?.length ? settings.footerPageLinks : DEFAULT_PAGE_LINKS;

  // Build social links from settings, falling back to placeholder URLs.
  const socials: SocialEntry[] = [
    { url: settings?.facebook?.trim() || "https://www.facebook.com/", icon: "ri-facebook-fill" },
    { url: settings?.twitter?.trim() || "https://x.com/", icon: "ri-twitter-fill" },
    { url: settings?.linkedin?.trim() || "https://www.linkedin.com/", icon: "ri-linkedin-fill" },
    { url: settings?.instagram?.trim() || "https://www.instagram.com/", icon: "ri-instagram-fill" },
  ];

  return (
    <div className="footer-area bg-03010d">
      <div className="container mw-1345 border-top-bottom ptb-100">
        <div className="row g-4">
          {/* Column 1 — Brand */}
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <Link href="/" className="fw-bold logo text-white">
                <span>Briti</span>cana
              </Link>
              <p>{tagline}</p>
              <ul className="p-0 list-unstyled d-flex align-items-center social">
                {socials.map((s) => (
                  <li key={s.icon}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                      <i className={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <h3>Explore</h3>
              <ul className="import-links p-0 b-0 list-unstyled">
                {exploreLinks.map((link) =>
                  link.label && link.href ? (
                    <li key={link._key}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>

          {/* Column 3 — Pages */}
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <h3>Pages</h3>
              <ul className="import-links p-0 b-0 list-unstyled">
                {pageLinks.map((link) =>
                  link.label && link.href ? (
                    <li key={link._key}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>

          {/* Column 4 — Contact Us */}
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              {/* <h3>Contact Us</h3> */}
              <ul className="import-links p-0 b-0 list-unstyled">
                <li>
                  <div className="d-flex align-items-center gap-2">
                    <i className="ri-phone-fill text-white" />
                    <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-start gap-2">
                    <i className="ri-mail-line text-white" />
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-2">
                    <i className="ri-map-pin-line text-white" />
                    <span className="text-white">{locations}</span>
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
