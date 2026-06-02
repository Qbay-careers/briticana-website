/** Static demo content for the student portal (no API, no Sanity, no persistence). */

export const demoStudentProfile = {
  name: "Aisha Khan",
  firstName: "Aisha",
  email: "aisha.khan@student.briticana.com",
  avatar: "/edumove/images/user2.jpg",
  program: "Frontend Web Development",
  batch: "Autumn 2026",
  region: "United Kingdom",
  duration: "6 months",
  certificateStatus: "In progress",
} as const;

export const demoQuickStats = [
  { id: "batch", label: "Current batch", value: "Autumn 2026", icon: "ri-calendar-line" },
  { id: "region", label: "Region", value: "United Kingdom", icon: "ri-map-pin-line" },
  { id: "duration", label: "Duration", value: "6 months", icon: "ri-time-line" },
  { id: "certificate", label: "Certificate", value: "In progress", icon: "ri-medal-line" },
] as const;

export const demoMilestones = [
  { id: "kickoff", title: "Kickoff & onboarding", done: true },
  { id: "mid", title: "Mid-batch mentor review", done: true },
  { id: "final", title: "Final demo & submission window", done: false },
  { id: "cert", title: "Certificate issuance", done: false },
] as const;

export const demoSubmissionCopy = {
  title: "Final deliverables",
  description:
    "Per PRD: project files, documentation, presentation (PPT/PDF), self-introduction video, and project explanation video. This demo UI does not upload or persist anything.",
  lockedHint:
    "Submission unlocks in the final phase of your selected duration (demo: locked until milestone “Final demo” is complete).",
} as const;

export const demoDeliverables = [
  { id: "project-files", label: "Project files (source code)", icon: "ri-folder-3-line" },
  { id: "documentation", label: "Documentation", icon: "ri-file-list-3-line" },
  { id: "presentation", label: "Presentation (PPT / PDF)", icon: "ri-slideshow-2-line" },
  { id: "intro-video", label: "Self-introduction video", icon: "ri-video-line" },
  { id: "explainer-video", label: "Project explanation video", icon: "ri-movie-2-line" },
] as const;

/** Completion ratio (0–100) derived from demo milestones. */
export const demoProgressPercent = Math.round(
  (demoMilestones.filter((m) => m.done).length / demoMilestones.length) * 100,
);
