"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";

import {
  DOMAIN_CLUSTERS,
  getDomainVisualIdentity,
  type DomainClusterId,
} from "@/components/marketing/domainVisualConfig";
import type { InternshipDomainListItem } from "@/lib/sanity/types";

function countLabel(n: number): string {
  if (n === 1) return "1 internship";
  return `${n} internships`;
}

export type MarketingDomainsListingSectionProps = {
  domains: InternshipDomainListItem[];
  sanityConfigured?: boolean;
};

export default function MarketingDomainsListingSection({
  domains,
  sanityConfigured = true,
}: MarketingDomainsListingSectionProps) {
  const [activeCluster, setActiveCluster] = useState<DomainClusterId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const enrichedDomains = useMemo(() => {
    return domains.map((d) => {
      const slug = d.slug?.current?.trim() || "";
      const visual = getDomainVisualIdentity(slug, d.title);
      const count = typeof d.internshipCount === "number" ? d.internshipCount : 0;
      const description = d.shortOverview?.trim() || visual.description;
      return {
        doc: d,
        slug,
        href: slug ? `/internships?domain=${encodeURIComponent(slug)}` : "/internships",
        visual,
        count,
        description,
      };
    });
  }, [domains]);

  const clusterCounts = useMemo(() => {
    const counts: Record<DomainClusterId, number> = {
      all: enrichedDomains.length,
      "tech-ai": 0,
      "business-finance": 0,
      "engineering-quality": 0,
      "healthcare-science": 0,
      "design-growth": 0,
      "operations-legal": 0,
    };
    for (const item of enrichedDomains) {
      counts[item.visual.cluster] = (counts[item.visual.cluster] ?? 0) + 1;
    }
    return counts;
  }, [enrichedDomains]);

  const filteredDomains = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return enrichedDomains.filter((item) => {
      if (activeCluster !== "all" && item.visual.cluster !== activeCluster) {
        return false;
      }
      if (!q) return true;
      const titleMatch = (item.doc.title ?? "").toLowerCase().includes(q);
      const badgeMatch = item.visual.badge.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      return titleMatch || badgeMatch || descMatch;
    });
  }, [enrichedDomains, activeCluster, searchQuery]);

  return (
    <>
      <div className="page-banner-area position-relative z-1 ptb-100 briti-domains-hero">
        <div className="container mw-1380">
          <div className="position-relative z-1">
            <div className="page-banner-content">
              <ul className="p-0 list-unstyled d-flex flex-wrap">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <span>Domains</span>
                </li>
              </ul>
              <h2>
                Explore internship <span>domains</span>
              </h2>
              <p className="briti-domains-hero__subtitle">
                Discover specialized career tracks across technology, finance, engineering,
                healthcare, creative design, and operations — each with its own real-world project
                focus.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="briti-domains-section pb-100">
        <div className="container mw-1380">
          {domains.length === 0 ? (
            <p className="text-center text-secondary mt-4 mb-0">
              {sanityConfigured
                ? "Publish internship domain documents in Sanity to list categories here."
                : "Connect Sanity (set NEXT_PUBLIC_SANITY_PROJECT_ID) to load internship domains from the CMS."}
            </p>
          ) : (
            <>
              {/* Filter & Search Toolbar */}
              <div className="briti-domains-toolbar">
                <div
                  className="briti-domains-clusters"
                  role="tablist"
                  aria-label="Filter domains by industry category"
                >
                  {DOMAIN_CLUSTERS.map((cluster) => {
                    const isActive = activeCluster === cluster.id;
                    const count = clusterCounts[cluster.id] ?? 0;
                    return (
                      <button
                        key={cluster.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`briti-domains-cluster-btn${isActive ? " is-active" : ""}`}
                        onClick={() => setActiveCluster(cluster.id)}
                      >
                        <i className={cluster.icon} aria-hidden="true" />
                        <span>{cluster.label}</span>
                        <span className="briti-domains-cluster-btn__count">{count}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="briti-domains-search">
                  <i className="ri-search-line briti-domains-search__icon" aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search domain (e.g. Cybersecurity, Finance, AI...)"
                    className="briti-domains-search__input"
                    aria-label="Search internship domains"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      className="briti-domains-search__clear"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <i className="ri-close-line" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </div>

              {filteredDomains.length === 0 ? (
                <div className="briti-domains-empty">
                  <p className="mb-3">
                    No domains match <strong>&ldquo;{searchQuery}&rdquo;</strong> in this category.
                  </p>
                  <button
                    type="button"
                    className="briti-domains-reset-btn"
                    onClick={() => {
                      setActiveCluster("all");
                      setSearchQuery("");
                    }}
                  >
                    Show all {enrichedDomains.length} domains
                  </button>
                </div>
              ) : (
                <div className="briti-domains-grid">
                  {filteredDomains.map(({ doc, href, visual, count, description }) => {
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
                        key={doc._id}
                        href={href}
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
                          <h3 className="briti-domain-card__title">{doc.title}</h3>
                          <p className="briti-domain-card__desc">{description}</p>
                        </div>

                        <div className="briti-domain-card__footer">
                          <span className="briti-domain-card__count">
                            <span className="briti-domain-card__dot" aria-hidden="true" />
                            {countLabel(count)}
                          </span>
                          <span className="briti-domain-card__arrow" aria-hidden="true">
                            <i className="ri-arrow-right-up-line" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
