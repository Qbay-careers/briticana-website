"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeInternshipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Clear any previous session dismissal keys so page refresh always shows popup after 2s
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("briti_promo_flyer_dismissed");
        localStorage.removeItem("briti_promo_flyer_dismissed");
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }

    // Show popup after exactly 1 second (1s delay as requested)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      // Do NOT set sessionStorage here so refreshing the page pops it up again
    }, 320);
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    const section =
      document.getElementById("internships") ||
      document.getElementById("courses") ||
      document.querySelector(".briti-internship-section");

    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`briti-promo-flyer-wrap ${isClosing ? "is-closing" : ""}`}
      aria-label="Featured Internship Announcement"
    >
      <div className="briti-promo-flyer">
        {/* Background Decorative Accents */}
        <span className="briti-promo-flyer__corner-tr" aria-hidden="true" />
        <span className="briti-promo-flyer__dot-tl" aria-hidden="true" />
        <span className="briti-promo-flyer__dot-tr" aria-hidden="true" />

        {/* Close / Dismiss Button */}
        <button
          type="button"
          className="briti-promo-flyer__close"
          onClick={handleClose}
          aria-label="Close promotion flyer"
          title="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Brand Crest & Pill */}
        <div className="briti-promo-flyer__header">
          <div className="briti-promo-flyer__brand">
            <img
              src="/assets/briticana-logo.webp"
              alt="Briticana Crest"
              className="briti-promo-flyer__brand-crest"
              width={28}
              height={28}
            />
            <span className="briti-promo-flyer__brand-name">Briticana</span>
          </div>

          <div>
            <span className="briti-promo-flyer__open-pill">Applications now open</span>
          </div>
        </div>

        {/* Main Title & Dublin Subtitle */}
        <div className="briti-promo-flyer__title-wrap">
          <h2 className="briti-promo-flyer__title">
            <span>Google</span>
            <span>Internship</span>
            <span>
              Programs <strong className="briti-promo-flyer__title-year">2027</strong>
            </span>
          </h2>
          <div className="briti-promo-flyer__location">
            <span>Dublin, Ireland</span>
            <span role="img" aria-label="Ireland flag">🇮🇪</span>
          </div>
        </div>

        {/* Flight Boarding Pass Ticket */}
        <div className="briti-promo-flyer__ticket">
          <div className="briti-promo-flyer__ticket-main">
            <span className="briti-promo-flyer__ticket-subhead">
              Google Internships · 2027
            </span>
            <span className="briti-promo-flyer__ticket-code">DUB</span>
            <span className="briti-promo-flyer__ticket-roles">
              10 roles · MBA, BS/MS and technical
            </span>
          </div>

          <div className="briti-promo-flyer__ticket-stub">
            <span className="briti-promo-flyer__stub-notch-top" aria-hidden="true" />
            <span className="briti-promo-flyer__stub-notch-bottom" aria-hidden="true" />
            <span className="briti-promo-flyer__stub-vertical-text">
              ADMIT ONE INTERN
            </span>
            <span className="briti-promo-flyer__stub-number">10</span>
          </div>
        </div>

        {/* Dark Capsule with Closes Date & CTA Button */}
        <div className="briti-promo-flyer__bottom-bar">
          <div className="briti-promo-flyer__closes-badge">
            <span className="briti-promo-flyer__closes-label">CLOSES</span>
            <span className="briti-promo-flyer__closes-date">Nov 13</span>
          </div>

          <Link
            href="/internships#internships"
            onClick={handleCtaClick}
            className="briti-promo-flyer__cta-btn"
          >
            <span>Explore Roles</span>
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>

        {/* Subtle Dublin Skyline Vector Motif at Bottom */}
        <svg
          className="briti-promo-flyer__skyline"
          viewBox="0 0 300 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="10" y="24" width="36" height="24" rx="2" fill="#003885" />
          <rect x="54" y="16" width="30" height="32" rx="2" fill="#2563EB" />
          <rect x="92" y="20" width="26" height="28" rx="2" fill="#003885" />
          <path
            d="M125 48C155 24 195 24 225 48"
            stroke="#003885"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line x1="175" y1="24" x2="175" y2="48" stroke="#003885" strokeWidth="2" />
          <rect x="235" y="18" width="40" height="30" rx="2" fill="#1D4ED8" />
        </svg>
      </div>
    </aside>
  );
}
