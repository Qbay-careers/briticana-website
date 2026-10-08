import {
  getDomainVisualIdentity,
  type DomainVisualIdentity,
} from "@/components/marketing/domainVisualConfig";
import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import type { EnrichedInternship } from "@/lib/internships/internshipContentApi";

export type QuickCategoryFilter =
  | "All"
  | "Business"
  | "Technology"
  | "Marketing"
  | "Design"
  | "Finance";

export const QUICK_CATEGORY_FILTERS: readonly QuickCategoryFilter[] = [
  "All",
  "Business",
  "Technology",
  "Marketing",
  "Design",
  "Finance",
];

/**
 * Fixes common UTF-8 mojibake sequences (such as "â€“" -> "–") and normalizes whitespace.
 */
export function sanitizeInternshipText(raw: string | undefined | null): string {
  if (!raw) return "";
  return raw
    .replace(/â€“/g, "–")
    .replace(/â€”/g, "—")
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\u009d|â€/g, '"')
    .replace(/Â/g, " ")
    .replace(/Documantation/gi, "Documentation")
    .replace(/\s+/g, " ")
    .trim();
}

export const BATCH_INTERVAL_DAYS = 10;
export const DEFAULT_BATCH_ANCHOR_DATE = "2026-10-10";

export type BatchScheduleStatus = "closed" | "closing-soon" | "open";

export interface ScheduledBatchItem {
  date: Date;
  status: BatchScheduleStatus;
  daysUntil: number;
}

const MONTH_NAMES_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const MS_PER_CALENDAR_DAY = 86_400_000;

/**
 * Normalizes a Date instance to local calendar midnight (00:00:00.000).
 */
export function startOfCalendarDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

/**
 * Calendar-safe date addition that preserves local calendar day across month, year,
 * leap-year boundaries, and Daylight Saving Time transitions.
 */
export function addCalendarDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 0, 0, 0, 0);
}

/**
 * Computes exact integer calendar day difference (target - base) using UTC date components
 * to avoid timezone or DST offset drift.
 */
export function diffCalendarDays(target: Date, base: Date): number {
  const targetUtc = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const baseUtc = Date.UTC(base.getFullYear(), base.getMonth(), base.getDate());
  return Math.round((targetUtc - baseUtc) / MS_PER_CALENDAR_DAY);
}

/**
 * Parses a date string into a calendar-safe local midnight Date without UTC-to-local shift.
 * Returns null if the input is empty, "TBC", or unparseable.
 */
export function parseCalendarDate(raw: string | undefined | null): Date | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.toUpperCase() === "TBC") return null;

  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:$|T|\s)/.exec(trimmed);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const monthIndex = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    const candidate = new Date(year, monthIndex, day, 0, 0, 0, 0);
    if (
      candidate.getFullYear() === year &&
      candidate.getMonth() === monthIndex &&
      candidate.getDate() === day
    ) {
      return candidate;
    }
    return null;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return startOfCalendarDay(parsed);
}

/**
 * Single source of truth for calculating the next valid internship batch date on a
 * continuous 10-day interval cycle:
 * - Uses `batchStartDate` as the anchor/base date if valid; otherwise uses `DEFAULT_BATCH_ANCHOR_DATE` ("2026-10-10").
 * - If the anchor date is in the future (> today), returns that anchor date.
 * - If the anchor date has arrived or passed (<= today), repeatedly adds 10 calendar days
 *   until `nextBatch > today`.
 */
export function getNextBatchDate(
  batchStartDate?: string | null,
  referenceToday: Date = new Date(),
): Date {
  const today = startOfCalendarDay(referenceToday);
  const anchor =
    parseCalendarDate(batchStartDate) ??
    parseCalendarDate(DEFAULT_BATCH_ANCHOR_DATE) ??
    new Date(2026, 9, 10, 0, 0, 0, 0);

  let nextBatch = startOfCalendarDay(anchor);
  while (diffCalendarDays(nextBatch, today) <= 0) {
    nextBatch = addCalendarDays(nextBatch, BATCH_INTERVAL_DAYS);
  }
  return nextBatch;
}

/**
 * Formats a calendar Date as "10 October 2026".
 */
