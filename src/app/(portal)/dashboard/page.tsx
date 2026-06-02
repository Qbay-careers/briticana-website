import type { Metadata } from "next";

import DashboardShell from "@/components/dashboard/DashboardShell";
import ProgressTracker from "@/components/dashboard/ProgressTracker";
import SubmissionPanel from "@/components/dashboard/SubmissionPanel";

export const metadata: Metadata = {
  title: "Student dashboard",
  description: "Demo student portal — milestones and submissions preview (no accounts or API).",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <ProgressTracker />
      <SubmissionPanel />
    </DashboardShell>
  );
}
