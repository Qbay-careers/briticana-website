import type { Metadata } from "next";
import Link from "next/link";

import { buildPageAlternates, PRODUCTION_SITE_URL } from "@/lib/seo/siteSeo";
import "@/styles/authority-pages.css";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Briticana | Internship Support, Partnerships & HQ",
  },
  description:
    "Contact Briticana by email or phone for real-world internship support, certificate verification, and startup partnerships. Direct department contacts and US HQ.",
  alternates: buildPageAlternates("/contact"),
  openGraph: {
    title: "Contact Briticana | Internship Support, Partnerships & HQ",
    description:
      "Contact Briticana by email or phone for real-world internship support, certificate verification, and startup partnerships. Direct department contacts and US HQ.",
    url: `${PRODUCTION_SITE_URL}/contact`,
    siteName: "Briticana",
    type: "website",
  },
};

const EMAIL_DIRECTORY = [
  {
    title: "Student & Internship Support",
    desc: "Applications, upcoming cohorts, and active project sprints",
    email: "support@briticana.us",
  },
  {
    title: "General Inquiries & Partnerships",
    desc: "Universities, startup collaborations, and Experience Centers",
    email: "Info@briticana.us",
  },
  {
    title: "HR & Employer Verification",
    desc: "Recruiter verification and official HR requests",
    email: "hr@briticana.us",
  },
  {
    title: "Careers & Industry Mentors",
    desc: "Mentor applications and team opportunities",
    email: "career@briticana.us",
  },
];

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${PRODUCTION_SITE_URL}/contact#webpage`,
      url: `${PRODUCTION_SITE_URL}/contact`,
      name: "Contact Briticana | Internship Support, Partnerships & HQ",
      description:
        "Contact Briticana by email or phone for real-world internship support, certificate verification, and startup partnerships.",
      isPartOf: { "@id": `${PRODUCTION_SITE_URL}/#website` },
      about: { "@id": `${PRODUCTION_SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PRODUCTION_SITE_URL}/contact#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: PRODUCTION_SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: `${PRODUCTION_SITE_URL}/contact`,
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <div className="briti-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* 1. Clean Header + Unified Contact Showcase (Direct Contact & Emails) */}
      <header className="briti-top-band">
        <div className="briti-wrap">
          <nav aria-label="Breadcrumb">
            <ol className="briti-crumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">Contact Us</li>
            </ol>
          </nav>

          <span className="briti-kicker">Contact Briticana</span>
          <h1 className="briti-h1">Contact our team directly</h1>
          <p className="briti-lead">
            Reach the right Briticana department by email or phone—our team responds within one
            business day.
          </p>

          {/* Unified Split Panel: Royal Blue Direct Info + Clean White Email Directory */}
          <div className="briti-contact-showcase">
            {/* Left: Royal Blue Direct Contact Info */}
            <aside className="briti-contact-panel-blue" aria-label="Direct phone and office details">
              <div>
                <h2>Direct Contact</h2>
                <p className="briti-contact-panel-blue__sub">
                  Mon – Fri, 9:00 AM – 6:00 PM EST · Replies within 24 hours.
                </p>

                <div className="briti-blue-list">
                  <div className="briti-blue-item">
                    <span className="briti-blue-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <span className="briti-blue-item__label">Phone</span>
                      <a href="tel:+17342498898" className="briti-blue-phone">
                        +1 (734) 249-8898
                      </a>
                    </div>
                  </div>

                  <div className="briti-blue-item">
                    <span className="briti-blue-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <div>
                      <span className="briti-blue-item__label">Global Headquarters</span>
                      <address className="briti-blue-text fst-normal">
                        2nd Floor, Room Number 019
                        <br />
                        206 E Huron St, Ann Arbor, MI 48104
                        <br />
                        United States
                      </address>
                      <a
                        href="https://maps.google.com/?q=206+E+Huron+St+Ann+Arbor+MI+48104"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="briti-blue-link"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>

                  <div className="briti-blue-item">
                    <span className="briti-blue-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </span>
                    <div>
                      <span className="briti-blue-item__label">European Network</span>
                      <p className="briti-blue-text">Dublin · London · Berlin · Helsinki</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="briti-blue-footer">
                <span>Need to check a student certificate?</span>
                <Link href="/verification" className="briti-blue-link mt-0">
                  Verify online →
                </Link>
              </div>
            </aside>

            {/* Right: Sleek 4-Row Email Directory */}
            <div className="briti-contact-panel-emails">
              <h2>Email the right team</h2>
              <p className="briti-contact-panel-emails__sub">
                Choose the department below to open your email app and message us directly.
              </p>

              <div className="briti-email-rows">
                {EMAIL_DIRECTORY.map((item) => (
                  <div key={item.email} className="briti-email-row">
                    <div className="briti-email-row__left">
                      <span className="briti-icon-circle" aria-hidden="true">
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <div>
                        <h3 className="briti-email-row__title">{item.title}</h3>
                        <p className="briti-email-row__desc">{item.desc}</p>
                        <a href={`mailto:${item.email}`} className="briti-email-row__addr">
                          {item.email}
                        </a>
                      </div>
                    </div>

                    <div className="briti-email-row__actions">
                      <a
                        href={`mailto:${item.email}`}
                        className="briti-copy-btn text-decoration-none"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Optional / Secondary Quick Note Form */}
      <section className="briti-section briti-section--soft">
        <div className="briti-wrap">
          <div className="briti-soft-form-split">
            <div>
              <span className="briti-kicker">Optional Quick Note</span>
              <h2 className="briti-h2">Prefer to message us here?</h2>
              <p className="briti-text">
                Leave a brief note if you don&apos;t have your email app open right now, and our
                team will reply directly to your inbox within one business day.
              </p>
              <p className="briti-text" style={{ fontSize: "0.88rem", color: "#64748b" }}>
                Looking for internship programs?{" "}
                <Link href="/internships" className="briti-link" style={{ fontSize: "0.88rem" }}>
                  Browse open tracks →
                </Link>
              </p>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
