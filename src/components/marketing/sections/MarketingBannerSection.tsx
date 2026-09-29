"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { HomeHeroData } from "@/components/marketing/homeHero";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export type MarketingBannerSectionProps = {
  homeHero: HomeHeroData;
};

const BACKGROUND_MODE_CLASS: Record<HomeHeroData["smallScreenBackground"], string> = {
  image: "marketing-hero-stack--bg-image",
  white: "marketing-hero-stack--bg-white",
  none: "marketing-hero-stack--bg-none",
};

export default function MarketingBannerSection({ homeHero }: MarketingBannerSectionProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const { smallScreenBackground, backgroundOverlay } = homeHero;
  const stackClassName = [
    "marketing-hero-stack",
    BACKGROUND_MODE_CLASS[smallScreenBackground],
  ].join(" ");

  const stackStyle =
    smallScreenBackground === "image"
      ? {
          ["--marketing-hero-wide-src" as string]: `url(${homeHero.heroWideImage})`,
          ["--marketing-hero-overlay" as string]: String(backgroundOverlay),
        }
      : undefined;

  // 6 cards grouped into 2 upper, 2 middle sides, 2 lower around center content
  const upperCards = [
    {
      src: homeHero.floatingImages[0],
      roleClass: "hero-orbit-card--top-left hero-orbit-card--1 internship-benefit-card internship-benefit-card--1",
      legacyClass: "banner1",
      label: "Turn Skills Into Proof",
    },
    {
      src: homeHero.floatingImages[1],
      roleClass: "hero-orbit-card--top-right hero-orbit-card--2 internship-benefit-card internship-benefit-card--2",
      legacyClass: "banner2",
      label: "From Learning To Doing",
    },
  ];

  const midCards = [
    {
      src: homeHero.floatingImages[2],
      roleClass: "hero-orbit-card--mid-left hero-orbit-card--3 internship-benefit-card internship-benefit-card--3 internship-benefit-card--mid",
      legacyClass: "banner3",
      label: "Gain Real Exposure",
    },
    {
      src: homeHero.floatingImages[5],
      roleClass: "hero-orbit-card--mid-right hero-orbit-card--6 internship-benefit-card internship-benefit-card--6 internship-benefit-card--mid",
      legacyClass: "banner6",
      label: "Verified Project Proof",
    },
  ];

  const lowerCards = [
    {
      src: homeHero.floatingImages[3],
      roleClass: "hero-orbit-card--bottom-left hero-orbit-card--4 internship-benefit-card internship-benefit-card--4",
      legacyClass: "banner4",
      label: "Product Building Journey",
    },
    {
      src: homeHero.floatingImages[4],
      roleClass: "hero-orbit-card--bottom-right hero-orbit-card--5 internship-benefit-card internship-benefit-card--5",
      legacyClass: "banner5",
      label: "Work On Live Ideas",
    },
  ];

  return (
    <section className="banner-area briti-hero-section briti-orbit-hero-section position-relative">
      <div className={stackClassName} style={stackStyle}>
        <div className="container mw-1345 position-relative">
          <div className="hero-orbit-stage position-relative">
            {/* Visual orbit connection rings (desktop & tablet) with smooth traveling light beam */}
            <div className="hero-orbit-ring hero-orbit-ring--outer" aria-hidden="true">
              <svg
                className="hero-orbit-svg"
                viewBox="0 0 1080 680"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="orbitGlowOuter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Base dashed orbit path */}
                <path
                  d="M 540,2 A 538,338 0 1,1 539.9,2 Z"
                  className="hero-orbit-path-base"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Traveling glowing light beam */}
                <path
                  d="M 540,2 A 538,338 0 1,1 539.9,2 Z"
                  pathLength="1000"
                  className="hero-orbit-path-beam hero-orbit-path-beam--outer"
                  vectorEffect="non-scaling-stroke"
                  filter="url(#orbitGlowOuter)"
                />
              </svg>
            </div>

            <div className="hero-orbit-ring hero-orbit-ring--inner" aria-hidden="true">
              <svg
                className="hero-orbit-svg"
                viewBox="0 0 800 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="orbitGlowInner" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Base solid faint orbit path */}
                <path
                  d="M 400,2 A 398,248 0 1,1 399.9,2 Z"
                  className="hero-orbit-path-base hero-orbit-path-base--inner"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Traveling glowing light beam */}
                <path
                  d="M 400,2 A 398,248 0 1,1 399.9,2 Z"
                  pathLength="1000"
                  className="hero-orbit-path-beam hero-orbit-path-beam--inner"
                  vectorEffect="non-scaling-stroke"
                  filter="url(#orbitGlowInner)"
                />
              </svg>
            </div>

            <noscript>
              <style>{`
                .marketing-home-root .internship-benefit-card {
                  opacity: 1 !important;
                  transform: none !important;
                }
                @media (min-width: 768px) {
                  .marketing-home-root .internship-benefit-card--mid {
                    transform: translateY(-50%) !important;
                  }
                }
              `}</style>
            </noscript>

            {/* Decorative orbit accent shape (lightning bolt) */}
            <img
              src={marketingImage("shape1.png")}
              className="hero-orbit-shape position-absolute"
              alt=""
              aria-hidden="true"
              draggable={false}
            />

            {/* Upper pair: 2 images in the upper orbit area */}
            <div className="hero-orbit-group hero-orbit-group--upper">
              {upperCards.map((card, idx) => (
                <div
                  key={`upper-${idx}`}
                  className={`hero-orbit-card ${card.roleClass} ${card.legacyClass}${isAnimated ? " is-animated" : ""}`}
                >
                  <div className="hero-orbit-card__inner">
                    <img
                      src={card.src}
                      className="hero-orbit-card__img"
                      alt={card.label}
                      loading="eager"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mid pair: 2 images around the middle sides */}
            <div className="hero-orbit-group hero-orbit-group--mid">
              {midCards.map((card, idx) => (
                <div
                  key={`mid-${idx}`}
                  className={`hero-orbit-card ${card.roleClass} ${card.legacyClass}${isAnimated ? " is-animated" : ""}`}
                >
                  <div className="hero-orbit-card__inner">
                    <img
                      src={card.src}
                      className="hero-orbit-card__img"
                      alt={card.label}
                      loading="eager"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Central Visual Focus: Headline, Subheadline, Dual CTA Buttons */}
            <div className="hero-orbit-center text-center">
              {/* Premium Eyebrow Pill */}
              <div className="hero-eyebrow-pill d-inline-flex align-items-center gap-2 mb-3">
                <span className="hero-pulse-dot" aria-hidden="true" />
                <span className="hero-eyebrow-text">Europe&apos;s Premier Project Experience Platform</span>
              </div>

              {/* Hero Main Headline */}
              <h1 className="hero-headline fw-bold mb-3">{homeHero.headline}</h1>

              {/* Subheadline / Overview */}
              {homeHero.subheadline ? (
                <p className="marketing-hero-subheadline mx-auto mb-4">
                  {homeHero.subheadline}
                </p>
              ) : null}

              {/* Dual CTA Actions */}
              <div className="hero-cta-group d-flex flex-wrap justify-content-center align-items-center gap-3">
                <Link href={homeHero.ctaApplyHref} className="main-btn hero-primary-btn" prefetch={true}>
                  <span>{homeHero.ctaApplyLabel}</span>
                  <i className="ri-arrow-right-line ms-1" aria-hidden="true" />
                </Link>
                <Link href={homeHero.ctaExploreHref} className="hero-secondary-btn" prefetch={true}>
                  <span>{homeHero.ctaExploreLabel}</span>
                  <i className="ri-compass-3-line ms-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Lower pair: 2 images in the lower orbit area */}
            <div className="hero-orbit-group hero-orbit-group--lower">
              {lowerCards.map((card, idx) => (
                <div
                  key={`lower-${idx}`}
                  className={`hero-orbit-card ${card.roleClass} ${card.legacyClass}${isAnimated ? " is-animated" : ""}`}
                >
                  <div className="hero-orbit-card__inner">
                    <img
                      src={card.src}
                      className="hero-orbit-card__img"
                      alt={card.label}
                      loading="eager"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
