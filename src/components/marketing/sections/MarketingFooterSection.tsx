import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";
import type { FooterNavLink, SiteSettings } from "@/lib/sanity/types";

const FOOTER_LOGO_SRC = marketingImage("logo/logo.webp");

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
  { _key: "5", label: "Certification Policy", href: "/certification-policy" },
];

type SocialEntry = { url: string; icon: string };

function socialLinksFromSettings(settings?: SiteSettings | null): SocialEntry[] {
  const out: SocialEntry[] = [];
  const fb = settings?.facebook?.trim();
  if (fb) out.push({ url: fb, icon: "ri-facebook-fill" });
  const tw = settings?.twitter?.trim();
  if (tw) out.push({ url: tw, icon: "ri-twitter-fill" });
  const li = settings?.linkedin?.trim();
  if (li) out.push({ url: li, icon: "ri-linkedin-fill" });
  const ig = settings?.instagram?.trim();
  if (ig) out.push({ url: ig, icon: "ri-instagram-fill" });
  return out;
}

export type MarketingFooterSectionProps = {
  settings?: SiteSettings | null;
};

/** Desktop navbar brand height — keep footer logo aligned (`MarketingNav`). */
const FOOTER_LOGO_HEIGHT_PX = 90;

export default function MarketingFooterSection({ settings }: MarketingFooterSectionProps) {
  const tagline = settings?.footerTagline?.trim() || DEFAULT_TAGLINE;
  const locations = settings?.footerLocations?.trim() || DEFAULT_LOCATIONS;
  const phone = settings?.contactNumber?.trim() || "+353 (0) 000 0000";
  const email = settings?.email?.trim() || "hello@briticana.com";

  const exploreLinks =
    settings?.footerExploreLinks?.length ? settings.footerExploreLinks : DEFAULT_EXPLORE_LINKS;
  const pageLinks =
    settings?.footerPageLinks?.length ? settings.footerPageLinks : DEFAULT_PAGE_LINKS;

  const socials = socialLinksFromSettings(settings);

  return (
    <div className="footer-area bg-03010d">
      <div className="container mw-1345 border-top-bottom ptb-100">
        <div className="row g-4">
          {/* Column 1 — Brand */}
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <Link href="/" className="logo d-inline-block text-decoration-none" aria-label="Briticana home">
                <img
                  src={FOOTER_LOGO_SRC}
                  alt="Briticana"
                  className="marketing-footer-logo d-block"
                  style={{ height: `${FOOTER_LOGO_HEIGHT_PX}px`, width: "auto" }}
                />
              </Link>
              <p>{tagline}</p>
              {socials.length > 0 ? (
                <ul className="p-0 list-unstyled d-flex align-items-center social">
                  {socials.map((s) => (
                    <li key={s.icon}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                        <i className={s.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
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
                  <div className="d-flex align-items-start gap-2">
                    <i className="ri-map-pin-line text-white align-self-start" />
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
