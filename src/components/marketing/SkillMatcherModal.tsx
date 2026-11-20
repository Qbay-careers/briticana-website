"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";

import {
  GOOGLE_INTERNSHIP_ROLES,
  GOOGLE_SPREADSHEET_ID,
  GOOGLE_TARGET_TAB,
} from "@/lib/googleInternships";
import {
  ALL_39_DOMAINS,
  ALL_MATCHER_SKILLS,
  matchDomainsBySkills,
  type DomainMatchResult,
} from "@/lib/skillMatcherData";

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz0DoH3Gbfy2NyP2zrxXptyjh4xcrLyM0hMCY5qQ-5VOZ3fB0OSsUYJf3DZASbC1uVwYQ/exec";

type SkillCategoryKey =
  | "all"
  | "tech"
  | "data"
  | "business"
  | "design"
  | "engineering"
  | "health";

const SKILL_CATEGORIES: { key: SkillCategoryKey; label: string; slugs: string[] }[] = [
  { key: "all", label: "All Skills", slugs: [] },
  {
    key: "tech",
    label: "Tech & AI",
    slugs: [
      "software-development",
      "artificial-intelligence",
      "machine-learning",
      "cybersecurity",
      "it-operations",
      "site-reliability",
      "infrastructure-operations",
      "software-testing",
      "digital-transformation",
    ],
  },
  {
    key: "data",
    label: "Data & Analytics",
    slugs: ["data-analytics-operations", "business-analysis", "audit"],
  },
  {
    key: "business",
    label: "Business & Finance",
    slugs: [
      "finance",
      "asset-management",
      "compliance",
      "legal",
      "product-management",
      "project-management",
      "administration",
      "hr",
    ],
  },
  {
    key: "design",
    label: "Design & Marketing",
    slugs: ["ux", "graphic-design", "marketing"],
  },
  {
    key: "engineering",
    label: "Engineering & Ops",
    slugs: [
      "engineering",
      "mechanical-quality",
      "smart-manufacturing",
      "renewable-energy",
      "quantity-surveying",
      "sustainability",
      "operations",
      "supply-chain",
      "procurement",
      "warehouse-operations",
      "quality-assurance",
    ],
  },
  {
    key: "health",
    label: "Health & Life Sci",
    slugs: [
      "clinical",
      "nursing",
      "pharmaceutical-quality",
      "laboratory-operations",
      "food-quality",
    ],
  },
];

type FieldErrors = {
  fullName?: string;
  email?: string;
  contactNumber?: string;
  skills?: string;
  agreed?: string;
};

type SheetSyncResult = "saved" | "fallback-sent" | "failed";

function sanitizeForSpreadsheet(val: string): string {
  const trimmed = val.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

export function BrainCircuitIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M9 13a4.5 4.5 0 0 0 3-4" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M12 13h4" />
      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
      <path d="M12 8h8" />
      <path d="M16 8V5a2 2 0 0 1 2-2" />
      <circle cx="16" cy="13" r=".8" fill="currentColor" />
      <circle cx="18" cy="3" r=".8" fill="currentColor" />
      <circle cx="20" cy="8" r=".8" fill="currentColor" />
      <circle cx="20" cy="21" r=".8" fill="currentColor" />
    </svg>
  );
}

type SkillMatcherModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

async function postToAppsScript(
  webAppUrl: string,
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; status?: string; message?: string; corsBlocked?: boolean }> {
  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const parsed = (await response.json().catch(() => null)) as
      | { status?: string; message?: string }
      | null;

    if (response.ok && parsed?.status === "success") {
      return { ok: true, status: "success" };
    }
    if (parsed?.status === "error") {
      return { ok: false, status: "error", message: parsed.message };
    }
    return { ok: response.ok, status: parsed?.status };
  } catch {
    return { ok: false, corsBlocked: true };
  }
}

