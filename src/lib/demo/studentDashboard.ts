/** Sample student portal data for stakeholder walkthroughs (no backend). */

export type DashboardProfileId = "started" | "midway" | "open" | "completed";

export type DemoDeliverable = {
  id: string;
  label: string;
  icon: string;
  /** When true, show as already submitted (final/certificate stages). */
  submitted?: boolean;
};

export type DemoMilestone = { id: string; title: string; done: boolean };

export type SubmissionPhase = "locked" | "open" | "certificate_ready";

export type StudentProfile = {
  name: string;
  firstName: string;
  email: string;
  avatar: string;
  program: string;
  batch: string;
  region: string;
  duration: string;
  certificateStatus: string;
};

export type QuickStat = { id: string; label: string; value: string; icon: string };

export type SubmissionInfo = {
  title: string;
  description: string;
  /** Shown when uploads are locked. */
  lockedHint?: string;
  phase: SubmissionPhase;
  /** Issued date shown on the certificate (certificate_ready). */
  certificateIssuedDate?: string;
  certificateButtonLabel?: string;
};

export type DashboardProfile = {
  id: DashboardProfileId;
  /** Short label for the login hint / switcher. */
  switcherLabel: string;
  profile: StudentProfile;
  quickStats: readonly QuickStat[];
  milestones: readonly DemoMilestone[];
  deliverables: readonly DemoDeliverable[];
  submission: SubmissionInfo;
};

/** Shared Google Slides certificate (preview mode for safe embedding). */
export const CERTIFICATE_PRESENTATION_PREVIEW =
  "https://docs.google.com/presentation/d/1qPeVqeFeFbB4FVILCw6k9_MyaYL8TnKWf4nfsey97Po/preview";
export const CERTIFICATE_PRESENTATION_EXTERNAL =
  "https://docs.google.com/presentation/d/1qPeVqeFeFbB4FVILCw6k9_MyaYL8TnKWf4nfsey97Po/edit";

const DELIVERABLES_BASE: readonly DemoDeliverable[] = [
  { id: "project-files", label: "Project files (source code)", icon: "ri-folder-3-line" },
  { id: "documentation", label: "Documentation", icon: "ri-file-list-3-line" },
  { id: "presentation", label: "Presentation (PPT / PDF)", icon: "ri-slideshow-2-line" },
  { id: "intro-video", label: "Self-introduction video", icon: "ri-video-line" },
  { id: "explainer-video", label: "Project explanation video", icon: "ri-movie-2-line" },
] as const;

export const DASHBOARD_PROFILE_ORDER: readonly DashboardProfileId[] = [
  "started",
  "midway",
  "open",
  "completed",
] as const;

