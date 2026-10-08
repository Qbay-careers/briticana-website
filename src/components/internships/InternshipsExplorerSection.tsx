"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import InternshipIntroCard from "@/components/marketing/InternshipIntroCard";
import type { EnrichedInternship } from "@/lib/internships/internshipContentApi";
import {
  QUICK_CATEGORY_FILTERS,
  clarifyInternshipForCard,
  sanitizeInternshipText,
  type QuickCategoryFilter,
} from "@/lib/internships/internshipRoleClarifier";

export interface InternshipsExplorerSectionProps {
  internships: EnrichedInternship[];
  defaultDurationLabel?: string;
  defaultCtaText?: string;
  /** When true (e.g. on Homepage), limits the initial "All" view to 6 diverse cards with a "View All Internships" button. */
  isHomePreview?: boolean;
  /** Optional children rendered directly above the search/filter bar (e.g., advanced domain/region dropdowns on /internships). */
  advancedFilterSlot?: React.ReactNode;
}

/** Curated representative tracks (using real Sanity slugs) so every category tab on the Homepage has tracks. */
const SUPPLEMENTAL_CORE_TRACKS: EnrichedInternship[] = [
  {
    _id: "showcase-software-development",
    _type: "internship",
    title: "Software Development & Cloud Engineering",
    slug: { _type: "slug", current: "enterprise-cloud-native-net-devops" },
    domain: {
      _id: "internshipDomain-software-development",
      _type: "internshipDomain",
      title: "Software Development",
      slug: { _type: "slug", current: "software-development" },
    },
    overview:
      "Build websites and applications while learning how real software teams work.",
    skillsCovered: ["Programming", "Web development", "APIs & backend", "Git & teamwork"],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-digital-marketing",
    _type: "internship",
    title: "Digital Marketing, Brand Growth & Campaign Analytics",
    slug: { _type: "slug", current: "enterprise-digital-marketing-analytics-optimization" },
    domain: {
      _id: "internshipDomain-marketing",
      _type: "internshipDomain",
      title: "Marketing",
      slug: { _type: "slug", current: "marketing" },
    },
    overview:
      "Plan digital campaigns, grow brand awareness and learn how startups attract and engage customers.",
    skillsCovered: [
      "Campaign strategy",
      "Content marketing",
      "SEO & analytics",
      "Brand growth",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-ui-ux-design",
    _type: "internship",
    title: "UI/UX & Brand Design Studio",
    slug: { _type: "slug", current: "graphic-design-branding-creative-operations" },
    domain: {
      _id: "internshipDomain-ux",
      _type: "internshipDomain",
      title: "UX",
      slug: { _type: "slug", current: "ux" },
    },
    overview:
      "Design intuitive websites, mobile apps and brand visuals through user research and interactive prototypes.",
    skillsCovered: [
      "UI/UX wireframing",
      "Visual branding",
      "Figma prototypes",
      "Design systems",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-finance-accounting",
    _type: "internship",
    title: "Finance, FP&A & Financial Analytics",
    slug: { _type: "slug", current: "financial-analytics-accounting-automation" },
    domain: {
      _id: "internshipDomain-finance",
      _type: "internshipDomain",
      title: "Finance",
      slug: { _type: "slug", current: "finance" },
    },
    overview:
      "Analyse financial performance, build budgets and support smart investment and business decisions.",
    skillsCovered: [
      "Financial modeling",
      "Budgeting & FP&A",
      "Market analysis",
      "Financial reporting",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-human-resources",
    _type: "internship",
    title: "Human Resources (HR) & People Operations",
    slug: { _type: "slug", current: "startup-hr-operations-digital-people" },
    domain: {
      _id: "internshipDomain-hr",
      _type: "internshipDomain",
      title: "HR",
      slug: { _type: "slug", current: "hr" },
    },
    overview:
      "Help companies recruit great talent, onboard new team members and build a strong workplace culture.",
    skillsCovered: [
      "Talent recruitment",
      "People analytics",
      "Onboarding workflows",
      "Team culture",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
];

interface CareerPathOption {
  id: string;
  interest: string;
  roleTitle: string;
  roleSummary: string;
  targetCategory: QuickCategoryFilter;
  accent: string;
  bgTint: string;
  icon: React.ReactNode;
}

const CAREER_MATCHER_OPTIONS: CareerPathOption[] = [
  {
    id: "tech",
    interest: "I love technology",
    roleTitle: "Software Development",
    roleSummary: "Build websites, apps, AI tools & cloud systems",
    targetCategory: "Technology",
    accent: "#2563eb",
    bgTint: "rgba(37, 99, 235, 0.08)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <rect
          x="4"
          y="6"
          width="24"
          height="20"
          rx="4"
          fill="#2563eb"
          fillOpacity="0.14"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <path
          d="M12.5 13L9 16l3.5 3M19.5 13L23 16l-3.5 3M17 11.5l-2 9"
          stroke="#1d4ed8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "business",
    interest: "I enjoy business & numbers",
    roleTitle: "Strategy & Business Analysis",
    roleSummary: "Analyse markets, solve problems & guide decisions",
    targetCategory: "Business",
    accent: "#0d9488",
    bgTint: "rgba(13, 148, 136, 0.09)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M5 25h22" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" />
        <rect x="7" y="16" width="4" height="9" rx="1.2" fill="#14b8a6" />
        <rect x="14" y="12" width="4" height="13" rx="1.2" fill="#0d9488" />
        <rect x="21" y="8" width="4" height="17" rx="1.2" fill="#0284c7" />
        <path
          d="M7 12l6-3.5 5 1.5 6-5"
          stroke="#0f766e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "creative",
    interest: "I'm creative",
    roleTitle: "UI/UX & Design",
    roleSummary: "Design user interfaces, digital products & brands",
    targetCategory: "Design",
    accent: "#c026d3",
    bgTint: "rgba(192, 38, 211, 0.09)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 5C9.9 5 5 9.7 5 15.5S9.9 26 16 26c1.8 0 3.2-1.4 3.2-3.1 0-.8-.3-1.5-.8-2-.5-.5-.8-1.2-.8-1.9 0-1.6 1.3-2.9 3-2.9H22c2.8 0 5-2.2 5-5C27 7.5 22.1 5 16 5z"
          fill="#c026d3"
          fillOpacity="0.14"
          stroke="#c026d3"
          strokeWidth="2"
        />
        <circle cx="10.5" cy="14" r="1.7" fill="#9333ea" />
        <circle cx="14" cy="10" r="1.7" fill="#db2777" />
        <circle cx="19" cy="10" r="1.7" fill="#f59e0b" />
        <circle cx="22" cy="13.5" r="1.7" fill="#06b6d4" />
      </svg>
    ),
  },
  {
    id: "marketing",
    interest: "I love communication",
    roleTitle: "Marketing",
    roleSummary: "Run growth campaigns, build brands & engage audiences",
    targetCategory: "Marketing",
    accent: "#ea580c",
    bgTint: "rgba(234, 88, 12, 0.09)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path
          d="M22 7L11 11.8H7.2A2.2 2.2 0 0 0 5 14v2.5a2.2 2.2 0 0 0 2.2 2.2H11L22 23.5V7z"
          fill="#ea580c"
          fillOpacity="0.16"
          stroke="#ea580c"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 18.7L10.2 25h3l-1-6.3M25.5 11.5c1.3 1 2 2.2 2 3.7s-.7 2.7-2 3.7"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function InternshipsExplorerSection({
  internships,
  defaultDurationLabel,
  defaultCtaText,
  isHomePreview = false,
  advancedFilterSlot,
}: InternshipsExplorerSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<QuickCategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const gridAnchorRef = useRef<HTMLDivElement | null>(null);

  // Combine dynamic internships with supplemental core tracks when in homepage preview mode
  // so every category filter button (All, Business, Technology, Marketing, Design, Finance) has rich roles.
  const sourceInternships = useMemo(() => {
    if (!isHomePreview) return internships;
    const existingSlugs = new Set(
      internships.map((i) => i.slug?.current?.trim()).filter(Boolean),
    );
    const merged = [...internships];
    for (const supp of SUPPLEMENTAL_CORE_TRACKS) {
      const slug = supp.slug?.current?.trim();
      if (slug && !existingSlugs.has(slug)) {
        merged.push(supp);
      }
    }
    return merged;
  }, [internships, isHomePreview]);

  const enrichedItems = useMemo(() => {
    return sourceInternships.map((item) => ({
      internship: item,
      clarified: clarifyInternshipForCard(item, defaultDurationLabel),
    }));
  }, [sourceInternships, defaultDurationLabel]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matches = enrichedItems.filter(({ internship, clarified }) => {
      if (selectedCategory !== "All" && clarified.quickFilter !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        clarified.categoryDisplay,
        clarified.cleanTitle,
        clarified.specialization ?? "",
        clarified.plainExplanation,
        sanitizeInternshipText(internship.title),
        ...clarified.learnSkills,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    if (isHomePreview && selectedCategory === "All" && !q) {
      // Show a balanced 6-card showcase on the homepage across distinct categories
      const seenCategories = new Set<string>();
      const diverse: typeof matches = [];
      for (const m of matches) {
        if (!seenCategories.has(m.clarified.categoryDisplay) && diverse.length < 6) {
          seenCategories.add(m.clarified.categoryDisplay);
          diverse.push(m);
        }
      }
      for (const m of matches) {
        if (diverse.length >= 6) break;
        if (!diverse.includes(m)) diverse.push(m);
      }
      return diverse;
    }

    return matches;
  }, [enrichedItems, selectedCategory, searchQuery, isHomePreview]);

  const handleSelectCareerPath = (category: QuickCategoryFilter) => {
    setSelectedCategory(category);
    setSearchQuery("");
    if (gridAnchorRef.current) {
      gridAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={gridAnchorRef} className="briti-internship-explorer">
      {/* Search + Quick Category Filter Bar */}
      <div className="briti-internship-filterbar">
        <div className="briti-internship-search">
          <i className="ri-search-line briti-internship-search__icon" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search internships..."
            className="briti-internship-search__input"
            aria-label="Search internships"
          />
          {searchQuery ? (
            <button
              type="button"
              className="briti-internship-search__clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <i className="ri-close-line" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div
          className="briti-internship-chips"
          role="tablist"
          aria-label="Filter internships by category"
        >
          {QUICK_CATEGORY_FILTERS.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                className={`briti-internship-chip${active ? " is-active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Advanced Filter Slot (Domain / Region / Duration on /internships) */}
      {advancedFilterSlot ? (
        <div className="briti-internship-advanced-slot">{advancedFilterSlot}</div>
      ) : null}

      {/* Internship Role Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="briti-internship-empty">
          <p className="mb-3">
            No internships match your current search or filter selection.
          </p>
          <button
            type="button"
            className="briti-internship-reset-btn"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Show all internships
          </button>
        </div>
      ) : (
        <div className="briti-internship-cards-grid">
          {filteredItems.map(({ internship }) => (
            <div key={internship._id} className="briti-internship-cards-grid__cell d-flex">
              <InternshipIntroCard
                internship={internship}
                defaultDurationLabel={defaultDurationLabel}
                defaultCtaText={defaultCtaText}
              />
            </div>
          ))}
        </div>
      )}

      {isHomePreview ? (
        <div className="text-center mt-4 pt-2">
          <Link href="/internships" className="briti-internship-all-tracks-btn text-decoration-none">
            <span>View All Internship Opportunities</span>
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>
      ) : null}

      {/* "WHICH INTERNSHIP IS RIGHT FOR ME?" Guided Career Matcher Section */}
      <div className="briti-career-matcher">
        <div className="briti-career-matcher__header">
          <span className="briti-career-matcher__eyebrow">Career Path Guide</span>
          <h3 className="briti-career-matcher__title">
            Not sure which internship is right for you?
          </h3>
          <p className="briti-career-matcher__subtitle">
            Choose based on what you enjoy, what you want to learn and where you see your career
            going.
          </p>
        </div>

        <div className="briti-career-matcher__grid">
          {CAREER_MATCHER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="briti-career-matcher__card text-start"
              onClick={() => handleSelectCareerPath(opt.targetCategory)}
            >
              <div
                className="briti-career-matcher__icon"
                style={{ background: opt.bgTint, color: opt.accent }}
                aria-hidden="true"
              >
                {opt.icon}
              </div>
              <div className="briti-career-matcher__body">
                <span className="briti-career-matcher__interest">{opt.interest}</span>
                <div className="briti-career-matcher__role-row">
                  <span
                    className="briti-career-matcher__arrow-inline"
                    style={{ color: opt.accent }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <strong className="briti-career-matcher__role">{opt.roleTitle}</strong>
                </div>
                <p className="briti-career-matcher__summary">{opt.roleSummary}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="briti-career-matcher__footer">
          <Link href="/domains" className="briti-career-matcher__cta text-decoration-none">
            <span>Explore Career Paths</span>
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
