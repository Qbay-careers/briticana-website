/** Static demo content for the student dashboard (no API, no Sanity). */

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
