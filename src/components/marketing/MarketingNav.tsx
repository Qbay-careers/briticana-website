"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import MarketingCtaLink from "@/components/marketing/MarketingCtaLink";
import { marketingImage } from "@/components/marketing/marketingAssetPaths";
import type { SiteSettings } from "@/lib/sanity/types";
import { buildApplyHref } from "@/lib/studentApplicationForm";

const LOGO_SRC = marketingImage("logo/logo.webp");

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Domains", href: "/domains" },
  { label: "Internships", href: "/internships" },
  { label: "Experience Centers", href: "/experience-centers" },
  { label: "Briticana World", href: "/briticana-world" },
  { label: "Verification", href: "/verification" },
  { label: "Login", href: "/login" },
] as const;

function isLinkActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export type MarketingNavProps = {
  settings?: SiteSettings | null;
};

export default function MarketingNav({ settings: _settings }: MarketingNavProps) {
  const pathname = usePathname() ?? "";
  const applyUrl = buildApplyHref({ source: "nav" });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header className={`briti-header ${isScrolled ? "is-sticky" : ""}`}>
      {/* ── Desktop & Tablet Navigation (>= 992px) ── */}
      <div className="briti-header-desktop d-none d-lg-block">
        <div className="container mw-1345">
          <nav className="d-flex align-items-center justify-content-between py-2" aria-label="Main Navigation">
            {/* Logo */}
            <Link className="briti-brand d-inline-flex align-items-center text-decoration-none" href="/" aria-label="Briticana Home">
              <img
                src={LOGO_SRC}
                alt="Briticana"
                className="briti-logo-img"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="briti-nav-list list-unstyled d-flex align-items-center mb-0 gap-1 gap-xl-2">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(pathname, link.href);
                return (
                  <li key={link.href} className="briti-nav-item">
                    <Link
                      href={link.href}
                      prefetch={true}
                      className={`briti-nav-link ${active ? "active" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      <span>{link.label}</span>
                      {active && <span className="briti-active-pill" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="briti-nav-cta d-flex align-items-center">
              <MarketingCtaLink href={applyUrl} className="main-btn briti-apply-btn">
                <span>Apply Now</span>
                <i className="ri-arrow-right-up-line ms-1" aria-hidden="true" />
              </MarketingCtaLink>
            </div>
          </nav>
        </div>
      </div>

      {/* ── Mobile & Tablet Header Bar (< 992px) ── */}
      <div className="briti-header-mobile d-block d-lg-none">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-2">
            {/* Mobile Logo */}
            <Link className="briti-brand d-inline-flex align-items-center text-decoration-none" href="/" aria-label="Briticana Home">
              <img
                src={LOGO_SRC}
                alt="Briticana"
                className="briti-mobile-logo-img"
              />
            </Link>

            {/* Right Action: Quick Apply + Hamburger Button */}
            <div className="d-flex align-items-center gap-2">
              <MarketingCtaLink href={applyUrl} className="main-btn briti-mobile-cta-btn">
                Apply
              </MarketingCtaLink>

              <button
                type="button"
                className={`briti-hamburger ${isMobileOpen ? "is-active" : ""}`}
                onClick={() => setIsMobileOpen((prev) => !prev)}
                aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileOpen}
              >
                <span className="briti-hamburger-box">
                  <span className="briti-hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer (< 992px) ── */}
      <div
        className={`briti-mobile-drawer ${isMobileOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileOpen}
      >
        <div className="container py-3">
          <ul className="briti-mobile-nav-list list-unstyled mb-3">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(pathname, link.href);
              return (
                <li key={link.href} className="briti-mobile-nav-item">
                  <Link
                    href={link.href}
                    prefetch={true}
                    className={`briti-mobile-nav-link ${active ? "active" : ""}`}
                    onClick={() => setIsMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <i className="ri-arrow-right-s-line" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="pt-2 pb-3 border-top border-light-subtle">
            <MarketingCtaLink
              href={applyUrl}
              className="main-btn w-100 justify-content-center text-center py-3"
              onClick={() => setIsMobileOpen(false)}
            >
              <span>Apply Now</span>
              <i className="ri-arrow-right-line ms-2" aria-hidden="true" />
            </MarketingCtaLink>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileOpen && (
        <div
          className="briti-mobile-backdrop"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