export default function SkillMatcherModal({ isOpen, onClose }: SkillMatcherModalProps) {
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matches, setMatches] = useState<DomainMatchResult[] | null>(null);
  const [sheetStatus, setSheetStatus] = useState<SheetSyncResult | null>(null);

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const cardScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll & handle Escape key while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const t = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 80);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const categorySkillSet = useMemo(() => {
    const map = new Map<SkillCategoryKey, string[]>();
    map.set("all", ALL_MATCHER_SKILLS);

    for (const cat of SKILL_CATEGORIES) {
      if (cat.key === "all") continue;
      const set = new Set<string>();
      for (const dom of ALL_39_DOMAINS) {
        if (cat.slugs.includes(dom.slug)) {
          dom.primarySkills.forEach((s) => set.add(s));
          dom.secondarySkills.forEach((s) => set.add(s));
        }
      }
      map.set(
        cat.key,
        Array.from(set).sort((a, b) => a.localeCompare(b)),
      );
    }
    return map;
  }, []);

  const filteredSkills = useMemo(() => {
    const q = skillQuery.trim().toLowerCase();
    // When searching, search across ALL skills regardless of tab so nothing is hidden
    const sourceList = q ? ALL_MATCHER_SKILLS : categorySkillSet.get(activeCategory) ?? ALL_MATCHER_SKILLS;
    if (!q) return sourceList;
    return sourceList.filter((skill) => skill.toLowerCase().includes(q));
  }, [skillQuery, activeCategory, categorySkillSet]);

  const canAddCustomSkill = useMemo(() => {
    const clean = skillQuery.trim();
    if (clean.length < 2) return false;
    const lower = clean.toLowerCase();
    const existsInList = ALL_MATCHER_SKILLS.some((s) => s.toLowerCase() === lower);
    const alreadySelected = selectedSkills.some((s) => s.toLowerCase() === lower);
    return !existsInList && !alreadySelected;
  }, [skillQuery, selectedSkills]);

  const clearFieldError = (key: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleSkill = (skill: string) => {
    clearFieldError("skills");
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill],
    );
  };

  const addCustomSkill = () => {
    const clean = skillQuery.trim();
    if (!clean) return;
    if (!selectedSkills.some((s) => s.toLowerCase() === clean.toLowerCase())) {
      setSelectedSkills((prev) => [...prev, clean]);
    }
    setSkillQuery("");
    clearFieldError("skills");
  };

  const handleSkillSearchKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (canAddCustomSkill) {
      addCustomSkill();
    } else if (filteredSkills.length === 1) {
      const onlySkill = filteredSkills[0];
      if (!selectedSkills.includes(onlySkill)) {
        toggleSkill(onlySkill);
      }
      setSkillQuery("");
    }
  };

  const sendToExcelSheet = async (topMatches: DomainMatchResult[]): Promise<SheetSyncResult> => {
    const webAppUrl =
      process.env.NEXT_PUBLIC_GOOGLE_INTERNSHIP_APPS_SCRIPT_URL?.trim() ||
      DEFAULT_APPS_SCRIPT_URL;

    if (!webAppUrl) return "failed";

    const topDomainNames = topMatches
      .slice(0, 3)
      .map((m) => m.domain.title)
      .join(", ");

    const skillsText = selectedSkills.join(", ");
    const timestamp = new Date().toISOString();

    // Attempt 1: Send matched Briticana domain name(s) directly in internshipRole + skills in country
    const primaryPayload = {
      spreadsheetId: GOOGLE_SPREADSHEET_ID,
      targetTab: GOOGLE_TARGET_TAB,
      fullName: sanitizeForSpreadsheet(fullName),
      email: sanitizeForSpreadsheet(email),
      phoneNumber: sanitizeForSpreadsheet(contactNumber),
      country: sanitizeForSpreadsheet(`Skills: ${skillsText}`),
      internshipRole: sanitizeForSpreadsheet(topDomainNames || "General Internship"),
      cvFile: null,
      clientTimestamp: timestamp,
    };

    const firstTry = await postToAppsScript(webAppUrl, primaryPayload);
    if (firstTry.ok) return "saved";

    // Attempt 2: If deployed Apps Script enforces the legacy 10-role allowlist on internshipRole,
    // pass an allowed role and preserve the matched Domain Name(s) + Skills inside country so the row is saved cleanly
    if (firstTry.status === "error") {
      const secondPayload = {
        spreadsheetId: GOOGLE_SPREADSHEET_ID,
        targetTab: GOOGLE_TARGET_TAB,
        fullName: sanitizeForSpreadsheet(fullName),
        email: sanitizeForSpreadsheet(email),
        phoneNumber: sanitizeForSpreadsheet(contactNumber),
        country: sanitizeForSpreadsheet(`Domain: ${topDomainNames} | Skills: ${skillsText}`),
        internshipRole: GOOGLE_INTERNSHIP_ROLES[0],
        cvFile: null,
        clientTimestamp: timestamp,
      };
      const secondTry = await postToAppsScript(webAppUrl, secondPayload);
      if (secondTry.ok) return "saved";

      // Attempt 3: If Apps Script also enforces strict country or phone format, keep domain in fullName + country="Other"
      const thirdPayload = {
        spreadsheetId: GOOGLE_SPREADSHEET_ID,
        targetTab: GOOGLE_TARGET_TAB,
        fullName: sanitizeForSpreadsheet(`${fullName.trim()} (${topDomainNames})`),
        email: email.trim(),
        phoneNumber: contactNumber.trim(),
        country: "Other",
        internshipRole: GOOGLE_INTERNSHIP_ROLES[0],
        cvFile: null,
        clientTimestamp: timestamp,
      };
      const thirdTry = await postToAppsScript(webAppUrl, thirdPayload);
      if (thirdTry.ok) return "saved";
    }

    // Final safety net when CORS prevents reading Apps Script JSON response
    if (firstTry.corsBlocked) {
      try {
        await fetch(webAppUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(primaryPayload),
        });
        return "fallback-sent";
      } catch {
        return "failed";
      }
    }

    return "failed";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errs: FieldErrors = {};
    if (fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address.";
    }
    const digitCount = contactNumber.replace(/\D/g, "").length;
    if (digitCount < 7) {
      errs.contactNumber = "Enter a valid phone / WhatsApp number.";
    }
    if (selectedSkills.length === 0) {
      errs.skills = "Select at least 1 skill to match your domain.";
    }
    if (!agreed) {
      errs.agreed = "Please tick this box to continue.";
    }

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      cardScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    const computedMatches = matchDomainsBySkills(selectedSkills);
    const syncResult = await sendToExcelSheet(computedMatches);
    setSheetStatus(syncResult);
    setMatches(computedMatches);
    setIsSubmitting(false);
    cardScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted || !isOpen) return null;

  const firstName = fullName.trim().split(/\s+/)[0] || "there";
  const hasContactDetails =
    fullName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    contactNumber.replace(/\D/g, "").length >= 7;

  return createPortal(
    <div
      className="briti-sm-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="briti-sm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="briti-sm-modal-title"
      >
        {/* Royal Blue Compact Header */}
        <div className="briti-sm-header">
          <div className="briti-sm-header-top">
            <div className="briti-sm-brand">
              <span className="briti-sm-brand-icon" aria-hidden="true">
                <BrainCircuitIcon size={17} />
              </span>
              <span>Briticana Skill Matcher</span>
            </div>
            <div className="briti-sm-header-right">
              <span className="briti-sm-free-badge">Free • 39 Domains</span>
              <button
                type="button"
                className="briti-sm-close"
                onClick={onClose}
                aria-label="Close Skill Matcher"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <h2 id="briti-sm-modal-title" className="briti-sm-title">
            {matches ? "Your Matched Internship Domains" : "Find Your Ideal Internship Domain"}
          </h2>
          <p className="briti-sm-subtitle">
            {matches
              ? `Top Briticana tracks matched to your ${selectedSkills.length} selected skill${selectedSkills.length === 1 ? "" : "s"}.`
              : "Quick 30-second match — share your details and tap the skills you know."}
          </p>

          {!matches ? (
            <div className="briti-sm-steps" aria-hidden="true">
              <span className={`briti-sm-step ${hasContactDetails ? "is-done" : "is-active"}`}>
                <span className="briti-sm-step__num">{hasContactDetails ? "✓" : "1"}</span>
                <span>Your Details</span>
              </span>
              <span className="briti-sm-step__line" />
              <span className={`briti-sm-step ${selectedSkills.length > 0 ? "is-done" : hasContactDetails ? "is-active" : ""}`}>
                <span className="briti-sm-step__num">{selectedSkills.length > 0 ? "✓" : "2"}</span>
                <span>Select Skills ({selectedSkills.length})</span>
              </span>
            </div>
          ) : null}
        </div>

        {/* White Rounded Inner Shell */}
        <div className="briti-sm-body-wrap">
          {matches ? (
            <div className="briti-sm-card" ref={cardScrollRef}>
              <div className="briti-sm-result-intro">
                <div className="briti-sm-result-top-row">
                  <h3>Great fit, {firstName}!</h3>
                  {sheetStatus === "saved" || sheetStatus === "fallback-sent" ? (
                    <span className="briti-sm-saved-pill">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Profile Saved</span>
                    </span>
                  ) : null}
                </div>
                <p>
                  Based on <strong>{selectedSkills.slice(0, 6).join(", ")}</strong>
                  {selectedSkills.length > 6 ? ` +${selectedSkills.length - 6} more` : ""}, these
                  domains best match your profile:
                </p>
              </div>

              <div className="briti-sm-match-list">
                {matches.map((item, idx) => (
                  <article
                    key={item.domain.slug}
                    className={`briti-sm-match-card ${idx === 0 ? "briti-sm-match-card--top" : ""}`}
                  >
                    <div className="briti-sm-match-head">
                      <span className="briti-sm-match-rank">
                        {idx === 0 ? "★ Best Match" : `#${idx + 1} Recommended`}
                      </span>
                      <span className="briti-sm-match-pct">{item.matchPercent}% Match</span>
                    </div>

                    <div className="briti-sm-match-bar" aria-hidden="true">
                      <span style={{ width: `${item.matchPercent}%` }} />
                    </div>

                    <h4 className="briti-sm-match-title">{item.domain.title}</h4>
                    <p className="briti-sm-match-desc">{item.domain.shortDesc}</p>

                    {item.matchedSkills.length > 0 ? (
                      <div className="briti-sm-match-skills">
                        {item.matchedSkills.slice(0, 5).map((sk) => (
                          <span key={sk}>{sk}</span>
                        ))}
                      </div>
                    ) : null}

                    <div className="briti-sm-match-actions">
                      <Link
                        href={`/internships?domain=${encodeURIComponent(item.domain.slug)}`}
                        className="briti-sm-btn-sm briti-sm-btn-sm--primary"
                        onClick={onClose}
                      >
                        Explore {item.domain.title} →
                      </Link>
                      <Link
                        href={`/apply?domain=${encodeURIComponent(item.domain.title)}`}
                        className="briti-sm-btn-sm briti-sm-btn-sm--secondary"
                        onClick={onClose}
                      >
                        Apply Now
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div className="briti-sm-result-footer">
                <button
                  type="button"
                  className="briti-sm-btn-sm briti-sm-btn-sm--secondary"
                  onClick={() => setMatches(null)}
                >
                  ← Edit Skills
                </button>
                <Link
                  href="/domains"
                  className="briti-sm-btn-sm briti-sm-btn-sm--primary"
                  onClick={onClose}
                >
                  View All 39 Domains →
                </Link>
              </div>
            </div>
          ) : (
            <form className="briti-sm-form-shell" onSubmit={handleSubmit} noValidate>
              <div className="briti-sm-card briti-sm-card--form" ref={cardScrollRef}>
                {/* Section 1: Contact Details (Compact Grid) */}
                <div className="briti-sm-section">
                  <div className="briti-sm-section-head">
                    <span className="briti-sm-section-num">1</span>
                    <span className="briti-sm-section-title">Your Details</span>
                  </div>

                  <div className="briti-sm-field">
                    <label htmlFor="sm-full-name" className="briti-sm-label">
                      Full Name <span className="briti-sm-req">*</span>
                    </label>
                    <div className={`briti-sm-input-wrap ${fieldErrors.fullName ? "has-error" : ""}`}>
                      <span className="briti-sm-input-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        ref={firstInputRef}
                        id="sm-full-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Name"
                        className="briti-sm-input"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          clearFieldError("fullName");
                        }}
                      />
                    </div>
                    {fieldErrors.fullName ? (
                      <span className="briti-sm-field-err" role="alert">
                        {fieldErrors.fullName}
                      </span>
                    ) : null}
                  </div>

                  <div className="briti-sm-grid-2">
                    <div className="briti-sm-field">
                      <label htmlFor="sm-email" className="briti-sm-label">
                        Email Address <span className="briti-sm-req">*</span>
                      </label>
                      <div className={`briti-sm-input-wrap ${fieldErrors.email ? "has-error" : ""}`}>
                        <span className="briti-sm-input-icon" aria-hidden="true">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </span>
                        <input
                          id="sm-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="name@example.com"
                          className="briti-sm-input"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            clearFieldError("email");
                          }}
                        />
                      </div>
                      {fieldErrors.email ? (
                        <span className="briti-sm-field-err" role="alert">
                          {fieldErrors.email}
                        </span>
                      ) : null}
                    </div>

                    <div className="briti-sm-field">
                      <label htmlFor="sm-contact" className="briti-sm-label">
                        Contact Number <span className="briti-sm-req">*</span>
                      </label>
                      <div className={`briti-sm-input-wrap ${fieldErrors.contactNumber ? "has-error" : ""}`}>
                        <span className="briti-sm-input-icon" aria-hidden="true">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </span>
                        <input
                          id="sm-contact"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="+353 / +91 98765 43210"
                          className="briti-sm-input"
                          value={contactNumber}
                          onChange={(e) => {
                            setContactNumber(e.target.value);
                            clearFieldError("contactNumber");
                          }}
                        />
                      </div>
                      {fieldErrors.contactNumber ? (
                        <span className="briti-sm-field-err" role="alert">
                          {fieldErrors.contactNumber}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Section 2: Skill Picker */}
                <div className="briti-sm-section briti-sm-section--skills">
                  <div className="briti-sm-label-row">
                    <div className="briti-sm-section-head briti-sm-section-head--inline">
                      <span className="briti-sm-section-num">2</span>
                      <label htmlFor="sm-skill-search" className="briti-sm-section-title">
                        Select Your Skills <span className="briti-sm-req">*</span>
                      </label>
                    </div>
                    <div className="briti-sm-skill-meta">
                      {selectedSkills.length > 0 ? (
                        <button
                          type="button"
                          className="briti-sm-clear-link"
                          onClick={() => setSelectedSkills([])}
                        >
                          Clear all
                        </button>
                      ) : null}
                      <span
                        className={`briti-sm-count-pill ${selectedSkills.length > 0 ? "has-items" : ""}`}
                      >
                        {selectedSkills.length} selected
                      </span>
                    </div>
                  </div>

                  {/* Search Input with Icon & Clear Button */}
                  <div className={`briti-sm-input-wrap briti-sm-input-wrap--search ${fieldErrors.skills ? "has-error" : ""}`}>
                    <span className="briti-sm-input-icon" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </span>
                    <input
                      id="sm-skill-search"
                      type="text"
                      placeholder="Search or type a skill (Python, Excel, Figma, SAP)..."
                      className="briti-sm-input briti-sm-input--search"
                      value={skillQuery}
                      onChange={(e) => setSkillQuery(e.target.value)}
                      onKeyDown={handleSkillSearchKeyDown}
                    />
                    {skillQuery ? (
                      <button
                        type="button"
                        className="briti-sm-search-clear"
                        onClick={() => setSkillQuery("")}
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    ) : null}
                  </div>

                  {fieldErrors.skills ? (
                    <span className="briti-sm-field-err" role="alert">
                      {fieldErrors.skills}
                    </span>
                  ) : null}

                  {/* Quick Category Filter Tabs */}
                  {!skillQuery.trim() ? (
                    <div className="briti-sm-cat-tabs" role="tablist" aria-label="Skill categories">
                      {SKILL_CATEGORIES.map((cat) => (
                        <button
                          key={cat.key}
                          type="button"
                          role="tab"
                          aria-selected={activeCategory === cat.key}
                          className={`briti-sm-cat-tab ${activeCategory === cat.key ? "is-active" : ""}`}
                          onClick={() => setActiveCategory(cat.key)}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {/* Selected Skills Strip */}
                  {selectedSkills.length > 0 ? (
                    <div className="briti-sm-selected-strip" aria-label="Selected skills">
                      {selectedSkills.map((sk) => (
                        <span key={sk} className="briti-sm-selected-tag">
                          <span>{sk}</span>
                          <button
                            type="button"
                            onClick={() => toggleSkill(sk)}
                            aria-label={`Remove ${sk}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Scrollable Skill Chips */}
                  <div className="briti-sm-skills-box" role="group" aria-label="Available skills">
                    {filteredSkills.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          aria-pressed={isSelected}
                          className={`briti-sm-skill-chip ${isSelected ? "is-selected" : ""}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {isSelected ? <span aria-hidden="true">✓</span> : null}
                          <span>{skill}</span>
                        </button>
                      );
                    })}

                    {canAddCustomSkill ? (
                      <button
                        type="button"
                        className="briti-sm-add-custom"
                        onClick={addCustomSkill}
                      >
                        + Add &ldquo;{skillQuery.trim()}&rdquo;
                      </button>
                    ) : null}

                    {filteredSkills.length === 0 && !canAddCustomSkill ? (
                      <span className="briti-sm-empty-hint">
                        Type at least 2 characters to add a custom skill.
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Action Bar (Always Accessible) */}
              <div className="briti-sm-sticky-footer">
                <label className={`briti-sm-consent ${fieldErrors.agreed ? "has-error" : ""}`}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      clearFieldError("agreed");
                    }}
                  />
                  <span>I agree to receive internship and career-related updates from Briticana.</span>
                </label>

                <button type="submit" disabled={isSubmitting} className="briti-sm-submit">
                  {isSubmitting ? (
                    <>
                      <span className="briti-sm-spinner" aria-hidden="true" />
                      <span>Matching Your Skills...</span>
                    </>
                  ) : (
                    <>
                      <span>Find My Internship Domain</span>
                      <span className="briti-sm-submit__arrow" aria-hidden="true">
                        <svg
                          width="15"
                          height="15"
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
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
