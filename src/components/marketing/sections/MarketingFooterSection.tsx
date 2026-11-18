import type { ReactNode } from "react";
import Link from "next/link";

import { marketingImage } from "@/components/marketing/marketingAssetPaths";
import type { FooterNavLink, SiteSettings } from "@/lib/sanity/types";

const FOOTER_LOGO_SRC = `${marketingImage("logo/footer-logo.webp")}?v=1`;
const DEFAULT_PHONE = "+17342498898.";
const DEFAULT_EMAIL =
  "Info@briticana.us hr@briticana.us support@briticana.us career@briticana.us";
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

const DEFAULT_TAGLINE =
  "Internship experiences and startup collaboration across Ireland, the UK, Germany, and Finland.";
const DEFAULT_LOCATIONS =
  "2nd Floor , Room Number 019 ,206 E Huron St, Ann Arbor, MI 48104, United States";
const DEFAULT_LINKEDIN_URL =
  "https://www.linkedin.com/company/briticana/?viewAsMember=true";

const DEFAULT_EXPLORE_LINKS: FooterNavLink[] = [
  // { _key: "1", label: "Programs", href: "/programs" },
  // { _key: "2", label: "Courses", href: "/courses" },
  { _key: "3", label: "Internships", href: "/internships" },
  { _key: "4", label: "Experience Centers", href: "/experience-centers" },
  { _key: "5", label: "Briticana World", href: "/briticana-world" },
  { _key: "6", label: "Verification", href: "/verification" },
];

const DEFAULT_PAGE_LINKS: FooterNavLink[] = [
  { _key: "about", label: "About Us", href: "/about" },
  { _key: "contact", label: "Contact Us", href: "/contact" },
  { _key: "2", label: "Privacy Policy", href: "/privacy-policy" },
  { _key: "3", label: "Terms & Conditions", href: "/terms-and-conditions" },
  { _key: "4", label: "Refund Policy", href: "/refund-policy" },
  { _key: "5", label: "Certification Policy", href: "/certification-policy" },
];

type SocialEntry = { key: string; url: string; label: string; icon: ReactNode };

function socialLinksFromSettings(settings?: SiteSettings | null): SocialEntry[] {
  const out: SocialEntry[] = [];
  const fb = settings?.facebook?.trim();
  if (fb) {
    out.push({
      key: "facebook",
      url: fb,
      label: "Facebook",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
        </svg>
      ),
    });
  }
  const tw = settings?.twitter?.trim();
  if (tw) {
    out.push({
      key: "twitter",
      url: tw,
      label: "Twitter",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
        </svg>
      ),
    });
  }
  const li = settings ? settings.linkedin?.trim() : DEFAULT_LINKEDIN_URL;
  if (li) {
    out.push({
      key: "linkedin",
      url: li,
      label: "LinkedIn",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
        </svg>
      ),
    });
  }
  const ig = settings?.instagram?.trim();
  if (ig) {
    out.push({
      key: "instagram",
      url: ig,
      label: "Instagram",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
      ),
    });
  }
  return out;
}

function contactEmailsFromSettings(email?: string): string[] {
  const rawEmail = email?.trim() || DEFAULT_EMAIL;
  const parsedEmails = rawEmail.match(EMAIL_PATTERN)?.map((item) => item.trim()).filter(Boolean) ?? [];

  return parsedEmails.length > 0 ? Array.from(new Set(parsedEmails)) : [rawEmail];
}

export type MarketingFooterSectionProps = {
  settings?: SiteSettings | null;
};

/** Desktop navbar brand height ? keep footer logo aligned (`MarketingNav`). */
const FOOTER_LOGO_HEIGHT_PX = 90;

export default function MarketingFooterSection({ settings }: MarketingFooterSectionProps) {
  const tagline = settings?.footerTagline?.trim() || DEFAULT_TAGLINE;
  const locations = settings?.footerLocations?.trim() || DEFAULT_LOCATIONS;
  const phone = settings?.contactNumber?.trim() || DEFAULT_PHONE;
  const emails = contactEmailsFromSettings(settings?.email);

  const exploreLinks =
    settings?.footerExploreLinks?.length ? settings.footerExploreLinks : DEFAULT_EXPLORE_LINKS;
  const rawPageLinks =
    settings?.footerPageLinks?.length ? settings.footerPageLinks : DEFAULT_PAGE_LINKS;

  const hasAbout = rawPageLinks.some((l) => l.href === "/about");
  const hasContact = rawPageLinks.some((l) => l.href === "/contact");
  const pageLinks: FooterNavLink[] = [...rawPageLinks];
  if (!hasContact) {
    pageLinks.unshift({ _key: "contact", label: "Contact Us", href: "/contact" });
  }
  if (!hasAbout) {
    pageLinks.unshift({ _key: "about", label: "About Us", href: "/about" });
  }

  const socials = socialLinksFromSettings(settings);

  return (
    <div className="footer-area bg-03010d">
      <div className="container mw-1345 briti-footer-main">
        <div className="row g-4">
          {/* Column 1 ? Brand */}
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
              <p className="briti-footer-tagline">{tagline}</p>
              {socials.length > 0 ? (
                <ul className="p-0 list-unstyled d-flex align-items-center social mb-0">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="bg-white text-decoration-none briti-footer-social-link"
                      >
                        {s.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {/* Column 2 ? Explore */}
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

          {/* Column 3 ? Pages */}
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

          {/* Column 4 ? Contact Us */}
          <div className="col-lg-3 col-sm-6">
            <div className="footer-single-item">
              <h3>
                <Link href="/contact" className="text-white text-decoration-none">
                  Contact Us
                </Link>
              </h3>
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
                    <div className="d-flex flex-column align-items-start gap-1">
                      {emails.map((email) => (
                        <a key={email} href={`mailto:${email}`}>
                          {email}
                        </a>
                      ))}
                    </div>
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
