import type { ReactNode } from "react";

export type DomainClusterId =
  | "all"
  | "tech-ai"
  | "business-finance"
  | "engineering-quality"
  | "healthcare-science"
  | "design-growth"
  | "operations-legal";

export interface DomainClusterMeta {
  id: DomainClusterId;
  label: string;
  icon: string;
}

export const DOMAIN_CLUSTERS: DomainClusterMeta[] = [
  { id: "all", label: "All Domains", icon: "ri-apps-2-line" },
  { id: "tech-ai", label: "Tech, AI & Data", icon: "ri-cpu-line" },
  { id: "business-finance", label: "Business & Finance", icon: "ri-line-chart-line" },
  { id: "engineering-quality", label: "Engineering & Quality", icon: "ri-settings-4-line" },
  { id: "healthcare-science", label: "Healthcare & Science", icon: "ri-heart-pulse-line" },
  { id: "design-growth", label: "Design & Marketing", icon: "ri-palette-line" },
  { id: "operations-legal", label: "Operations, HR & Legal", icon: "ri-briefcase-4-line" },
];

export type DomainPatternType = "grid" | "dots" | "waves" | "circuit" | "diagonal" | "rings";

export interface DomainVisualIdentity {
  key: string;
  cluster: Exclude<DomainClusterId, "all">;
  badge: string;
  description: string;
  isDark?: boolean;
  pattern: DomainPatternType;
  accent: string;
  accentSecondary: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardGlow: string;
  iconBg: string;
  iconBorder: string;
  badgeBg: string;
  badgeText: string;
  topBar: string;
  icon: ReactNode;
}

/* ── Palette Helpers for Cohesive Human-Designed Domain Cards ────────────── */
function lightTheme(params: {
  key: string;
  cluster: Exclude<DomainClusterId, "all">;
  badge: string;
  description: string;
  pattern: DomainPatternType;
  accent: string;
  accentSecondary: string;
  tintStart: string;
  tintEnd: string;
  iconBgStart: string;
  iconBgEnd: string;
  borderRgb: string;
  badgeBg: string;
  badgeText: string;
  icon: ReactNode;
}): DomainVisualIdentity {
  return {
    key: params.key,
    cluster: params.cluster,
    badge: params.badge,
    description: params.description,
    isDark: false,
    pattern: params.pattern,
    accent: params.accent,
    accentSecondary: params.accent,
    cardBg: "#ffffff",
    cardBorder: "#e2e8f0",
    cardHoverBorder: `rgba(${params.borderRgb}, 0.38)`,
    cardGlow: "rgba(15, 23, 42, 0.06)",
    iconBg: params.iconBgStart,
    iconBorder: `rgba(${params.borderRgb}, 0.18)`,
    badgeBg: params.badgeBg,
    badgeText: params.badgeText,
    topBar: params.accent,
    icon: params.icon,
  };
}

function darkTheme(params: {
  key: string;
  cluster: Exclude<DomainClusterId, "all">;
  badge: string;
  description: string;
  pattern: DomainPatternType;
  accent: string;
  accentSecondary: string;
  bgStart: string;
  bgEnd: string;
  borderRgb: string;
  iconBgStart: string;
  iconBgEnd: string;
  badgeBg: string;
  badgeText: string;
  icon: ReactNode;
}): DomainVisualIdentity {
  return {
    key: params.key,
    cluster: params.cluster,
    badge: params.badge,
    description: params.description,
    isDark: false,
    pattern: params.pattern,
    accent: "#1e293b",
    accentSecondary: params.accent,
    cardBg: "#ffffff",
    cardBorder: "#e2e8f0",
    cardHoverBorder: "#94a3b8",
    cardGlow: "rgba(15, 23, 42, 0.06)",
    iconBg: "#f1f5f9",
    iconBorder: "#cbd5e1",
    badgeBg: "#f1f5f9",
    badgeText: "#334155",
    topBar: "#1e293b",
    icon: params.icon,
  };
}

