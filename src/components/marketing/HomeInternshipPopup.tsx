"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeInternshipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Clear any previous session dismissal keys so page refresh always shows popup after 1s
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

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      aria-label="Google Internship Programs 2027 Dublin Announcement"
    >
      <div className="briti-promo-poster-card">
        {/* Close / Dismiss Button */}
        <button
          type="button"
          className="briti-promo-flyer__close"
          onClick={handleClose}
          aria-label="Close promotion poster"
          title="Close flyer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Clickable 3D Poster that smoothly scrolls to Google Internship roles */}
        <Link
          href="/internships#internships"
          onClick={handleCtaClick}
          className="briti-promo-poster-link"
          aria-label="Explore Google Internship Programs 2027 in Dublin, Ireland"
        >
          <img
            src="/assets/google-internship-promo-poster.jpg"
            alt="Google Internship Programs 2027 - Dublin, Ireland (10 Roles) - Briticana"
            className="briti-promo-poster-img"
            width={576}
            height={1024}
            loading="eager"
          />
        </Link>
      </div>
    </aside>
  );
}
