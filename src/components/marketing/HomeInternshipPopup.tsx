"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeInternshipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [animStage, setAnimStage] = useState<"pulling" | "celebrating" | "finished">("pulling");

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsOpen(true);
      setAnimStage("finished");
      return;
    }

    // 1. Initial 400ms delay before robot enters pulling the poster
    const startTimer = setTimeout(() => {
      setIsOpen(true);
      setAnimStage("pulling");
    }, 400);

    // 2. Poster reaches exact final position at 3.2s; robot celebrates and unhooks
    const celebrateTimer = setTimeout(() => {
      setAnimStage("celebrating");
    }, 3200);

    // 3. Robot exits completely at 4.2s, leaving the static interactive poster
    const finishTimer = setTimeout(() => {
      setAnimStage("finished");
    }, 4200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(celebrateTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 320);
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`briti-promo-flyer-wrap ${
        animStage === "pulling" ? "is-pulling-in" : ""
      } ${isClosing ? "is-closing" : ""}`}
      aria-label="Google Internship Programs 2027 Dublin Announcement"
    >
      {/* 3D Robot pulling the poster with a golden rope */}
      {animStage !== "finished" && (
        <div
          className={`briti-pulling-robot-wrap ${
            animStage === "celebrating" ? "is-celebrating" : "is-pulling"
          }`}
          aria-hidden="true"
        >
          <img
            src="/assets/briti-robot-pulling.png"
            alt="3D Robot pulling internship poster"
            className="briti-pulling-robot-img"
            width={360}
            height={265}
          />
        </div>
      )}

      <div className="briti-promo-poster-card">
        {/* Dismiss / Close Button */}
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

        {/* Clickable 3D Poster navigating directly to /internships page */}
        <Link
          href="/internships"
          className="briti-promo-poster-link"
          aria-label="Explore Google Internship Programs 2027 on Briticana"
        >
          <img
            src="/assets/google-internship-promo-poster.jpg"
            alt="Google Internship Programs 2027 - Dublin, Ireland (10 Roles) - Briticana"
            className="briti-promo-poster-img"
            width={576}
            height={840}
            loading="eager"
          />

          {/* Glowing 3D Explore Button over the bottom pill */}
          <span
            className="briti-promo-poster__explore-btn"
            aria-hidden="true"
          >
            <span>Explore</span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>
    </aside>
  );
}