/* ── 39+ Category-Specific Visual Identities ───────────────────── */
const DOMAIN_VISUAL_MAP: Record<string, DomainVisualIdentity> = {
  /* 1. Administration */
  administration: lightTheme({
    key: "administration",
    cluster: "operations-legal",
    badge: "Corporate Ops",
    description: "Executive coordination, office systems, and structured organizational workflows.",
    pattern: "grid",
    accent: "#0d9488",
    accentSecondary: "#0ea5e9",
    tintStart: "#f4fbfa",
    tintEnd: "#eef8ff",
    iconBgStart: "#ccfbf1",
    iconBgEnd: "#e0f2fe",
    borderRgb: "13, 148, 136",
    badgeBg: "rgba(13, 148, 136, 0.1)",
    badgeText: "#0f766e",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="8" y="6" width="20" height="25" rx="4" fill="#0d9488" fillOpacity="0.15" stroke="#0d9488" strokeWidth="2.2" />
        <path d="M13 6V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2z" fill="#0284c7" />
        <path d="M13 14h10M13 19h10M13 24h6" stroke="#0f766e" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4.5" fill="#0ea5e9" />
        <path d="M22.3 24l1.2 1.2 2.3-2.4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 2. Artificial Intelligence */
  "artificial-intelligence": lightTheme({
    key: "artificial-intelligence",
    cluster: "tech-ai",
    badge: "AI & Neural Tech",
    description: "Applied foundation models, intelligent agents, and cognitive automation.",
    pattern: "circuit",
    accent: "#7c3aed",
    accentSecondary: "#06b6d4",
    tintStart: "#f8f5ff",
    tintEnd: "#f0fdfa",
    iconBgStart: "#ede9fe",
    iconBgEnd: "#cffafe",
    borderRgb: "124, 58, 237",
    badgeBg: "rgba(124, 58, 237, 0.1)",
    badgeText: "#6d28d9",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="10" y="10" width="16" height="16" rx="4" fill="#7c3aed" />
        <rect x="14" y="14" width="8" height="8" rx="2" fill="#38bdf8" />
        <path d="M14 6v4M22 6v4M14 26v4M22 26v4M6 14h4M6 22h4M26 14h4M26 22h4" stroke="#6d28d9" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="2" fill="#fff" />
        <path d="M28 5l1 2.2L31.2 8 29 9l-1 2.2L27 9l-2.2-1L27 7.2 28 5z" fill="#f59e0b" />
      </svg>
    ),
  }),

  /* 3. Asset Management */
  "asset-management": lightTheme({
    key: "asset-management",
    cluster: "business-finance",
    badge: "Capital & Wealth",
    description: "Portfolio strategy, capital allocation, and institutional asset performance.",
    pattern: "diagonal",
    accent: "#059669",
    accentSecondary: "#d97706",
    tintStart: "#f2fbf7",
    tintEnd: "#fffbeb",
    iconBgStart: "#d1fae5",
    iconBgEnd: "#fef3c7",
    borderRgb: "5, 150, 105",
    badgeBg: "rgba(5, 150, 105, 0.1)",
    badgeText: "#047857",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M6 28h24" stroke="#047857" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="8" y="18" width="4.5" height="10" rx="1.5" fill="#10b981" />
        <rect x="15.5" y="13" width="4.5" height="15" rx="1.5" fill="#059669" />
        <rect x="23" y="8" width="4.5" height="20" rx="1.5" fill="#f59e0b" />
        <path d="M8 13l6-4 5 2 7-6" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="26" cy="5" r="2.5" fill="#f59e0b" />
      </svg>
    ),
  }),

  /* 4. Audit */
  audit: lightTheme({
    key: "audit",
    cluster: "business-finance",
    badge: "Assurance & Risk",
    description: "Financial verification, internal control testing, and compliance auditing.",
    pattern: "grid",
    accent: "#4f46e5",
    accentSecondary: "#0ea5e9",
    tintStart: "#f5f6ff",
    tintEnd: "#f0f9ff",
    iconBgStart: "#e0e7ff",
    iconBgEnd: "#dbeafe",
    borderRgb: "79, 70, 229",
    badgeBg: "rgba(79, 70, 229, 0.1)",
    badgeText: "#4338ca",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="7" y="5" width="17" height="23" rx="3" fill="#4f46e5" fillOpacity="0.14" stroke="#4f46e5" strokeWidth="2.2" />
        <path d="M11 11h9M11 16h6M11 21h4" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" />
        <circle cx="23" cy="22" r="6" fill="#0ea5e9" stroke="#fff" strokeWidth="2" />
        <path d="M27.5 26.5L31 30" stroke="#1e1b4b" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M20.8 22l1.5 1.5 3-3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 5. Business Analysis */
  "business-analysis": lightTheme({
    key: "business-analysis",
    cluster: "business-finance",
    badge: "Strategy & KPIs",
    description: "Business process modeling, requirement discovery, and data-backed decisions.",
    pattern: "dots",
    accent: "#2563eb",
    accentSecondary: "#06b6d4",
    tintStart: "#f4f8ff",
    tintEnd: "#ecfeff",
    iconBgStart: "#dbeafe",
    iconBgEnd: "#cffafe",
    borderRgb: "37, 99, 235",
    badgeBg: "rgba(37, 99, 235, 0.1)",
    badgeText: "#1d4ed8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="6" width="26" height="20" rx="4" fill="#2563eb" fillOpacity="0.12" stroke="#2563eb" strokeWidth="2.2" />
        <path d="M10 19l4.5-4.5 4 3 7.5-7.5" stroke="#0284c7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 10h4v4" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 26l-2 4M22 26l2 4M10 30h16" stroke="#1d4ed8" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 6. Clinical */
  clinical: lightTheme({
    key: "clinical",
    cluster: "healthcare-science",
    badge: "Clinical Care",
    description: "Clinical research workflows, patient care standards, and medical diagnostics.",
    pattern: "waves",
    accent: "#0891b2",
    accentSecondary: "#10b981",
    tintStart: "#f0fdff",
    tintEnd: "#ecfdf5",
    iconBgStart: "#cffafe",
    iconBgEnd: "#d1fae5",
    borderRgb: "8, 145, 178",
    badgeBg: "rgba(8, 145, 178, 0.11)",
    badgeText: "#0e7490",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 30s-11-6.7-11-15a6.5 6.5 0 0 1 11-4.6A6.5 6.5 0 0 1 29 15c0 8.3-11 15-11 15z" fill="#0891b2" fillOpacity="0.16" stroke="#0891b2" strokeWidth="2.2" />
        <path d="M10 17h4.5l2.2-4.5 3.2 8.5 2.3-4H26" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 7. Compliance */
  compliance: lightTheme({
    key: "compliance",
    cluster: "operations-legal",
    badge: "Governance",
    description: "Regulatory adherence, policy governance, and enterprise risk standards.",
    pattern: "grid",
    accent: "#4338ca",
    accentSecondary: "#d97706",
    tintStart: "#f5f5ff",
    tintEnd: "#fffbeb",
    iconBgStart: "#e0e7ff",
    iconBgEnd: "#fef3c7",
    borderRgb: "67, 56, 202",
    badgeBg: "rgba(67, 56, 202, 0.1)",
    badgeText: "#3730a3",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 4L7 8.5v8.8C7 24.8 11.7 30.8 18 33c6.3-2.2 11-8.2 11-15.7V8.5L18 4z" fill="#4338ca" fillOpacity="0.15" stroke="#4338ca" strokeWidth="2.2" />
        <circle cx="18" cy="18" r="6" fill="#f59e0b" />
        <path d="M15.3 18l2 2 3.6-3.8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 8. Cybersecurity — Signature Dark Navy / Charcoal Security Theme */
  cybersecurity: darkTheme({
    key: "cybersecurity",
    cluster: "tech-ai",
    badge: "Cyber Defense",
    description: "Threat intelligence, network defense, zero-trust architecture, and SOC operations.",
    pattern: "circuit",
    accent: "#38bdf8",
    accentSecondary: "#2dd4bf",
    bgStart: "#0b132b",
    bgEnd: "#112240",
    borderRgb: "56, 189, 248",
    iconBgStart: "rgba(56, 189, 248, 0.2)",
    iconBgEnd: "rgba(45, 212, 191, 0.16)",
    badgeBg: "rgba(56, 189, 248, 0.16)",
    badgeText: "#7dd3fc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 3.5L6.5 8.2v9.2c0 7.8 4.9 14.3 11.5 16.6 6.6-2.3 11.5-8.8 11.5-16.6V8.2L18 3.5z" fill="#0ea5e9" fillOpacity="0.24" stroke="#38bdf8" strokeWidth="2.2" />
        <rect x="13.5" y="16.5" width="9" height="7.5" rx="2" fill="#2dd4bf" />
        <path d="M15.5 16.5v-2.2a2.5 2.5 0 0 1 5 0v2.2" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="20.2" r="1.2" fill="#0b132b" />
      </svg>
    ),
  }),

  /* 9. Data Analytics & Data Operations */
  "data-analytics-operations": lightTheme({
    key: "data-analytics-operations",
    cluster: "tech-ai",
    badge: "Data & BI",
    description: "BI dashboards, SQL/Python data pipelines, and operational data engineering.",
    pattern: "dots",
    accent: "#0284c7",
    accentSecondary: "#6366f1",
    tintStart: "#f0f9ff",
    tintEnd: "#eef2ff",
    iconBgStart: "#e0f2fe",
    iconBgEnd: "#e0e7ff",
    borderRgb: "2, 132, 199",
    badgeBg: "rgba(2, 132, 199, 0.1)",
    badgeText: "#0369a1",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <ellipse cx="14" cy="9" rx="7" ry="3" fill="#0284c7" />
        <path d="M7 9v6c0 1.66 3.13 3 7 3s7-1.34 7-3V9" stroke="#0284c7" strokeWidth="2" />
        <path d="M7 15v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" stroke="#0284c7" strokeWidth="2" />
        <circle cx="25" cy="23" r="6.5" fill="#6366f1" />
        <path d="M25 19.5V23l2.6 1.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 10. Digital Transformation */
  "digital-transformation": lightTheme({
    key: "digital-transformation",
    cluster: "tech-ai",
    badge: "Cloud & Agility",
    description: "Enterprise cloud migration, workflow digitization, and modern SaaS adoption.",
    pattern: "waves",
    accent: "#6366f1",
    accentSecondary: "#ec4899",
    tintStart: "#f5f3ff",
    tintEnd: "#fdf2f8",
    iconBgStart: "#e0e7ff",
    iconBgEnd: "#fce7f3",
    borderRgb: "99, 102, 241",
    badgeBg: "rgba(99, 102, 241, 0.1)",
    badgeText: "#4f46e5",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M11 24h13.5a5.5 5.5 0 0 0 .7-10.95A7.5 7.5 0 0 0 10.7 11a5 5 0 0 0 .3 13z" fill="#6366f1" fillOpacity="0.16" stroke="#6366f1" strokeWidth="2.2" />
        <path d="M15 19l3-3 3 3M18 16v11" stroke="#ec4899" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="29" r="2" fill="#6366f1" />
        <circle cx="25" cy="29" r="2" fill="#ec4899" />
      </svg>
    ),
  }),

  /* 11. Engineering */
  engineering: lightTheme({
    key: "engineering",
    cluster: "engineering-quality",
    badge: "Applied Engineering",
    description: "Technical systems architecture, CAD prototyping, and industrial engineering.",
    pattern: "grid",
    accent: "#ea580c",
    accentSecondary: "#475569",
    tintStart: "#fff7ed",
    tintEnd: "#f8fafc",
    iconBgStart: "#ffedd5",
    iconBgEnd: "#e2e8f0",
    borderRgb: "234, 88, 12",
    badgeBg: "rgba(234, 88, 12, 0.11)",
    badgeText: "#c2410c",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="15" cy="15" r="5.5" fill="#ea580c" fillOpacity="0.18" stroke="#ea580c" strokeWidth="2.2" />
        <circle cx="15" cy="15" r="2" fill="#ea580c" />
        <path d="M15 6.5v2M15 21.5v2M6.5 15h2M21.5 15h2M9 9l1.5 1.5M19.5 19.5L21 21M21 9l-1.5 1.5M10.5 19.5L9 21" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M21 21l8.5 8.5" stroke="#334155" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="28.5" cy="28.5" r="2.2" fill="#475569" />
      </svg>
    ),
  }),

  /* 12. Finance */
  finance: lightTheme({
    key: "finance",
    cluster: "business-finance",
    badge: "Finance & Treasury",
    description: "Financial modeling, corporate valuation, FP&A reporting, and capital markets.",
    pattern: "diagonal",
    accent: "#059669",
    accentSecondary: "#0d9488",
    tintStart: "#ecfdf5",
    tintEnd: "#f0fdfa",
    iconBgStart: "#d1fae5",
    iconBgEnd: "#ccfbf1",
    borderRgb: "5, 150, 105",
    badgeBg: "rgba(5, 150, 105, 0.11)",
    badgeText: "#047857",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="9" width="26" height="18" rx="4" fill="#059669" fillOpacity="0.14" stroke="#059669" strokeWidth="2.2" />
        <circle cx="18" cy="18" r="4.5" fill="#10b981" />
        <path d="M18 15v6M16.3 16.5h2.5a1.2 1.2 0 0 1 0 2.4h-1.6a1.2 1.2 0 0 0 0 2.4h2.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="9.5" cy="18" r="1.5" fill="#047857" />
        <circle cx="26.5" cy="18" r="1.5" fill="#047857" />
      </svg>
    ),
  }),

  /* 13. Food Quality */
  "food-quality": lightTheme({
    key: "food-quality",
    cluster: "healthcare-science",
    badge: "Food Safety",
    description: "HACCP standards, nutritional quality assurance, and food laboratory testing.",
    pattern: "rings",
    accent: "#16a34a",
    accentSecondary: "#84cc16",
    tintStart: "#f0fdf4",
    tintEnd: "#f7fee7",
    iconBgStart: "#dcfce7",
    iconBgEnd: "#ecfccb",
    borderRgb: "22, 163, 74",
    badgeBg: "rgba(22, 163, 74, 0.11)",
    badgeText: "#15803d",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M27 7C17 7 9 14 9 24c0 2 .5 3.5.5 3.5S11 28 13 28c10 0 17-8 14-21z" fill="#16a34a" fillOpacity="0.18" stroke="#16a34a" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M9.5 27.5C14 22 19 17 24 13" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="5.5" fill="#84cc16" stroke="#fff" strokeWidth="1.8" />
        <path d="M21.8 24l1.5 1.5 3-3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 14. Graphic Design */
  "graphic-design": lightTheme({
    key: "graphic-design",
    cluster: "design-growth",
    badge: "Creative Studio",
    description: "Visual brand identity, typography, digital illustration, and creative direction.",
    pattern: "waves",
    accent: "#db2777",
    accentSecondary: "#9333ea",
    tintStart: "#fdf2f8",
    tintEnd: "#faf5ff",
    iconBgStart: "#fce7f3",
    iconBgEnd: "#f3e8ff",
    borderRgb: "219, 39, 119",
    badgeBg: "rgba(219, 39, 119, 0.1)",
    badgeText: "#be185d",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 5C10.8 5 5 10.6 5 17.5 5 24.4 10.8 30 18 30c2.1 0 3.7-1.6 3.7-3.6 0-.9-.4-1.8-1-2.4-.6-.6-.9-1.4-.9-2.2 0-1.9 1.6-3.4 3.5-3.4H25c3.3 0 6-2.6 6-5.9C31 7.9 25.2 5 18 5z" fill="#db2777" fillOpacity="0.15" stroke="#db2777" strokeWidth="2.2" />
        <circle cx="11.5" cy="15.5" r="2" fill="#9333ea" />
        <circle cx="15.5" cy="11" r="2" fill="#db2777" />
        <circle cx="21.5" cy="11" r="2" fill="#f59e0b" />
        <circle cx="25" cy="15" r="2" fill="#06b6d4" />
      </svg>
    ),
  }),

  /* 15. HR (Human Resources) */
  hr: lightTheme({
    key: "hr",
    cluster: "operations-legal",
    badge: "People & Talent",
    description: "Talent acquisition, people analytics, onboarding, and organizational culture.",
    pattern: "rings",
    accent: "#7c3aed",
    accentSecondary: "#4f46e5",
    tintStart: "#f5f3ff",
    tintEnd: "#eef2ff",
    iconBgStart: "#ede9fe",
    iconBgEnd: "#e0e7ff",
    borderRgb: "124, 58, 237",
    badgeBg: "rgba(124, 58, 237, 0.1)",
    badgeText: "#6d28d9",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="14" cy="13" r="4.2" fill="#7c3aed" />
        <circle cx="23.5" cy="14.5" r="3.2" fill="#4f46e5" fillOpacity="0.75" />
        <path d="M6.5 27c0-4 3.4-7.2 7.5-7.2s7.5 3.2 7.5 7.2" fill="#7c3aed" fillOpacity="0.18" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M21.5 27c0-3.1 2.4-5.6 5.5-5.6 2.2 0 4.1 1.2 4.9 3" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 16. Infrastructure Operations */
  "infrastructure-operations": lightTheme({
    key: "infrastructure-operations",
    cluster: "tech-ai",
    badge: "Cloud Infra",
    description: "Cloud compute clusters, network topology, virtualization, and data center ops.",
    pattern: "grid",
    accent: "#0284c7",
    accentSecondary: "#3b82f6",
    tintStart: "#f0f9ff",
    tintEnd: "#eff6ff",
    iconBgStart: "#e0f2fe",
    iconBgEnd: "#dbeafe",
    borderRgb: "2, 132, 199",
    badgeBg: "rgba(2, 132, 199, 0.1)",
    badgeText: "#0369a1",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="7" width="24" height="8" rx="2.5" fill="#0284c7" fillOpacity="0.16" stroke="#0284c7" strokeWidth="2.2" />
        <rect x="6" y="19" width="24" height="8" rx="2.5" fill="#3b82f6" fillOpacity="0.16" stroke="#2563eb" strokeWidth="2.2" />
        <circle cx="11" cy="11" r="1.5" fill="#0284c7" />
        <circle cx="15" cy="11" r="1.5" fill="#10b981" />
        <circle cx="11" cy="23" r="1.5" fill="#2563eb" />
        <circle cx="15" cy="23" r="1.5" fill="#10b981" />
        <path d="M18 27v4M12 31h12" stroke="#0369a1" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 17. IT Operations */
  "it-operations": lightTheme({
    key: "it-operations",
    cluster: "tech-ai",
    badge: "Enterprise IT",
    description: "IT service management, enterprise endpoint security, and systems administration.",
    pattern: "circuit",
    accent: "#2563eb",
    accentSecondary: "#0ea5e9",
    tintStart: "#eff6ff",
    tintEnd: "#f0f9ff",
    iconBgStart: "#dbeafe",
    iconBgEnd: "#e0f2fe",
    borderRgb: "37, 99, 235",
    badgeBg: "rgba(37, 99, 235, 0.1)",
    badgeText: "#1d4ed8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="7" width="26" height="17" rx="3" fill="#2563eb" fillOpacity="0.14" stroke="#2563eb" strokeWidth="2.2" />
        <path d="M11 13l3 2.5-3 2.5M16.5 18H21" stroke="#1d4ed8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 29h10M18 24v5" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 18. Laboratory Operations */
  "laboratory-operations": lightTheme({
    key: "laboratory-operations",
    cluster: "healthcare-science",
    badge: "Lab Science",
    description: "Analytical instrumentation, sample testing protocols, and R&D lab management.",
    pattern: "dots",
    accent: "#0891b2",
    accentSecondary: "#6366f1",
    tintStart: "#ecfeff",
    tintEnd: "#eef2ff",
    iconBgStart: "#cffafe",
    iconBgEnd: "#e0e7ff",
    borderRgb: "8, 145, 178",
    badgeBg: "rgba(8, 145, 178, 0.11)",
    badgeText: "#0e7490",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M14 6h8M15.5 6v7.5L9 26.2A2.5 2.5 0 0 0 11.2 30h13.6A2.5 2.5 0 0 0 27 26.2L20.5 13.5V6" stroke="#0891b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.5 22h13l2.2 4.3a1.5 1.5 0 0 1-1.3 2.2H10.6a1.5 1.5 0 0 1-1.3-2.2L11.5 22z" fill="#06b6d4" fillOpacity="0.3" />
        <circle cx="16" cy="25" r="1.5" fill="#6366f1" />
        <circle cx="20.5" cy="23.5" r="1.2" fill="#0891b2" />
      </svg>
    ),
  }),

  /* 19. Legal */
  legal: lightTheme({
    key: "legal",
    cluster: "operations-legal",
    badge: "Corporate Law",
    description: "Contract drafting, IP protection, regulatory counsel, and commercial law.",
    pattern: "diagonal",
    accent: "#b45309",
    accentSecondary: "#475569",
    tintStart: "#fffbeb",
    tintEnd: "#f8fafc",
    iconBgStart: "#fef3c7",
    iconBgEnd: "#e2e8f0",
    borderRgb: "180, 83, 9",
    badgeBg: "rgba(180, 83, 9, 0.11)",
    badgeText: "#92400e",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 6v23M12 29h12M9 11h18" stroke="#92400e" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M9 11l-3.5 7.5h7L9 11zM27 11l-3.5 7.5h7L27 11z" fill="#f59e0b" fillOpacity="0.3" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="18" cy="6" r="2" fill="#b45309" />
      </svg>
    ),
  }),

  /* 20. Machine Learning */
  "machine-learning": lightTheme({
    key: "machine-learning",
    cluster: "tech-ai",
    badge: "Deep Learning",
    description: "Predictive modeling, neural network training, MLOps, and feature engineering.",
    pattern: "circuit",
    accent: "#9333ea",
    accentSecondary: "#3b82f6",
    tintStart: "#faf5ff",
    tintEnd: "#eff6ff",
    iconBgStart: "#f3e8ff",
    iconBgEnd: "#dbeafe",
    borderRgb: "147, 51, 234",
    badgeBg: "rgba(147, 51, 234, 0.1)",
    badgeText: "#7e22ce",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M9 11l9 7-9 7M9 11l9-4 9 7M9 25l9 4 9-7M18 7v22M18 18l9-4M18 18l9 4" stroke="#9333ea" strokeWidth="1.8" strokeOpacity="0.55" />
        <circle cx="9" cy="11" r="3" fill="#9333ea" />
        <circle cx="9" cy="25" r="3" fill="#9333ea" />
        <circle cx="18" cy="7" r="3" fill="#3b82f6" />
        <circle cx="18" cy="18" r="3.5" fill="#ec4899" />
        <circle cx="18" cy="29" r="3" fill="#3b82f6" />
        <circle cx="27" cy="14" r="3" fill="#06b6d4" />
        <circle cx="27" cy="22" r="3" fill="#06b6d4" />
      </svg>
    ),
  }),

  /* 21. Marketing */
  marketing: lightTheme({
    key: "marketing",
    cluster: "design-growth",
    badge: "Growth & Brand",
    description: "Performance campaigns, digital acquisition, content strategy, and market growth.",
    pattern: "waves",
    accent: "#ea580c",
    accentSecondary: "#f43f5e",
    tintStart: "#fff7ed",
    tintEnd: "#fff1f2",
    iconBgStart: "#ffedd5",
    iconBgEnd: "#ffe4e6",
    borderRgb: "234, 88, 12",
    badgeBg: "rgba(234, 88, 12, 0.11)",
    badgeText: "#c2410c",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M25 8L12 13.5H7.5A2.5 2.5 0 0 0 5 16v3a2.5 2.5 0 0 0 2.5 2.5H12L25 27V8z" fill="#ea580c" fillOpacity="0.18" stroke="#ea580c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M9.5 21.5L11 29h3.5l-1.2-7.5" stroke="#f43f5e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 13.5c1.5 1.2 2.5 2.5 2.5 4s-1 2.8-2.5 4M28.5 9.5c2.8 2 4.5 4.8 4.5 8s-1.7 6-4.5 8" stroke="#f43f5e" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 22. Mechanical Quality */
  "mechanical-quality": lightTheme({
    key: "mechanical-quality",
    cluster: "engineering-quality",
    badge: "Precision QA",
    description: "Dimensional metrology, ISO mechanical inspection, and manufacturing tolerances.",
    pattern: "grid",
    accent: "#d97706",
    accentSecondary: "#475569",
    tintStart: "#fffbeb",
    tintEnd: "#f8fafc",
    iconBgStart: "#fef3c7",
    iconBgEnd: "#e2e8f0",
    borderRgb: "217, 119, 6",
    badgeBg: "rgba(217, 119, 6, 0.12)",
    badgeText: "#b45309",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="10" fill="#d97706" fillOpacity="0.14" stroke="#d97706" strokeWidth="2.2" />
        <path d="M18 18l4.5-4.5" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="18" cy="18" r="2.2" fill="#334155" />
        <path d="M12 12l1.5 1.5M24 12l-1.5 1.5M18 9.5v2" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <path d="M13.5 23.5h9" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 23. Nursing */
  nursing: lightTheme({
    key: "nursing",
    cluster: "healthcare-science",
    badge: "Patient Care",
    description: "Compassionate clinical nursing, patient monitoring, and hospital care coordination.",
    pattern: "waves",
    accent: "#0d9488",
    accentSecondary: "#ec4899",
    tintStart: "#f0fdfa",
    tintEnd: "#fdf2f8",
    iconBgStart: "#ccfbf1",
    iconBgEnd: "#fce7f3",
    borderRgb: "13, 148, 136",
    badgeBg: "rgba(13, 148, 136, 0.11)",
    badgeText: "#0f766e",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="7" y="7" width="22" height="22" rx="6" fill="#0d9488" fillOpacity="0.15" stroke="#0d9488" strokeWidth="2.2" />
        <path d="M18 12.5v11M12.5 18h11" stroke="#ec4899" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 24. Operations */
  operations: lightTheme({
    key: "operations",
    cluster: "operations-legal",
    badge: "Business Ops",
    description: "Cross-functional execution, process optimization, and operational scaling.",
    pattern: "dots",
    accent: "#4f46e5",
    accentSecondary: "#0284c7",
    tintStart: "#eef2ff",
    tintEnd: "#f0f9ff",
    iconBgStart: "#e0e7ff",
    iconBgEnd: "#e0f2fe",
    borderRgb: "79, 70, 229",
    badgeBg: "rgba(79, 70, 229, 0.1)",
    badgeText: "#4338ca",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 7a11 11 0 0 1 9.5 5.5M27.5 23.5A11 11 0 0 1 8.5 23.5M8.5 12.5A11 11 0 0 1 18 7" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="4.5" fill="#0284c7" />
        <circle cx="18" cy="7" r="2.5" fill="#4f46e5" />
        <circle cx="27.5" cy="23.5" r="2.5" fill="#0284c7" />
        <circle cx="8.5" cy="23.5" r="2.5" fill="#6366f1" />
      </svg>
    ),
  }),

  /* 25. Pharmaceutical Quality */
  "pharmaceutical-quality": lightTheme({
    key: "pharmaceutical-quality",
    cluster: "healthcare-science",
    badge: "Pharma & GMP",
    description: "GMP compliance, pharmaceutical formulation QA, and clinical batch validation.",
    pattern: "rings",
    accent: "#0d9488",
    accentSecondary: "#2563eb",
    tintStart: "#f0fdfa",
    tintEnd: "#eff6ff",
    iconBgStart: "#ccfbf1",
    iconBgEnd: "#dbeafe",
    borderRgb: "13, 148, 136",
    badgeBg: "rgba(13, 148, 136, 0.11)",
    badgeText: "#0f766e",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="13" y="5" width="10" height="26" rx="5" transform="rotate(40 18 18)" fill="#0d9488" fillOpacity="0.18" stroke="#0d9488" strokeWidth="2.2" />
        <path d="M14.2 14.8l7.6 6.4" stroke="#2563eb" strokeWidth="2.2" />
        <circle cx="25" cy="25" r="4.5" fill="#2563eb" />
        <path d="M23.2 25l1.2 1.2 2.4-2.4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 26. Procurement */
  procurement: lightTheme({
    key: "procurement",
    cluster: "business-finance",
    badge: "Strategic Sourcing",
    description: "Vendor negotiation, global sourcing strategy, and supply contract management.",
    pattern: "diagonal",
    accent: "#d97706",
    accentSecondary: "#0d9488",
    tintStart: "#fffbeb",
    tintEnd: "#f0fdfa",
    iconBgStart: "#fef3c7",
    iconBgEnd: "#ccfbf1",
    borderRgb: "217, 119, 6",
    badgeBg: "rgba(217, 119, 6, 0.11)",
    badgeText: "#b45309",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M8 12h20l-2 15H10L8 12z" fill="#d97706" fillOpacity="0.16" stroke="#d97706" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M13 12V9.5a5 5 0 0 1 10 0V12" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M14.5 19.5l2.5 2.5 4.5-4.5" stroke="#0d9488" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 27. Product Management */
  "product-management": lightTheme({
    key: "product-management",
    cluster: "tech-ai",
    badge: "Product Strategy",
    description: "Product discovery, roadmap prioritization, user metrics, and go-to-market execution.",
    pattern: "dots",
    accent: "#6d28d9",
    accentSecondary: "#2563eb",
    tintStart: "#f5f3ff",
    tintEnd: "#eff6ff",
    iconBgStart: "#ede9fe",
    iconBgEnd: "#dbeafe",
    borderRgb: "109, 40, 217",
    badgeBg: "rgba(109, 40, 217, 0.1)",
    badgeText: "#5b21b6",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 5L29 11.2v12.6L18 30 7 23.8V11.2L18 5z" fill="#6d28d9" fillOpacity="0.15" stroke="#6d28d9" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M7 11.2L18 17.5l11-6.3M18 17.5V30" stroke="#2563eb" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="18" cy="11" r="2.2" fill="#f59e0b" />
      </svg>
    ),
  }),

  /* 28. Project Management */
  "project-management": lightTheme({
    key: "project-management",
    cluster: "operations-legal",
    badge: "Agile Delivery",
    description: "Sprint planning, milestone governance, risk tracking, and cross-team delivery.",
    pattern: "grid",
    accent: "#0369a1",
    accentSecondary: "#6366f1",
    tintStart: "#f0f9ff",
    tintEnd: "#eef2ff",
    iconBgStart: "#e0f2fe",
    iconBgEnd: "#e0e7ff",
    borderRgb: "3, 105, 161",
    badgeBg: "rgba(3, 105, 161, 0.1)",
    badgeText: "#075985",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="7" width="24" height="22" rx="4" fill="#0369a1" fillOpacity="0.13" stroke="#0369a1" strokeWidth="2.2" />
        <rect x="10" y="12" width="4.5" height="12" rx="1.5" fill="#0284c7" />
        <rect x="16.2" y="12" width="4.5" height="8" rx="1.5" fill="#6366f1" />
        <rect x="22.5" y="12" width="4.5" height="10" rx="1.5" fill="#10b981" />
      </svg>
    ),
  }),

  /* 29. Quality Assurance */
  "quality-assurance": lightTheme({
    key: "quality-assurance",
    cluster: "engineering-quality",
    badge: "Quality Systems",
    description: "Continuous quality improvement, ISO standards, and defect prevention frameworks.",
    pattern: "rings",
    accent: "#059669",
    accentSecondary: "#14b8a6",
    tintStart: "#ecfdf5",
    tintEnd: "#f0fdfa",
    iconBgStart: "#d1fae5",
    iconBgEnd: "#ccfbf1",
    borderRgb: "5, 150, 105",
    badgeBg: "rgba(5, 150, 105, 0.11)",
    badgeText: "#047857",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="16" r="9.5" fill="#059669" fillOpacity="0.16" stroke="#059669" strokeWidth="2.2" />
        <path d="M14 24.5L12 32l6-3 6 3-2-7.5" fill="#14b8a6" fillOpacity="0.3" stroke="#047857" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14.2 16l2.6 2.6 5.2-5.2" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 30. Quantity Surveying */
  "quantity-surveying": lightTheme({
    key: "quantity-surveying",
    cluster: "engineering-quality",
    badge: "Construction Cost",
    description: "Construction cost estimation, bill of quantities, tendering, and project valuation.",
    pattern: "grid",
    accent: "#ca8a04",
    accentSecondary: "#475569",
    tintStart: "#fefce8",
    tintEnd: "#f8fafc",
    iconBgStart: "#fef08a",
    iconBgEnd: "#e2e8f0",
    borderRgb: "202, 138, 4",
    badgeBg: "rgba(202, 138, 4, 0.12)",
    badgeText: "#a16207",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M8 28V10l10-4 10 4v18" fill="#ca8a04" fillOpacity="0.15" stroke="#ca8a04" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M6 28h24M14 14h8M14 19h8M14 24h8" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 31. Renewable Energy */
  "renewable-energy": lightTheme({
    key: "renewable-energy",
    cluster: "engineering-quality",
    badge: "Clean Energy",
    description: "Solar and wind power systems, smart grid storage, and clean energy transition.",
    pattern: "waves",
    accent: "#16a34a",
    accentSecondary: "#0ea5e9",
    tintStart: "#f0fdf4",
    tintEnd: "#f0f9ff",
    iconBgStart: "#dcfce7",
    iconBgEnd: "#e0f2fe",
    borderRgb: "22, 163, 74",
    badgeBg: "rgba(22, 163, 74, 0.11)",
    badgeText: "#15803d",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="25" cy="11" r="4.5" fill="#f59e0b" />
        <path d="M16 15v15M11 30h10" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M16 15L9 9M16 15l8-2M16 15l-2 8" stroke="#0ea5e9" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="16" cy="15" r="2.2" fill="#16a34a" />
      </svg>
    ),
  }),

  /* 32. Site Reliability — Signature Dark DevOps / Uptime Theme */
  "site-reliability": darkTheme({
    key: "site-reliability",
    cluster: "tech-ai",
    badge: "SRE & DevOps",
    description: "High-availability cloud reliability, Kubernetes observability, and incident engineering.",
    pattern: "grid",
    accent: "#10b981",
    accentSecondary: "#38bdf8",
    bgStart: "#0f172a",
    bgEnd: "#132a3e",
    borderRgb: "16, 185, 129",
    iconBgStart: "rgba(16, 185, 129, 0.22)",
    iconBgEnd: "rgba(56, 189, 248, 0.18)",
    badgeBg: "rgba(16, 185, 129, 0.18)",
    badgeText: "#6ee7b7",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="7" width="26" height="22" rx="4" fill="#10b981" fillOpacity="0.16" stroke="#34d399" strokeWidth="2.2" />
        <path d="M9 19h4l2.5-6 4 11 2.5-5H27" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="26.5" cy="11.5" r="2" fill="#10b981" />
      </svg>
    ),
  }),

  /* 33. Smart Manufacturing */
  "smart-manufacturing": lightTheme({
    key: "smart-manufacturing",
    cluster: "engineering-quality",
    badge: "Industry 4.0",
    description: "Industrial IoT sensors, robotic assembly lines, and smart factory automation.",
    pattern: "circuit",
    accent: "#0284c7",
    accentSecondary: "#f59e0b",
    tintStart: "#f0f9ff",
    tintEnd: "#fffbeb",
    iconBgStart: "#e0f2fe",
    iconBgEnd: "#fef3c7",
    borderRgb: "2, 132, 199",
    badgeBg: "rgba(2, 132, 199, 0.1)",
    badgeText: "#0369a1",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M8 29h20M12 29v-5h8v5" stroke="#0369a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 24l-3-9 7-5 5 4" stroke="#0284c7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="13" cy="15" r="2.5" fill="#f59e0b" />
        <circle cx="20" cy="10" r="2.5" fill="#f59e0b" />
        <path d="M25 12l3-2M25 16l3 2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 34. Software Development — Signature Dark Developer / IDE Theme */
  "software-development": darkTheme({
    key: "software-development",
    cluster: "tech-ai",
    badge: "Software Eng",
    description: "Full-stack web architecture, scalable APIs, cloud-native apps, and clean code.",
    pattern: "dots",
    accent: "#818cf8",
    accentSecondary: "#38bdf8",
    bgStart: "#11152c",
    bgEnd: "#1e1b4b",
    borderRgb: "129, 140, 248",
    iconBgStart: "rgba(129, 140, 248, 0.24)",
    iconBgEnd: "rgba(56, 189, 248, 0.18)",
    badgeBg: "rgba(129, 140, 248, 0.18)",
    badgeText: "#a5b4fc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="4.5" y="6.5" width="27" height="23" rx="4.5" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2.2" />
        <path d="M14 14.5L9.5 18.5 14 22.5M22 14.5l4.5 4-4.5 4" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.5 13l-3 11" stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 35. Software Testing */
  "software-testing": lightTheme({
    key: "software-testing",
    cluster: "tech-ai",
    badge: "QA Automation",
    description: "Automated E2E test suites, API validation, performance testing, and bug triage.",
    pattern: "circuit",
    accent: "#7c3aed",
    accentSecondary: "#10b981",
    tintStart: "#f5f3ff",
    tintEnd: "#ecfdf5",
    iconBgStart: "#ede9fe",
    iconBgEnd: "#d1fae5",
    borderRgb: "124, 58, 237",
    badgeBg: "rgba(124, 58, 237, 0.1)",
    badgeText: "#6d28d9",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="7" y="6" width="22" height="24" rx="4" fill="#7c3aed" fillOpacity="0.14" stroke="#7c3aed" strokeWidth="2.2" />
        <path d="M12 13l2 2 4-4" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22l2 2 4-4" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 13h4M21 22h4" stroke="#6d28d9" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 36. Supply Chain */
  "supply-chain": lightTheme({
    key: "supply-chain",
    cluster: "operations-legal",
    badge: "Global Logistics",
    description: "End-to-end supply networks, demand forecasting, freight routing, and inventory flow.",
    pattern: "waves",
    accent: "#0369a1",
    accentSecondary: "#ea580c",
    tintStart: "#f0f9ff",
    tintEnd: "#fff7ed",
    iconBgStart: "#e0f2fe",
    iconBgEnd: "#ffedd5",
    borderRgb: "3, 105, 161",
    badgeBg: "rgba(3, 105, 161, 0.1)",
    badgeText: "#075985",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="9" cy="11" r="3.5" fill="#0369a1" />
        <circle cx="27" cy="11" r="3.5" fill="#ea580c" />
        <circle cx="18" cy="26" r="3.5" fill="#0284c7" />
        <path d="M12.5 11h11M11 14l5.5 9M25 14l-5.5 9" stroke="#0369a1" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  /* 37. Sustainability */
  sustainability: lightTheme({
    key: "sustainability",
    cluster: "engineering-quality",
    badge: "ESG & Climate",
    description: "Corporate ESG reporting, circular economy strategy, and net-zero carbon initiatives.",
    pattern: "rings",
    accent: "#15803d",
    accentSecondary: "#0d9488",
    tintStart: "#f0fdf4",
    tintEnd: "#f0fdfa",
    iconBgStart: "#dcfce7",
    iconBgEnd: "#ccfbf1",
    borderRgb: "21, 128, 61",
    badgeBg: "rgba(21, 128, 61, 0.11)",
    badgeText: "#166534",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="10.5" fill="#15803d" fillOpacity="0.15" stroke="#15803d" strokeWidth="2.2" />
        <path d="M7.5 18h21M18 7.5c3 3 4.5 6.5 4.5 10.5S21 25.5 18 28.5M18 7.5c-3 3-4.5 6.5-4.5 10.5s1.5 7.5 4.5 10.5" stroke="#0d9488" strokeWidth="1.8" />
        <path d="M23 7c4 0 6 2.5 6 6-3.5 0-6-2-6-6z" fill="#22c55e" />
      </svg>
    ),
  }),

  /* 38. UX (UI/UX Design) */
  ux: lightTheme({
    key: "ux",
    cluster: "design-growth",
    badge: "UI/UX & Product",
    description: "User research, interactive wireframing, usability testing, and Figma design systems.",
    pattern: "dots",
    accent: "#c026d3",
    accentSecondary: "#6366f1",
    tintStart: "#fdf4ff",
    tintEnd: "#eef2ff",
    iconBgStart: "#fae8ff",
    iconBgEnd: "#e0e7ff",
    borderRgb: "192, 38, 211",
    badgeBg: "rgba(192, 38, 211, 0.1)",
    badgeText: "#a21caf",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="7" width="24" height="19" rx="3.5" fill="#c026d3" fillOpacity="0.14" stroke="#c026d3" strokeWidth="2.2" />
        <path d="M6 12.5h24" stroke="#c026d3" strokeWidth="2" />
        <rect x="10" y="16" width="7" height="6" rx="1.5" fill="#6366f1" />
        <path d="M22 20l7 2.5-3 1.5-1.5 3L22 20z" fill="#ec4899" stroke="#a21caf" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  }),

  /* 39. Warehouse Operations */
  "warehouse-operations": lightTheme({
    key: "warehouse-operations",
    cluster: "operations-legal",
    badge: "Fulfillment Ops",
    description: "Smart inventory management, fulfillment logistics, and warehouse automation.",
    pattern: "grid",
    accent: "#d97706",
    accentSecondary: "#334155",
    tintStart: "#fffbeb",
    tintEnd: "#f8fafc",
    iconBgStart: "#fef3c7",
    iconBgEnd: "#e2e8f0",
    borderRgb: "217, 119, 6",
    badgeBg: "rgba(217, 119, 6, 0.12)",
    badgeText: "#b45309",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M5 15L18 7l13 8v13H5V15z" fill="#d97706" fillOpacity="0.15" stroke="#d97706" strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="11" y="20" width="6" height="8" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="1.6" />
        <rect x="19" y="20" width="6" height="8" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="1.6" />
      </svg>
    ),
  }),

  /* Additional Presets for Education, Hospitality, Web/Mobile, etc. */
  education: lightTheme({
    key: "education",
    cluster: "operations-legal",
    badge: "Academic & EdTech",
    description: "Curriculum innovation, instructional design, and academic program leadership.",
    pattern: "rings",
    accent: "#4f46e5",
    accentSecondary: "#9333ea",
    tintStart: "#eef2ff",
    tintEnd: "#faf5ff",
    iconBgStart: "#e0e7ff",
    iconBgEnd: "#f3e8ff",
    borderRgb: "79, 70, 229",
    badgeBg: "rgba(79, 70, 229, 0.1)",
    badgeText: "#4338ca",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M18 7L4 14l14 7 14-7-14-7z" fill="#4f46e5" fillOpacity="0.2" stroke="#4f46e5" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M9 17v7c0 2.5 4 4.5 9 4.5s9-2 9-4.5v-7M30 15v9" stroke="#9333ea" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),

  hospitality: lightTheme({
    key: "hospitality",
    cluster: "operations-legal",
    badge: "Hospitality & Travel",
    description: "Guest experience management, destination operations, and luxury hospitality.",
    pattern: "waves",
    accent: "#ea580c",
    accentSecondary: "#eab308",
    tintStart: "#fff7ed",
    tintEnd: "#fefce8",
    iconBgStart: "#ffedd5",
    iconBgEnd: "#fef08a",
    borderRgb: "234, 88, 12",
    badgeBg: "rgba(234, 88, 12, 0.11)",
    badgeText: "#c2410c",
    icon: (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <path d="M7 25a11 11 0 0 1 22 0H7z" fill="#ea580c" fillOpacity="0.18" stroke="#ea580c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M5 25h26M15 11h6M18 11v3" stroke="#ca8a04" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  }),
};

/** Normalize slug or title for reliable lookup and keyword matching. */
function normalizeKey(value?: string): string {
  return (value ?? "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Resolves the category-specific visual identity for any Briticana domain.
 * Matches exact slug first, then normalized title, then semantic keywords so
 * newly added CMS domains automatically receive an appropriate theme and icon.
 */
export function getDomainVisualIdentity(
  slug?: string | null,
  title?: string | null,
): DomainVisualIdentity {
  const normSlug = normalizeKey(slug ?? "");
  const normTitle = normalizeKey(title ?? "");

  if (normSlug && DOMAIN_VISUAL_MAP[normSlug]) {
    return DOMAIN_VISUAL_MAP[normSlug];
  }
  if (normTitle && DOMAIN_VISUAL_MAP[normTitle]) {
    return DOMAIN_VISUAL_MAP[normTitle];
  }

  const combined = `${normSlug} ${normTitle}`;

  if (combined.includes("cyber") || combined.includes("security") || combined.includes("infosec")) {
    return DOMAIN_VISUAL_MAP["cybersecurity"];
  }
  if (combined.includes("graphic") || combined.includes("brand") || combined.includes("illustrat") || combined.includes("art")) {
    return DOMAIN_VISUAL_MAP["graphic-design"];
  }
  if (combined.includes("ux") || combined.includes("ui") || combined.includes("web-design") || combined.includes("interaction")) {
    return DOMAIN_VISUAL_MAP["ux"];
  }
  if (combined.includes("admin")) {
    return DOMAIN_VISUAL_MAP["administration"];
  }
  if (combined.includes("artificial") || combined.includes("ai-") || combined === "ai") {
    return DOMAIN_VISUAL_MAP["artificial-intelligence"];
  }
  if (combined.includes("machine-learning") || combined.includes("ml") || combined.includes("deep-learning")) {
    return DOMAIN_VISUAL_MAP["machine-learning"];
  }
  if (combined.includes("data") || combined.includes("analytics") || combined.includes("bi")) {
    return DOMAIN_VISUAL_MAP["data-analytics-operations"];
  }
  if (combined.includes("software-test") || combined.includes("qa-auto") || combined.includes("testing")) {
    return DOMAIN_VISUAL_MAP["software-testing"];
  }
  if (combined.includes("software") || combined.includes("develop") || combined.includes("coding") || combined.includes("mobile")) {
    return DOMAIN_VISUAL_MAP["software-development"];
  }
  if (combined.includes("site-reliability") || combined.includes("sre") || combined.includes("devops")) {
    return DOMAIN_VISUAL_MAP["site-reliability"];
  }
  if (combined.includes("infrastructure") || combined.includes("cloud")) {
    return DOMAIN_VISUAL_MAP["infrastructure-operations"];
  }
  if (combined.includes("it-operations") || combined.includes("it-and")) {
    return DOMAIN_VISUAL_MAP["it-operations"];
  }
  if (combined.includes("digital-transformation")) {
    return DOMAIN_VISUAL_MAP["digital-transformation"];
  }
  if (combined.includes("asset")) {
    return DOMAIN_VISUAL_MAP["asset-management"];
  }
  if (combined.includes("audit")) {
    return DOMAIN_VISUAL_MAP["audit"];
  }
  if (combined.includes("finance") || combined.includes("account") || combined.includes("banking")) {
    return DOMAIN_VISUAL_MAP["finance"];
  }
  if (combined.includes("business-analysis") || combined.includes("strategy")) {
    return DOMAIN_VISUAL_MAP["business-analysis"];
  }
  if (combined.includes("marketing") || combined.includes("sales") || combined.includes("growth")) {
    return DOMAIN_VISUAL_MAP["marketing"];
  }
  if (combined.includes("clinical")) {
    return DOMAIN_VISUAL_MAP["clinical"];
  }
  if (combined.includes("nurs") || combined.includes("health") || combined.includes("medical")) {
    return DOMAIN_VISUAL_MAP["nursing"];
  }
  if (combined.includes("pharma")) {
    return DOMAIN_VISUAL_MAP["pharmaceutical-quality"];
  }
  if (combined.includes("lab")) {
    return DOMAIN_VISUAL_MAP["laboratory-operations"];
  }
  if (combined.includes("food")) {
    return DOMAIN_VISUAL_MAP["food-quality"];
  }
  if (combined.includes("hr") || combined.includes("human-resource") || combined.includes("talent") || combined.includes("people")) {
    return DOMAIN_VISUAL_MAP["hr"];
  }
  if (combined.includes("legal") || combined.includes("law")) {
    return DOMAIN_VISUAL_MAP["legal"];
  }
  if (combined.includes("compliance") || combined.includes("governance")) {
    return DOMAIN_VISUAL_MAP["compliance"];
  }
  if (combined.includes("procurement") || combined.includes("sourc")) {
    return DOMAIN_VISUAL_MAP["procurement"];
  }
  if (combined.includes("product-management") || combined.includes("product")) {
    return DOMAIN_VISUAL_MAP["product-management"];
  }
  if (combined.includes("project-management") || combined.includes("project")) {
    return DOMAIN_VISUAL_MAP["project-management"];
  }
  if (combined.includes("supply-chain") || combined.includes("logistic")) {
    return DOMAIN_VISUAL_MAP["supply-chain"];
  }
  if (combined.includes("warehouse")) {
    return DOMAIN_VISUAL_MAP["warehouse-operations"];
  }
  if (combined.includes("mechanical")) {
    return DOMAIN_VISUAL_MAP["mechanical-quality"];
  }
  if (combined.includes("quality-assurance") || combined.includes("quality")) {
    return DOMAIN_VISUAL_MAP["quality-assurance"];
  }
  if (combined.includes("quantity-survey") || combined.includes("construction")) {
    return DOMAIN_VISUAL_MAP["quantity-surveying"];
  }
  if (combined.includes("renewable") || combined.includes("energy") || combined.includes("solar")) {
    return DOMAIN_VISUAL_MAP["renewable-energy"];
  }
  if (combined.includes("sustainab") || combined.includes("esg") || combined.includes("climate")) {
    return DOMAIN_VISUAL_MAP["sustainability"];
  }
  if (combined.includes("manufactur") || combined.includes("robot")) {
    return DOMAIN_VISUAL_MAP["smart-manufacturing"];
  }
  if (combined.includes("engineer")) {
    return DOMAIN_VISUAL_MAP["engineering"];
  }
  if (combined.includes("educat") || combined.includes("academ") || combined.includes("train")) {
    return DOMAIN_VISUAL_MAP["education"];
  }
  if (combined.includes("hospitality") || combined.includes("touris") || combined.includes("travel")) {
    return DOMAIN_VISUAL_MAP["hospitality"];
  }

  return DOMAIN_VISUAL_MAP["operations"];
}
