import Link from "next/link";
import type { CSSProperties } from "react";

import { getDomainVisualIdentity } from "@/components/marketing/domainVisualConfig";
import { CATEGORY_ITEMS } from "@/components/marketing/sections/marketingHomeData";
import type { InternshipDomainDoc } from "@/lib/sanity/types";

export type MarketingCategoriesSectionProps = {
  internshipDomains?: InternshipDomainDoc[];
};

export default function MarketingCategoriesSection({
  internshipDomains = [],
}: MarketingCategoriesSectionProps) {
  const useSanityDomains = internshipDomains.length > 0;
  /** Show 8 domain cards + the 9th "All domains" card (3x3 balanced grid on desktop). */
  const sanityDomainsToShow = internshipDomains.slice(0, 8);
  const fallbackCategoriesToShow = CATEGORY_ITEMS.slice(0, 8);

  const cards = useSanityDomains
    ? sanityDomainsToShow.map((d) => {
        const slug = d.slug?.current?.trim() || "";
        const href = slug ? `/internships?domain=${encodeURIComponent(slug)}` : "/internships";
        const visual = getDomainVisualIdentity(slug, d.title);
        return {
          key: d._id,
          title: d.title ?? "Internship Domain",
          href,
          actionLabel: "View internships",
          description: d.shortOverview?.trim() || visual.description,
          visual,
        };
      })
    : fallbackCategoriesToShow.map((c) => {
        const visual = getDomainVisualIdentity(c.title, c.title);
        return {
          key: c.title,
          title: c.title,
          href: c.href,
          actionLabel: c.count || "View internships",
          description: visual.description,
          visual,
        };
      });

  return (
    <section className="categories-area marketing-home-domains-after-hero marketing-home-section-pb briti-home-domains-section">
      <div className="container mw-1380">
        <div className="briti-home-domains-header">
          <div className="briti-home-domains-header__text">
            <span className="briti-home-domains-eyebrow">
              <i className="ri-compass-3-line" aria-hidden="true" />
              Career Tracks &amp; Specializations
            </span>
            <h2 className="briti-home-domains-title">
              Explore internship <span>domains</span>
            </h2>
            <p className="briti-home-domains-subtitle">
              Select a specialized domain to work on mentor-guided startup projects tailored to your
              career path.
            </p>
          </div>
          <div className="briti-home-domains-header__cta">
            <Link href="/domains" className="briti-home-domains-all-btn text-decoration-none">
              <span>Browse All Domains</span>
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="briti-domains-grid briti-domains-grid--home">
          {cards.map((item) => {
            const { visual } = item;
            const cardStyle = {
              "--domain-accent": visual.accent,
              "--domain-accent-secondary": visual.accentSecondary,
              "--domain-bg": visual.cardBg,
              "--domain-border": visual.cardBorder,
              "--domain-border-hover": visual.cardHoverBorder,
              "--domain-glow": visual.cardGlow,
              "--domain-icon-bg": visual.iconBg,
              "--domain-icon-border": visual.iconBorder,
              "--domain-badge-bg": visual.badgeBg,
              "--domain-badge-text": visual.badgeText,
              "--domain-top-bar": visual.topBar,
            } as CSSProperties;

            return (
              <Link
                key={item.key}
                href={item.href}
                style={cardStyle}
                className={`briti-domain-card briti-domain-card--pattern-${visual.pattern}${
                  visual.isDark ? " briti-domain-card--dark" : ""
                } text-decoration-none`}
              >
                <span className="briti-domain-card__pattern" aria-hidden="true" />
                <span className="briti-domain-card__glow" aria-hidden="true" />

                <div className="briti-domain-card__header">
                  <div className="briti-domain-card__icon-box" aria-hidden="true">
                    {visual.icon}
                  </div>
                  <span className="briti-domain-card__badge">{visual.badge}</span>
                </div>

                <div className="briti-domain-card__body">
                  <h3 className="briti-domain-card__title">{item.title}</h3>
                  <p className="briti-domain-card__desc">{item.description}</p>
                </div>

                <div className="briti-domain-card__footer">
                  <span className="briti-domain-card__count">
                    <span className="briti-domain-card__dot" aria-hidden="true" />
                    {item.actionLabel}
                  </span>
                  <span className="briti-domain-card__arrow" aria-hidden="true">
                    <i className="ri-arrow-right-up-line" />
                  </span>
                </div>
              </Link>
            );
          })}

          {/* 9th Tile: Explore All Domains */}
          <Link
            href="/domains"
            className="briti-domain-card briti-domain-card--all text-decoration-none"
          >
            <span className="briti-domain-card__pattern" aria-hidden="true" />
            <div className="briti-domain-card__header">
              <div className="briti-domain-card__icon-box briti-domain-card__icon-box--all" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.75" />
                  <rect x="13.5" y="3.5" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.75" />
                  <rect x="3.5" y="13.5" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.75" />
                  <rect x="13.5" y="13.5" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.75" />
                </svg>
              </div>
              <span className="briti-domain-card__badge briti-domain-card__badge--all">
                Full Directory
              </span>
            </div>

            <div className="briti-domain-card__body">
              <h3 className="briti-domain-card__title">All domains</h3>
              <p className="briti-domain-card__desc">
                Browse all {internshipDomains.length > 8 ? `${internshipDomains.length}+ ` : ""}
                specialized internship tracks across every industry sector.
              </p>
            </div>

            <div className="briti-domain-card__footer">
              <span className="briti-domain-card__count">
                <span className="briti-domain-card__dot" aria-hidden="true" />
                Explore full catalog
              </span>
              <span className="briti-domain-card__arrow" aria-hidden="true">
                <i className="ri-arrow-right-line" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