const PROFILES: Record<DashboardProfileId, DashboardProfile> = {
  started: {
    id: "started",
    switcherLabel: "Leo - just started",
    profile: {
      name: "Leo Martins",
      firstName: "Leo",
      email: "leo.martins@student.briticana.com",
      avatar: "/edumove/images/user1.jpg",
      program: "Strategic Business Analyst - Supply Chain",
      batch: "Summer 2026",
      region: "Ireland",
      duration: "6 months",
      certificateStatus: "In progress",
    },
    quickStats: [
      { id: "batch", label: "Current batch", value: "Summer 2026", icon: "ri-calendar-line" },
      { id: "region", label: "Region", value: "Ireland", icon: "ri-map-pin-line" },
      { id: "duration", label: "Duration", value: "6 months", icon: "ri-time-line" },
      { id: "verification", label: "Verification code", value: "Not issued yet", icon: "ri-shield-check-line" },
    ],
    milestones: [
      { id: "kickoff", title: "Kickoff & onboarding", done: true },
      { id: "mid", title: "Mid-batch mentor review", done: false },
      { id: "final", title: "Final demo & submission window", done: false },
      { id: "cert", title: "Certificate issuance", done: false },
    ],
    deliverables: DELIVERABLES_BASE.map((d) => ({ ...d })),
    submission: {
      title: "Final deliverables",
      description:
        "When your program reaches the final phase, you will upload project files, documentation, presentation (PPT or PDF), self-introduction video, and project explanation video for mentor review.",
      lockedHint:
        "Uploads unlock after you complete onboarding and reach the final submission window for your cohort.",
      phase: "locked",
    },
  },
  midway: {
    id: "midway",
    switcherLabel: "Aisha - mid program",
    profile: {
      name: "Aisha Khan",
      firstName: "Aisha",
      email: "aisha.khan@student.briticana.com",
      avatar: "/edumove/images/user2.jpg",
      program: "Frontend Web Development",
      batch: "Autumn 2026",
      region: "United Kingdom",
      duration: "6 months",
      certificateStatus: "In progress",
    },
    quickStats: [
      { id: "batch", label: "Current batch", value: "Autumn 2026", icon: "ri-calendar-line" },
      { id: "region", label: "Region", value: "United Kingdom", icon: "ri-map-pin-line" },
      { id: "duration", label: "Duration", value: "6 months", icon: "ri-time-line" },
      { id: "verification", label: "Verification code", value: "Not issued yet", icon: "ri-shield-check-line" },
    ],
    milestones: [
      { id: "kickoff", title: "Kickoff & onboarding", done: true },
      { id: "mid", title: "Mid-batch mentor review", done: true },
      { id: "final", title: "Final demo & submission window", done: false },
      { id: "cert", title: "Certificate issuance", done: false },
    ],
    deliverables: DELIVERABLES_BASE.map((d) => ({ ...d })),
    submission: {
      title: "Final deliverables",
      description:
        "Prepare project files, documentation, presentation (PPT or PDF), self-introduction video, and project explanation video. Your mentor will review everything before your certificate is issued.",
      lockedHint:
        "Uploads open once you complete the final demo milestone and your cohort enters the submission window.",
      phase: "locked",
    },
  },
  open: {
    id: "open",
    switcherLabel: "Marco - submission open",
    profile: {
      name: "Marco Rossi",
      firstName: "Marco",
      email: "marco.rossi@student.briticana.com",
      avatar: "/edumove/images/user4.jpg",
      program: "Cloud & DevOps Engineering",
      batch: "Winter 2026",
      region: "Finland",
      duration: "9 months",
      certificateStatus: "Awaiting submission",
    },
    quickStats: [
      { id: "batch", label: "Current batch", value: "Winter 2026", icon: "ri-calendar-line" },
      { id: "region", label: "Region", value: "Finland", icon: "ri-map-pin-line" },
      { id: "duration", label: "Duration", value: "9 months", icon: "ri-time-line" },
      { id: "verification", label: "Verification code", value: "Pending issuance", icon: "ri-shield-check-line" },
    ],
    milestones: [
      { id: "kickoff", title: "Kickoff & onboarding", done: true },
      { id: "mid", title: "Mid-batch mentor review", done: true },
      { id: "final", title: "Final demo & submission window", done: true },
      { id: "cert", title: "Certificate issuance", done: false },
    ],
    deliverables: DELIVERABLES_BASE.map((d) => ({ ...d })),
    submission: {
      title: "Final deliverables",
      description:
        "Your submission window is open. Upload your project files, documentation, presentation (PPT or PDF), self-introduction video, and project explanation video, then submit for mentor review.",
      phase: "open",
    },
  },
  completed: {
    id: "completed",
    switcherLabel: "Priya - program complete",
    profile: {
      name: "Priya Nair",
      firstName: "Priya",
      email: "priya.nair@student.briticana.com",
      avatar: "/edumove/images/user3.jpg",
      program: "Data Analysis & Business Intelligence",
      batch: "Spring 2026",
      region: "Germany",
      duration: "3 months",
      certificateStatus: "Issued",
    },
    quickStats: [
      { id: "batch", label: "Completed batch", value: "Spring 2026", icon: "ri-calendar-line" },
      { id: "region", label: "Region", value: "Germany", icon: "ri-map-pin-line" },
      { id: "duration", label: "Duration", value: "3 months", icon: "ri-time-line" },
      { id: "verification", label: "Verification code", value: "BRT-2026-884", icon: "ri-shield-check-line" },
    ],
    milestones: [
      { id: "kickoff", title: "Kickoff & onboarding", done: true },
      { id: "mid", title: "Mid-batch mentor review", done: true },
      { id: "final", title: "Final demo & submission window", done: true },
      { id: "cert", title: "Certificate issuance", done: true },
    ],
    deliverables: DELIVERABLES_BASE.map((d) => ({ ...d, submitted: true })),
    submission: {
      title: "Final deliverables",
      description:
        "Your final package was reviewed and approved. Your experience certificate is ready - open it to view or present to employers.",
      phase: "certificate_ready",
      certificateIssuedDate: "June 5, 2026",
      certificateButtonLabel: "View certificate",
    },
  },
};

export const DEFAULT_DASHBOARD_PROFILE_ID: DashboardProfileId = "midway";

export function isDashboardProfileId(value: string | undefined | null): value is DashboardProfileId {
  return value === "started" || value === "midway" || value === "open" || value === "completed";
}

export function getDashboardProfile(id: string | undefined | null): DashboardProfile {
  if (isDashboardProfileId(id)) return PROFILES[id];
  return PROFILES[DEFAULT_DASHBOARD_PROFILE_ID];
}

export function progressPercentFromMilestones(milestones: readonly DemoMilestone[]): number {
  if (milestones.length === 0) return 0;
  return Math.round((milestones.filter((m) => m.done).length / milestones.length) * 100);
}
