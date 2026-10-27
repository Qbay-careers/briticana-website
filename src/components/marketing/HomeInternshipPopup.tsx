"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type AnimationScene =
  | "scene1_pulling"  // 0.0s – 2.6s: Robot stands in place, pulls with hands & tough expression as poster slowly glides in
  | "settled";        // 2.6s+: Robot stands proud in hero pose beside poster with natural cyan eye blinking

export default function HomeInternshipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scene, setScene] = useState<AnimationScene>("scene1_pulling");

  useEffect(() => {
    // Respect reduced-motion accessibility settings
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsOpen(true);
      setScene("settled");
      return;
    }

    // 1. Initial State: Robot is in position pulling with hands & tough expression, poster glides in slowly
    setIsOpen(true);
    setScene("scene1_pulling");

    // 2. Settled State (2.6s): Poster arrives, robot transitions to hero standing pose with eye blink
    const tSettle = setTimeout(() => {
      setScene("settled");
    }, 2600);

    return () => {
      clearTimeout(tSettle);
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
    <div
      className={`briti-cinematic-stage is-${scene} ${isClosing ? "is-closing" : ""}`}
      aria-label="Google Internship Programs 2027 Dublin Announcement"
    >
      {/* ------------------------------------------------------------------
          1. Articulated 3D Robot Character Actor Body [z-index: 25]
          Stands in place: Pulls Poster in with Hands & Tough Expression -> Hero Pose
          ------------------------------------------------------------------ */}
      <div className="briti-robot-actor-wrap" aria-hidden="true">
        <div className="briti-robot-rig">
          {/* Tough Pull Layer: Standing in position, hands pulling, determined cyan eyes */}
          <div className="briti-robot-layer briti-robot-layer--pull">
            <img
              src="/assets/kunj-robot-pull-tough.png"
              alt="3D Chibi Robot Pulling with Tough Expression"
              className="briti-robot-part-img"
              width={1024}
              height={1024}
            />
          </div>

          {/* Mass Hero Pose Layer: Leaning proudly against poster with swagger attitude & natural eye blink */}
          <div className="briti-robot-layer briti-robot-layer--hero">
            <img
              src="/assets/kunj-robot-lean-mass.png"
              alt="3D Chibi Robot Leaning Mass Hero Pose"
              className="briti-robot-part-img"
              width={1024}
              height={1024}
            />
            {/* Natural Eye Blink Overlay: Blinks cyan eyes naturally */}
            <img
              src="/assets/kunj-lean-blink.png"
              alt="Robot Eye Blink Overlay"
              className="briti-robot-eye-blink-overlay"
              width={1024}
              height={1024}
            />
          </div>

          {/* Dynamic Ground Contact Shadow */}
          <div className="briti-robot-contact-shadow" />
        </div>
      </div>

      {/* ------------------------------------------------------------------
          2. Original 3D Poster Card [z-index: 26]
          Glides in slowly from right as robot pulls with hands -> Settles in place
          ------------------------------------------------------------------ */}
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
            height={1024}
            loading="eager"
          />

          {/* Luxury Metallic Light Sheen Sweep across poster on settle */}
          <span className="briti-poster-shimmer-sweep" aria-hidden="true" />
        </Link>
      </div>

      {/* ------------------------------------------------------------------
          3. Robot Front Fists Overlay [z-index: 30]
          Layered ON TOP of poster edge so hands visibly clamp the poster!
          ------------------------------------------------------------------ */}
      <div className="briti-robot-actor-wrap briti-robot-actor-wrap--fist-overlay" aria-hidden="true">
        <div className="briti-robot-rig">
          <div className="briti-robot-layer briti-robot-layer--pull">
            <img
              src="/assets/kunj-pull-front-fist.png"
              alt="Robot Closed Fist Clamping Poster"
              className="briti-robot-part-img"
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