export function formatBatchDateLong(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES_LONG[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Formats a calendar Date as "10 Oct" (day + short month).
 */
export function formatBatchDayMonthShort(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]}`;
}

/**
 * Evaluates batch status using calendar days:
 * - Past batch (< 0 days): "closed"
 * - Upcoming batch within 10 days (0..10 days): "closing-soon"
 * - Future batch more than 10 days away (> 10 days): "open"
 */
export function getBatchScheduleStatus(
  batchDate: Date,
  referenceToday: Date = new Date(),
): BatchScheduleStatus {
  const today = startOfCalendarDay(referenceToday);
  const target = startOfCalendarDay(batchDate);
  const daysUntil = diffCalendarDays(target, today);
  if (daysUntil < 0) return "closed";
  if (daysUntil <= BATCH_INTERVAL_DAYS) return "closing-soon";
  return "open";
}

/**
 * Generates the continuous 10-day batch sequence for the StartDateSelector component.
 * Example sequence from anchor 10 Oct 2026:
 * 10 Oct -> 20 Oct -> 30 Oct -> 9 Nov -> 19 Nov -> 29 Nov -> 9 Dec
 */
export function buildTenDayBatchSchedule(
  batchStartDate?: string | null,
  referenceToday: Date = new Date(),
  count = 7,
): ScheduledBatchItem[] {
  const today = startOfCalendarDay(referenceToday);
  const anchor =
    parseCalendarDate(batchStartDate) ??
    parseCalendarDate(DEFAULT_BATCH_ANCHOR_DATE) ??
    new Date(2026, 9, 10, 0, 0, 0, 0);
  const nextBatch = getNextBatchDate(batchStartDate, today);

  const previousBatch = addCalendarDays(nextBatch, -BATCH_INTERVAL_DAYS);
  const firstBatch =
    diffCalendarDays(previousBatch, anchor) >= 0 && diffCalendarDays(previousBatch, today) < 0
      ? previousBatch
      : nextBatch;

  return Array.from({ length: count }, (_, idx) => {
    const date = addCalendarDays(firstBatch, idx * BATCH_INTERVAL_DAYS);
    const daysUntil = diffCalendarDays(date, today);
    const status = getBatchScheduleStatus(date, today);
    return { date, status, daysUntil };
  });
}

export function formatInternshipBatchDate(
  batchStartDate: string | undefined | null,
  referenceToday: Date = new Date(),
): string {
  const nextBatch = getNextBatchDate(batchStartDate, referenceToday);
  return formatBatchDateLong(nextBatch);
}

export interface ClarifiedInternshipInfo {
  /** Clean category title shown at the top of the card (e.g., "Strategy & Business Analysis") */
  categoryDisplay: string;
  /** Quick filter bucket for the 6-button filter bar */
  quickFilter: Exclude<QuickCategoryFilter, "All">;
  /** Clean, readable role title without verbose boilerplate prefixes */
  cleanTitle: string;
  /** Optional specialization focus extracted from the title */
  specialization?: string;
  /** Plain-English 1-sentence explanation of what the role actually involves */
  plainExplanation: string;
  /** Up to 4 clear, human-friendly skills for "What you'll learn" */
  learnSkills: string[];
  /** Formatted duration string (e.g. "3 Months" or "3 / 6 / 9 Months") */
  durationLabel: string;
  /** Formatted next batch start date (e.g. "May 1, 2026" or "TBC") */
  nextBatchLabel: string;
  /** Formatted location/mode string (e.g. "London / Europe • Remote") */
  locationLabel: string;
  /** Formatted level string (e.g. "Beginner Friendly") */
  levelLabel: string;
  /** Visual identity (SVG icon, colors, badge) from domainVisualConfig */
  visual: DomainVisualIdentity;
}

interface RolePreset {
  categoryDisplay: string;
  quickFilter: Exclude<QuickCategoryFilter, "All">;
  plainExplanation: string;
  defaultSkills: string[];
}

const ROLE_PRESETS_BY_KEY: Record<string, RolePreset> = {
  "business-analysis": {
    categoryDisplay: "Strategy & Business Analysis",
    quickFilter: "Business",
    plainExplanation:
      "Understand businesses, analyse problems and help companies make better decisions.",
    defaultSkills: [
      "Business research",
      "Data analysis",
      "Problem solving",
      "Strategy planning",
    ],
  },
  "software-development": {
    categoryDisplay: "Software Development",
    quickFilter: "Technology",
    plainExplanation:
      "Build websites and applications while learning how real software teams work.",
    defaultSkills: ["Programming", "Web development", "APIs & backend", "Git & teamwork"],
  },
  "software-testing": {
    categoryDisplay: "QA & Software Testing",
    quickFilter: "Technology",
    plainExplanation:
      "Test digital products, automate quality checks and ensure software launches without bugs.",
    defaultSkills: ["Test automation", "Bug tracking", "Quality assurance", "Release testing"],
  },
  "artificial-intelligence": {
    categoryDisplay: "AI & Intelligent Systems",
    quickFilter: "Technology",
    plainExplanation:
      "Build practical AI workflows, prompt pipelines and smart automation tools for modern teams.",
    defaultSkills: ["Prompt engineering", "AI workflows", "Model evaluation", "Automation"],
  },
  "machine-learning": {
    categoryDisplay: "Machine Learning & AI",
    quickFilter: "Technology",
    plainExplanation:
      "Train predictive models, analyse patterns in data and deploy practical machine learning solutions.",
    defaultSkills: ["Predictive modeling", "Python & data", "Model training", "ML workflows"],
  },
  "data-analytics-operations": {
    categoryDisplay: "Data Analytics & BI",
    quickFilter: "Technology",
    plainExplanation:
      "Turn raw numbers into clear dashboards and actionable insights that guide business growth.",
    defaultSkills: ["Data visualization", "SQL & spreadsheets", "BI dashboards", "Data storytelling"],
  },
  cybersecurity: {
    categoryDisplay: "Cybersecurity & Defense",
    quickFilter: "Technology",
    plainExplanation:
      "Protect digital systems, identify security vulnerabilities and learn how modern security teams defend networks.",
    defaultSkills: [
      "Vulnerability testing",
      "Threat analysis",
      "Security auditing",
      "Incident response",
    ],
  },
  "digital-transformation": {
    categoryDisplay: "Digital Transformation",
    quickFilter: "Technology",
    plainExplanation:
      "Help organizations modernize legacy workflows using cloud platforms and digital tools.",
    defaultSkills: ["Cloud adoption", "Process automation", "Digital strategy", "Change management"],
  },
  "infrastructure-operations": {
    categoryDisplay: "Cloud & Infrastructure",
    quickFilter: "Technology",
    plainExplanation:
      "Manage cloud servers, network reliability and the core infrastructure that powers modern apps.",
    defaultSkills: ["Cloud systems", "Server operations", "Network reliability", "Monitoring"],
  },
  "it-operations": {
    categoryDisplay: "IT Systems & Operations",
    quickFilter: "Technology",
    plainExplanation:
      "Keep company technology running smoothly through systems administration and IT service workflows.",
    defaultSkills: ["IT service management", "System diagnostics", "Tech operations", "Team support"],
  },
  "site-reliability": {
    categoryDisplay: "Site Reliability & DevOps",
    quickFilter: "Technology",
    plainExplanation:
      "Keep web platforms fast, reliable and online using cloud monitoring and automation.",
    defaultSkills: ["Cloud reliability", "Uptime monitoring", "CI/CD pipelines", "Incident response"],
  },
  "product-management": {
    categoryDisplay: "Product Management",
    quickFilter: "Business",
    plainExplanation:
      "Guide digital products from initial idea to launch by connecting user needs with engineering teams.",
    defaultSkills: ["Product roadmaps", "User research", "Agile sprints", "Feature planning"],
  },
  "project-management": {
    categoryDisplay: "Project Management",
    quickFilter: "Business",
    plainExplanation:
      "Coordinate teams, manage timelines and deliver real startup projects from kickoff to completion.",
    defaultSkills: ["Agile & Scrum", "Sprint planning", "Stakeholder updates", "Risk tracking"],
  },
  administration: {
    categoryDisplay: "Business Administration",
    quickFilter: "Business",
    plainExplanation:
      "Organize business operations, coordinate workflows and keep growing teams running efficiently.",
    defaultSkills: ["CRM management", "Process tracking", "Executive coordination", "Documentation"],
  },
  operations: {
    categoryDisplay: "Business Operations",
    quickFilter: "Business",
    plainExplanation:
      "Streamline day-to-day company execution, optimize processes and help startups scale smoothly.",
    defaultSkills: ["Workflow design", "Operations KPIs", "Cross-team execution", "Process improvement"],
  },
  hr: {
    categoryDisplay: "Human Resources (HR)",
    quickFilter: "Business",
    plainExplanation:
      "Help companies recruit great talent, onboard new team members and build a strong workplace culture.",
    defaultSkills: ["Talent recruitment", "People operations", "Onboarding workflows", "Team culture"],
  },
  legal: {
    categoryDisplay: "Legal & Corporate Advisory",
    quickFilter: "Business",
    plainExplanation:
      "Review commercial contracts, research regulations and support businesses with practical legal documentation.",
    defaultSkills: ["Contract review", "Legal research", "Corporate governance", "Compliance docs"],
  },
  compliance: {
    categoryDisplay: "Risk & Compliance",
    quickFilter: "Finance",
    plainExplanation:
      "Ensure businesses follow industry regulations, prevent financial risk and maintain governance standards.",
    defaultSkills: ["Regulatory review", "Risk monitoring", "Policy analysis", "Audit readiness"],
  },
  finance: {
    categoryDisplay: "Finance & Accounting",
    quickFilter: "Finance",
    plainExplanation:
      "Analyse financial performance, build budgets and support smart investment and business decisions.",
    defaultSkills: ["Financial modeling", "Budgeting & FP&A", "Market research", "Financial reporting"],
  },
  "asset-management": {
    categoryDisplay: "Asset & Portfolio Management",
    quickFilter: "Finance",
    plainExplanation:
      "Track investment portfolios, evaluate asset performance and support capital allocation decisions.",
    defaultSkills: ["Portfolio analysis", "Asset tracking", "Risk assessment", "Performance reporting"],
  },
  audit: {
    categoryDisplay: "Audit & Financial Assurance",
    quickFilter: "Finance",
    plainExplanation:
      "Verify financial records, test internal controls and help organizations maintain transparent reporting.",
    defaultSkills: ["Audit analytics", "Control testing", "Risk assessment", "Data validation"],
  },
  procurement: {
    categoryDisplay: "Procurement & Sourcing",
    quickFilter: "Business",
    plainExplanation:
      "Manage supplier relationships, evaluate vendor contracts and optimize purchasing strategies.",
    defaultSkills: ["Strategic sourcing", "Vendor evaluation", "Cost analysis", "Supply contracts"],
  },
  "supply-chain": {
    categoryDisplay: "Supply Chain & Logistics",
    quickFilter: "Business",
    plainExplanation:
      "Coordinate how products move from suppliers to customers through smart logistics and inventory planning.",
    defaultSkills: ["Supply chain planning", "Inventory flow", "Logistics analysis", "Operations coordination"],
  },
  "warehouse-operations": {
    categoryDisplay: "Fulfillment & Logistics Ops",
    quickFilter: "Business",
    plainExplanation:
      "Optimize inventory systems, fulfillment workflows and modern distribution operations.",
    defaultSkills: ["Inventory control", "Fulfillment workflows", "Operations tracking", "Safety standards"],
  },
  marketing: {
    categoryDisplay: "Digital Marketing & Growth",
    quickFilter: "Marketing",
    plainExplanation:
      "Plan digital campaigns, grow brand awareness and learn how startups attract and engage customers.",
    defaultSkills: ["Campaign strategy", "Content marketing", "Audience analytics", "Brand growth"],
  },
  "graphic-design": {
    categoryDisplay: "Graphic & Brand Design",
    quickFilter: "Design",
    plainExplanation:
      "Create compelling visual identities, digital graphics and brand assets for modern companies.",
    defaultSkills: ["Visual branding", "Digital illustration", "Typography & layout", "Creative systems"],
  },
  ux: {
    categoryDisplay: "UI/UX & Product Design",
    quickFilter: "Design",
    plainExplanation:
      "Design intuitive websites and mobile apps through user research, wireframing and interactive prototypes.",
    defaultSkills: ["User research", "Wireframing", "UI design systems", "Interactive prototyping"],
  },
  clinical: {
    categoryDisplay: "Clinical & Life Sciences",
    quickFilter: "Business",
    plainExplanation:
      "Work on clinical research documentation, regulatory protocols and healthcare data evaluation.",
    defaultSkills: [
      "Clinical documentation",
      "Regulatory review",
      "Research analysis",
      "Data interpretation",
    ],
  },
  nursing: {
    categoryDisplay: "Healthcare & Patient Care",
    quickFilter: "Business",
    plainExplanation:
      "Support clinical care workflows, patient monitoring standards and healthcare quality initiatives.",
    defaultSkills: ["Patient care protocols", "Clinical coordination", "Health documentation", "Quality standards"],
  },
  "pharmaceutical-quality": {
    categoryDisplay: "Pharmaceutical Quality (GMP)",
    quickFilter: "Business",
    plainExplanation:
      "Learn how pharmaceutical teams ensure product safety, GMP compliance and batch quality standards.",
    defaultSkills: ["GMP compliance", "Quality documentation", "Batch validation", "Regulatory standards"],
  },
  "laboratory-operations": {
    categoryDisplay: "Laboratory & R&D Operations",
    quickFilter: "Technology",
    plainExplanation:
      "Practice structured scientific testing workflows, sample tracking and laboratory quality governance.",
    defaultSkills: ["Lab workflows", "Sample documentation", "Quality assurance", "Data recording"],
  },
  "food-quality": {
    categoryDisplay: "Food Safety & Quality",
    quickFilter: "Business",
    plainExplanation:
      "Apply food safety standards, HACCP quality checks and nutritional compliance in real project scenarios.",
    defaultSkills: ["HACCP standards", "Food safety audits", "Quality testing", "Compliance reporting"],
  },
  engineering: {
    categoryDisplay: "Engineering & Systems",
    quickFilter: "Technology",
    plainExplanation:
      "Design technical systems, solve engineering challenges and apply structured project methodologies.",
    defaultSkills: ["Systems design", "Technical documentation", "Engineering analysis", "Project execution"],
  },
  "mechanical-quality": {
    categoryDisplay: "Mechanical & Quality Engineering",
    quickFilter: "Technology",
    plainExplanation:
      "Inspect mechanical systems, verify manufacturing tolerances and apply ISO quality standards.",
    defaultSkills: ["Quality inspection", "ISO standards", "Root-cause analysis", "Technical reporting"],
  },
  "quality-assurance": {
    categoryDisplay: "Quality Assurance & Standards",
    quickFilter: "Business",
    plainExplanation:
      "Build quality management workflows that prevent defects and ensure consistent product excellence.",
    defaultSkills: ["Quality frameworks", "Process auditing", "Defect prevention", "Continuous improvement"],
  },
  "quantity-surveying": {
    categoryDisplay: "Quantity Surveying & Costing",
    quickFilter: "Finance",
    plainExplanation:
      "Estimate project costs, manage construction budgets and evaluate commercial contracts.",
    defaultSkills: ["Cost estimation", "Project budgeting", "Contract valuation", "Quantity takeoffs"],
  },
  "renewable-energy": {
    categoryDisplay: "Renewable Energy & CleanTech",
    quickFilter: "Technology",
    plainExplanation:
      "Explore solar, wind and clean energy project planning for a sustainable energy transition.",
    defaultSkills: ["Clean energy systems", "Sustainability analysis", "Grid planning", "Project evaluation"],
  },
  "smart-manufacturing": {
    categoryDisplay: "Smart Manufacturing (Industry 4.0)",
    quickFilter: "Technology",
    plainExplanation:
      "Combine automation, IoT data and lean production methods to modernize manufacturing workflows.",
    defaultSkills: ["Process automation", "Lean production", "IoT telemetry", "Operational efficiency"],
  },
  sustainability: {
    categoryDisplay: "Sustainability & ESG",
    quickFilter: "Business",
    plainExplanation:
      "Help organizations measure environmental impact, reduce carbon footprints and build ESG strategies.",
    defaultSkills: ["ESG reporting", "Carbon analysis", "Circular economy", "Sustainability strategy"],
  },
};

/**
 * Strips verbose boilerplate prefixes/suffixes from raw CMS titles so the role is immediately clear.
 */
function cleanRoleTitle(rawTitle: string, fallbackCategory: string): {
  cleanTitle: string;
  specialization?: string;
} {
  let t = sanitizeInternshipText(rawTitle);
  if (!t) {
    return { cleanTitle: fallbackCategory };
  }

  // Remove repetitive "Advanced 90-Day Remote Internship Program" prefix
  t = t
    .replace(/^Advanced\s+90-Day\s+Remote\s+Internship\s+Program\s*[–—-]?\s*/i, "")
    .replace(/\bRemote\s+Internship\s+Program\b/gi, "")
    .replace(/\s+Internship$/i, "")
    .trim();

  // Split on dash if present
  const dashParts = t.split(/\s+[–—-]\s+/);
  if (dashParts.length > 1) {
    const main = dashParts[0].replace(/\s+Internship$/i, "").trim();
    const spec = dashParts.slice(1).join(" • ").trim();
    return {
      cleanTitle: main || fallbackCategory,
      specialization: spec || undefined,
    };
  }

  // If title is very long with commas/ampersands, keep it clean and readable
  if (t.length > 68 && t.includes(",")) {
    const parts = t.split(",").map((p) => p.trim());
    const main = parts[0];
    const rest = parts.slice(1).join(" • ");
    return {
      cleanTitle: main,
      specialization: rest || undefined,
    };
  }

  return { cleanTitle: t };
}

/**
 * Checks if an overview string is one of the robotic auto-generated seed templates
 * that merely repeats the title in lowercase.
 */
function isRoboticSeedOverview(overview: string): boolean {
  const lower = overview.toLowerCase();
  return (
    lower.startsWith("during this remote internship you spend time on applied tasks linked to") ||
    lower.startsWith("remote internship where you spend time on applied tasks linked to") ||
    lower.startsWith("in this remote internship you work on step by step assignments related to") ||
    lower.startsWith("remote internship where you work on step by step assignments related to") ||
    lower.startsWith("this remote internship gives you a close view of how") ||
    lower.startsWith("remote internship giving a close view of how") ||
    lower.startsWith("remote internship focused on practical work around") ||
    lower.startsWith("remote internship built around realistic project scenarios in")
  );
}

export function clarifyInternshipForCard(
  internship: EnrichedInternship,
  defaultDurationLabel?: string,
): ClarifiedInternshipInfo {
  const domainSlug = internship.domain?.slug?.current?.trim() || "";
  const rawDomainTitle = internshipDomainLabel(internship.domain ?? undefined);
  const visual = getDomainVisualIdentity(domainSlug, rawDomainTitle || internship.title);
  const preset =
    ROLE_PRESETS_BY_KEY[visual.key] ?? ROLE_PRESETS_BY_KEY["business-analysis"];

  const { cleanTitle, specialization } = cleanRoleTitle(
    internship.title,
    preset.categoryDisplay,
  );

  // Determine plain-English explanation:
  // If the admin wrote a custom non-robotic overview, use it; otherwise use our crystal-clear explanation.
  const sanitizedOverview = sanitizeInternshipText(internship.overview);
  const plainExplanation =
    sanitizedOverview && !isRoboticSeedOverview(sanitizedOverview) && sanitizedOverview.length <= 155
      ? sanitizedOverview
      : preset.plainExplanation;

  // Skills ("What you'll learn")
  const rawSkills = (internship.skillsCovered ?? [])
    .map((s) => sanitizeInternshipText(s))
    .filter(Boolean);
  const isGenericSeedSkills =
    rawSkills.length >= 3 &&
    rawSkills[0]?.toLowerCase() === "data analysis" &&
    rawSkills[1]?.toLowerCase() === "documentation" &&
    rawSkills[2]?.toLowerCase() === "process improvement";
  const learnSkills =
    rawSkills.length > 0 && !isGenericSeedSkills
      ? rawSkills.slice(0, 4)
      : preset.defaultSkills.slice(0, 4);

  // Duration label
  let durationLabel = "3 Months";
  if (internship.durationOptions?.length) {
    if (internship.durationOptions.length === 1) {
      durationLabel = sanitizeInternshipText(internship.durationOptions[0]);
    } else {
      durationLabel = "3 / 6 / 9 Months";
    }
  } else if (defaultDurationLabel?.trim()) {
    durationLabel = sanitizeInternshipText(defaultDurationLabel);
  }

  // Location label
  let locationLabel = "London / Remote / Hybrid";
  if (internship.availableRegions?.length) {
    const regions = internship.availableRegions;
    if (regions.includes("United Kingdom") || regions.includes("Ireland")) {
      locationLabel = "London • UK & Europe (Remote / Hybrid)";
    } else {
      locationLabel = `${regions.slice(0, 2).join(", ")} • Remote / Hybrid`;
    }
  }

  return {
    categoryDisplay: preset.categoryDisplay,
    quickFilter: preset.quickFilter,
    cleanTitle,
    specialization,
    plainExplanation,
    learnSkills,
    durationLabel,
    nextBatchLabel: formatInternshipBatchDate(internship.batchStartDate),
    locationLabel,
    levelLabel: "Beginner Friendly",
    visual,
  };
}
