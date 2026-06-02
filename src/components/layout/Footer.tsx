import Link from "next/link";

import type { SiteSettings } from "@/lib/sanity/types";

export type FooterProps = {
  settings?: SiteSettings | null;
};

function safeExternalUrl(url: string | undefined): string | undefined {
  const u = url?.trim();
  if (!u) return undefined;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return undefined;
}

export default function Footer({ settings }: FooterProps) {
  const email = settings?.email?.trim() || "hello@briticana.com";
  const phone = settings?.contactNumber?.trim();
  const wa = safeExternalUrl(settings?.whatsappUrl);
  const address = settings?.officeAddress?.trim();
  const maps = safeExternalUrl(settings?.googleMapsLink);

  const social = [
    { href: safeExternalUrl(settings?.facebook), label: "Facebook" },
    { href: safeExternalUrl(settings?.instagram), label: "Instagram" },
    { href: safeExternalUrl(settings?.linkedin), label: "LinkedIn" },
    { href: wa, label: "WhatsApp" },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <div className="bg-dark text-light mt-auto py-5" data-component="Footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <p className="fw-semibold mb-2">Briticana</p>
            <p className="small text-secondary mb-3">
              {address ||
                "Internship experiences and a curated showcase of startup collaboration across Europe."}
            </p>
            {maps ? (
              <a className="small link-light link-underline-opacity-100" href={maps} target="_blank" rel="noopener noreferrer">
                View on Google Maps
              </a>
            ) : null}
          </div>
          <div className="col-md-4">
            <p className="fw-semibold mb-2">Explore</p>
            <ul className="list-unstyled small mb-0">
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/">
                  Home
                </Link>
              </li>
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
              <li>
                <Link className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <p className="fw-semibold mb-2">Contact</p>
            <ul className="list-unstyled small mb-3">
              <li>
                <a className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              {phone ? (
                <li>
                  <a className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href={`tel:${phone.replace(/\s/g, "")}`}>
                    {phone}
                  </a>
                </li>
              ) : null}
              {settings?.whatsappNumber?.trim() ? (
                <li className="text-secondary">WhatsApp: {settings.whatsappNumber}</li>
              ) : null}
            </ul>
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
            {social.length > 0 ? (
              <p className="fw-semibold mb-2 mt-3">Social</p>
            ) : null}
            <ul className="list-unstyled small d-flex flex-wrap gap-3 mb-0">
              {social.map((s) => (
                <li key={s.label}>
                  <a className="link-light link-underline-opacity-0 link-underline-opacity-100-hover" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <p className="small text-secondary mb-0">© {new Date().getFullYear()} Briticana. All rights reserved.</p>
      </div>
    </div>
  );
}
