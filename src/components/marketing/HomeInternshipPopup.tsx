"use client";

import { useEffect, useState } from "react";

import SkillMatcherModal, { BrainCircuitIcon } from "@/components/marketing/SkillMatcherModal";
import "@/styles/skill-matcher-modal.css";

export type AnimationScene =
  | "scene1_pulling" // 0.0s – 2.6s: Robot stands in place, pulls with hands & tough expression as poster slowly glides in
  | "settled"; // 2.6s+: Robot stands proud in hero pose beside poster with natural cyan eye blinking

export default function HomeInternshipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scene, setScene] = useState<AnimationScene>("scene1_pulling");
  const [isMatcherOpen, setIsMatcherOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsOpen(true);
      setScene("settled");
      return;
    }

    const robotPullSrc = "/assets/kunj-robot-pull-tough.webp";
    const robotHeroSrc = "/assets/kunj-robot-lean-mass.webp";

    let mounted = true;
    let tSettle: ReturnType<typeof setTimeout> | null = null;
    let started = false;

    const startAnimation = () => {
      if (!mounted || started) return;
      started = true;
      setIsOpen(true);
      setScene("scene1_pulling");

      tSettle = setTimeout(() => {
        if (mounted) {
          setScene("settled");
        }
      }, 2600);
    };

    const img = new Image();
    img.src = robotPullSrc;
    if (img.complete) {
      startAnimation();
    } else {
      img.onload = startAnimation;
      img.onerror = startAnimation;
    }

    const heroWarmup = new Image();
    heroWarmup.src = robotHeroSrc;

    const fallbackTimer = setTimeout(() => {
      startAnimation();
    }, 350);

    return () => {
      mounted = false;
      if (tSettle) clearTimeout(tSettle);
      clearTimeout(fallbackTimer);
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

  return (
    <>
      {isOpen ? (
        <div
          className={`briti-cinematic-stage briti-cinematic-stage--skill-match is-${scene} ${isClosing ? "is-closing" : ""}`}
          aria-label="Briticana Skill Match — Discover Your Ideal Internship Domain"
        >
          {/* 1. Articulated 3D Robot Character Actor Body [z-index: 25] */}
          <div className="briti-robot-actor-wrap" aria-hidden="true">
            <div className="briti-robot-rig">
              <div className="briti-robot-layer briti-robot-layer--pull">
                <img
                  src="/assets/kunj-robot-pull-tough.webp"
                  alt="3D Chibi Robot Pulling with Tough Expression"
                  className="briti-robot-part-img"
                  width={512}
                  height={512}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              <div className="briti-robot-layer briti-robot-layer--hero">
                <img
                  src="/assets/kunj-robot-lean-mass.webp"
                  alt="3D Chibi Robot Leaning Mass Hero Pose"
                  className="briti-robot-part-img"
                  width={512}
                  height={512}
                  loading="eager"
                  decoding="async"
                />
                <img
                  src="/assets/kunj-lean-blink.webp"
                  alt="Robot Eye Blink Overlay"
                  className="briti-robot-eye-blink-overlay"
                  width={512}
                  height={512}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="briti-robot-contact-shadow" />
            </div>
          </div>

          {/* 2. Interactive Briticana Skill Match Poster Card [z-index: 26] */}
          <div className="briti-promo-poster-card briti-promo-poster-card--skill-match">
            <button
              type="button"
              className="briti-promo-flyer__close"
              onClick={handleClose}
              aria-label="Close skill match poster"
              title="Close"
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

            <button
              type="button"
              className="briti-skill-poster-trigger"
              onClick={() => setIsMatcherOpen(true)}
              aria-label="Open Briticana Skill Matcher to find your ideal internship domain"
            >
              <span className="briti-skill-poster-top-bar" aria-hidden="true" />
              <span className="briti-skill-poster-mesh" aria-hidden="true" />

              <span className="briti-skill-poster-icon-wrap" aria-hidden="true">
                <span className="briti-skill-poster-icon">
                  <BrainCircuitIcon size={25} />
                </span>
              </span>

              <span className="briti-skill-poster-kicker">
                <span className="briti-skill-poster-kicker__dot" aria-hidden="true" />
                <span>BRITICANA SKILL MATCH</span>
              </span>

              <div className="briti-skill-poster-headline">
                <strong>Discover Your Ideal</strong>
                <span>Internship Domain</span>
              </div>

              <span className="briti-skill-poster-desc">
                Explore skills across 39 domains and find where your strengths fit.
              </span>

              <span className="briti-skill-poster-pills" aria-hidden="true">
                <span>39 Domains</span>
                <span className="briti-skill-poster-pills__sep">•</span>
                <span>100+ Skills</span>
              </span>

              <span className="briti-skill-poster-cta">
                <span className="briti-skill-poster-cta__label">Find My Internship Domain</span>
                <span className="briti-skill-poster-cta__arrow" aria-hidden="true">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </span>

              <span className="briti-skill-poster-note">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Free skill-based matching</span>
              </span>

              <span className="briti-poster-shimmer-sweep" aria-hidden="true" />
            </button>
          </div>

          {/* 3. Robot Front Fists Overlay [z-index: 30] */}
          <div
            className="briti-robot-actor-wrap briti-robot-actor-wrap--fist-overlay"
            aria-hidden="true"
          >
            <div className="briti-robot-rig">
              <div className="briti-robot-layer briti-robot-layer--pull">
                <img
                  src="/assets/kunj-pull-front-fist.webp"
                  alt="Robot Closed Fist Clamping Poster"
                  className="briti-robot-part-img"
                  width={512}
                  height={512}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Interactive Briticana Skill Matcher Modal Popup */}
      <SkillMatcherModal isOpen={isMatcherOpen} onClose={() => setIsMatcherOpen(false)} />
    </>
  );
}
