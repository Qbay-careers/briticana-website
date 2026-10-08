import type { ReactNode } from "react";
import { UnifrakturCook } from "next/font/google";
import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";

const gothicCertFont = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

type CertFeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const CERT_FEATURE_CARDS: CertFeatureCard[] = [
  {
    id: "verified-experience",
    title: "Verified Experience",
    description: "Receive a certificate for your project role, skills and contributions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H17C18.105 21 19 20.105 19 19V8L14 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 3V8H19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 12H13.5M8.5 15.5H15.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "career-ready",
    title: "Career Ready",
    description: "Use it for job applications, LinkedIn profiles and portfolio building.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="3"
          y="7"
          width="18"
          height="13"
          rx="2.2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 7V5.2C9 4.537 9.537 4 10.2 4H13.8C14.463 4 15 4.537 15 5.2V7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M3 12.2H21" stroke="currentColor" strokeWidth="1.7" />
        <rect x="10.5" y="10.8" width="3" height="2.8" rx="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "mentor-validated",
    title: "Mentor Validated",
    description: "Your work is reviewed and evaluated by industry mentors.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8.5" r="2.7" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="15.8" cy="9.2" r="2.3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4.2 18C4.2 15.3 6.3 13.6 9 13.6C11.7 13.6 13.8 15.3 13.8 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M14.2 18C14.4 15.8 15.8 14.5 17.8 14.5C19.6 14.5 20.9 15.7 21.1 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export type MarketingCertificationSectionProps = {
  homeHero: HomeHeroData;
};

// Deterministic 2D PDF417-style barcode rows for the formal certificate footer
const BARCODE_ROWS = [
  [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
  [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
  [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1],
  [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
] as const;

export default function MarketingCertificationSection(_props: MarketingCertificationSectionProps) {
  return (
    <section className="briti-cert-section">
      <div className="container mw-1380">
        <div className="briti-cert__grid">
          {/* Left Column: Badge, Headline, Subtitle, 3 Feature Cards & CTA Button */}
          <div className="briti-cert__content">
            <span className="briti-cert__eyebrow">CERTIFICATION</span>

            <h2 className="briti-cert__title">
              <span>Earn experience you can</span>
              <span className="briti-cert__title-accent">actually show</span>
            </h2>

            <p className="briti-cert__desc">
              After successful completion, participants receive a Briticana Experience
              Certificate that documents the work you actually did.
            </p>

            <div className="briti-cert__cards-grid">
              {CERT_FEATURE_CARDS.map((card) => (
                <div key={card.id} className="briti-cert__card">
                  <span className="briti-cert__card-icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="briti-cert__card-title">{card.title}</h3>
                  <p className="briti-cert__card-desc">{card.description}</p>
                </div>
              ))}
            </div>

            <div className="briti-cert__actions">
              <Link href="/verification" className="briti-cert__cta">
                <span>Verify a Certificate</span>
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Classic Double-Bordered Certificate Model with Briticana Details */}
          <div className="briti-cert__frame">
            <div className="briti-cert__outer-border">
              <div className="briti-cert__inner-border">
                {/* Gothic / Old English Certificate Heading */}
                <div className="briti-cert__header-center">
                  <h3 className={`briti-cert__gothic-title ${gothicCertFont.className}`}>
                    Certificate of Completion
                  </h3>
                  <p className="briti-cert__presented-kicker">THIS CERTIFIES THAT</p>
                </div>

                {/* Underlined Recipient Name */}
                <div className="briti-cert__recipient-wrap">
                  <div className="briti-cert__recipient-name">Alex Johnson</div>
                </div>

                {/* Centered Citation Paragraph (Old Design Details) */}
                <p className="briti-cert__citation-text">
                  has successfully completed the{" "}
                  <strong>Briticana Project Experience Program</strong>, demonstrating
                  practical skills, project execution and industry readiness through
                  mentor-evaluated deliverables.
                </p>

                {/* Bottom 3-Column Footer: Barcode + ID/Date | Briticana Brand | Signature */}
                <div className="briti-cert__classic-footer">
                  {/* Left: 2D Barcode & Certificate ID / Date */}
                  <div className="briti-cert__barcode-col">
                    <div className="briti-cert__barcode-box" aria-hidden="true">
                      <svg
                        viewBox="0 0 132 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="briti-cert__barcode-svg"
                      >
                        {/* Left Guard Bars */}
                        <rect x="0" y="0" width="4.5" height="46" fill="#111827" />
                        <rect x="6.5" y="0" width="1.8" height="46" fill="#111827" />
                        <rect x="10" y="0" width="1.2" height="46" fill="#111827" />

                        {/* 2D Stacked Data Matrix */}
                        {BARCODE_ROWS.map((row, rIdx) =>
                          row.map((cell, cIdx) =>
                            cell ? (
                              <rect
                                key={`${rIdx}-${cIdx}`}
                                x={14 + cIdx * 4.2}
                                y={1 + rIdx * 3.6}
                                width={cIdx % 3 === 0 ? 3.1 : 2.2}
                                height="3.1"
                                fill="#111827"
                              />
                            ) : null
                          )
                        )}

                        {/* Right Guard Bars */}
                        <rect x="117" y="0" width="1.5" height="46" fill="#111827" />
                        <rect x="120.5" y="0" width="4.5" height="46" fill="#111827" />
                        <rect x="127" y="0" width="1.5" height="46" fill="#111827" />
                        <rect x="130" y="0" width="1.8" height="46" fill="#111827" />
                      </svg>
                    </div>
                    <div className="briti-cert__barcode-meta">
                      <span>12 September 2026</span>
                      <span>ID: BRX-2026-45821</span>
                    </div>
                  </div>

                  {/* Center: Briticana Emblem & Platform Name */}
                  <div className="briti-cert__org-col">
                    <div className="briti-cert__org-mark">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/edumove/images/logo/logo.webp?v=3"
                        alt="Briticana"
                        className="briti-cert__org-shield"
                      />
                    </div>
                    <div className="briti-cert__org-text">
                      <strong>BRITICANA</strong>
                      <span>Europe&apos;s Project</span>
                      <span>Experience Platform</span>
                    </div>
                  </div>

                  {/* Right: Cursive Signature + Line + Program Director / Briticana */}
                  <div className="briti-cert__signature-col">
                    <div className="briti-cert__signature-art" aria-hidden="true">
                      <svg
                        viewBox="0 0 180 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="briti-cert__signature-svg"
                      >
                        <path
                          d="M12 18C28 15 52 11 72 8M36 9C31 21 25 36 22 46C27 34 34 25 41 25C45 25 43 35 47 35C51 35 56 26 60 26C63 26 61 34 65 34C69 34 74 25 78 26C82 27 79 34 83 34C88 34 96 19 93 42C91 49 88 44 95 31C100 22 106 25 104 32C102 36 108 35 113 27C118 19 124 7 128 6C132 5 118 35 116 40C121 29 129 22 134 24C138 26 134 33 139 33C144 33 151 14 155 12C158 10 149 32 155 32C160 32 166 24 171 21"
                          stroke="#182232"
                          strokeWidth="1.65"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="briti-cert__signature-line" />
                    <strong className="briti-cert__signer-role">Program Director</strong>
                    <span className="briti-cert__signer-org">Briticana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

