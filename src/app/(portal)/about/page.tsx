import type { Metadata } from "next";
import Link from "next/link";

import { buildPageAlternates, PRODUCTION_SITE_URL } from "@/lib/seo/siteSeo";
import "@/styles/authority-pages.css";

export const metadata: Metadata = {
  title: {
    absolute: "About Briticana | Real-World Project Internship Platform",
  },
  description:
    "Learn about Briticana, Europe's real-world project internship platform. Discover our mentor-led startup workflows, verified certificates, and global hubs.",
  alternates: buildPageAlternates("/about"),
  openGraph: {
    title: "About Briticana | Real-World Project Internship Platform",
    description:
      "Learn about Briticana, Europe's real-world project internship platform. Discover our mentor-led startup workflows, verified certificates, and global hubs.",
    url: `${PRODUCTION_SITE_URL}/about`,
    siteName: "Briticana",
    type: "website",
  },
};

const PILLARS = [
  {
    title: "Real startup projects",
    desc: "Work on structured technical, product, and business briefs modeled on real European startups instead of passive exercises.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: "Weekly mentor reviews",
    desc: "Collaborate in small cohorts with experienced industry mentors for code reviews, design critiques, and sprint checkpoints.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Verified project proof",
    desc: "Graduate with real deliverables and a unique Verification ID that employers and universities can verify online anytime.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Global career standards",
    desc: "Gain practical exposure aligned with tech teams across Dublin, London, Berlin, Helsinki, and our US headquarters.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const COMPARISON_ROWS = [
  {
    area: "Learning Format",
    traditional: "Pre-recorded videos and isolated textbook exercises",
    briticana: "Live team sprints on real startup project briefs",
  },
  {
    area: "Mentorship",
    traditional: "Automated quizzes with minimal human review",
    briticana: "Direct weekly feedback from experienced industry mentors",
  },
  {
    area: "Work Proof",
    traditional: "Generic completion PDF with no project evidence",
    briticana: "Publicly verifiable certificate ID + real portfolio deliverables",
  },
  {
    area: "Career Readiness",
    traditional: "Local syllabus disconnected from hiring workflows",
    briticana: "Practical workflows aligned with European & US tech teams",
  },
];

const LOCATIONS = [
  {
    city: "Ann Arbor, MI",
    country: "United States",
    role: "Global headquarters & operations at 206 E Huron St.",
  },
  {
    city: "Dublin",
    country: "Ireland",
    role: "European tech, cloud & startup internship hub.",
  },
  {
    city: "London",
    country: "United Kingdom",
    role: "Industry mentor network & engineering reviews.",
  },
  {
    city: "Berlin",
    country: "Germany",
    role: "Startup product tracks & applied engineering.",
  },
  {
    city: "Helsinki",
    country: "Finland",
    role: "Digital learning infrastructure & research.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${PRODUCTION_SITE_URL}/about#webpage`,
      url: `${PRODUCTION_SITE_URL}/about`,
      name: "About Briticana | Real-World Project Internship Platform",
      description:
        "Learn about Briticana, Europe's real-world project internship platform connecting students with mentor-led startup workflows and verified project certificates.",
      isPartOf: { "@id": `${PRODUCTION_SITE_URL}/#website` },
      about: { "@id": `${PRODUCTION_SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PRODUCTION_SITE_URL}/about#breadcrumb`,
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
          name: "About Us",
          item: `${PRODUCTION_SITE_URL}/about`,
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="briti-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* 1. Soft Light Hero with Real Photography */}
      <header className="briti-top-band">
        <div className="briti-wrap">
          <nav aria-label="Breadcrumb">
            <ol className="briti-crumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">About Us</li>
            </ol>
          </nav>

          <div className="briti-hero-split">
            <div>
              <span className="briti-kicker">About Briticana</span>
              <h1 className="briti-h1">
                Real-world internship experience built on actual startup work
              </h1>
              <p className="briti-lead">
                Briticana connects students, recent graduates, and emerging professionals with
                structured startup projects, industry mentors, and publicly verifiable work proof
                across Europe and the United States.
              </p>
              <div className="briti-actions">
                <Link href="/internships" className="briti-btn-primary">
                  Explore Internships
                </Link>
                <Link href="/contact" className="briti-btn-secondary">
                  Contact Our Team
                </Link>
              </div>
            </div>

            <div className="briti-photo-frame">
              <img
                src="/images/experience.webp"
                alt="Briticana students and mentors collaborating on a real-world startup project"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Mission & Story with Real Mentorship Photo */}
      <section className="briti-section">
        <div className="briti-wrap">
          <div className="briti-hero-split briti-hero-split--reverse-mobile">
            <div className="briti-photo-frame">
              <img
                src="/images/mentorship.webp?v=2"
                alt="Briticana industry mentor reviewing project deliverables with internship cohort"
              />
            </div>

            <div>
              <span className="briti-kicker">Why We Built Briticana</span>
              <h2 className="briti-h2">
                Bridging the gap between university theory and your first job
              </h2>
              <p className="briti-text">
                Most graduates finish university with solid classroom theory, yet hiring managers ask
                the same question in every interview: <em>what have you actually built with a team?</em>{" "}
                Passive video courses rarely close that gap because watching lectures is not the same
                as shipping work under real deadlines.
              </p>
              <p className="briti-text">
                We created Briticana to give learners a practical bridge into industry. Participants
                join small cohorts modeled on real European startup teams—working on genuine
                engineering, AI, data, design, and product deliverables under experienced mentors.
              </p>
              <p className="briti-text">
                When you complete a track, you graduate with tangible portfolio work and a{" "}
                <Link href="/verification" className="briti-link">
                  publicly verifiable Briticana credential
                </Link>{" "}
                employers can confirm in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Pillars */}
      <section className="briti-section briti-section--soft">
        <div className="briti-wrap">
          <div className="briti-section-head briti-section-head--center">
            <span className="briti-kicker">How Briticana Works</span>
            <h2 className="briti-h2">Built around practical skill mastery</h2>
            <p className="briti-text">
              Four practical standards guide every internship program, mentor review, and Experience
              Center initiative.
            </p>
          </div>

          <div className="briti-cards-4">
            {PILLARS.map((pillar) => (
              <article key={pillar.title} className="briti-card">
                <div className="briti-icon-circle mb-3" aria-hidden="true">
                  {pillar.icon}
                </div>
                <h3 className="briti-h3">{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Clear User-Friendly Comparison Table (AEO Ready) */}
      <section className="briti-section">
        <div className="briti-wrap">
          <div className="briti-section-head briti-section-head--center">
            <span className="briti-kicker">How We Compare</span>
            <h2 className="briti-h2">Traditional courses vs. Briticana project internships</h2>
            <p className="briti-text">
              See how hands-on startup execution compares with passive self-paced video learning.
            </p>
          </div>

          <div className="briti-table-card">
            <table className="briti-table">
              <thead>
                <tr>
                  <th scope="col">Criteria</th>
                  <th scope="col">Traditional Online Courses</th>
                  <th scope="col" className="is-brand">
                    Briticana Project Experience
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.area}>
                    <td data-label="Criteria">
                      <strong>{row.area}</strong>
                    </td>
                    <td data-label="Traditional Online Courses">{row.traditional}</td>
                    <td data-label="Briticana Project Experience" className="is-brand">
                      <span className="d-inline-flex align-items-start">
                        <span className="briti-check" aria-hidden="true">
                          ✓
                        </span>
                        <span>{row.briticana}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Global Network Locations */}
      <section className="briti-section briti-section--soft">
        <div className="briti-wrap">
          <div className="briti-section-head briti-section-head--center">
            <span className="briti-kicker">Global Presence</span>
            <h2 className="briti-h2">Headquarters &amp; European startup network</h2>
            <p className="briti-text">
              Connecting North American corporate operations with Europe&apos;s leading technology
              ecosystems.
            </p>
          </div>

          <div className="briti-cards-5">
            {LOCATIONS.map((loc) => (
              <article key={loc.city} className="briti-loc-card">
                <span className="briti-loc-country">{loc.country}</span>
                <h3>{loc.city}</h3>
                <p>{loc.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Clean Solid Royal Blue CTA Card */}
      <section className="briti-section">
        <div className="briti-wrap">
          <div className="briti-cta-card">
            <div>
              <h2>Ready to build real-world project experience?</h2>
              <p>
                Explore open mentor-led internship tracks across tech, AI, data, design, and
                product—or reach out to our team with any questions.
              </p>
            </div>
            <div className="briti-cta-actions">
              <Link href="/internships" className="briti-btn-white">
                Browse Internships
              </Link>
              <Link href="/contact" className="briti-btn-outline-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
