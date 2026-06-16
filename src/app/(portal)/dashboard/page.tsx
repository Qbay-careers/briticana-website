import type { Metadata } from "next";
import { cookies } from "next/headers";

import DashboardShell from "@/components/dashboard/DashboardShell";
import ProgressTracker from "@/components/dashboard/ProgressTracker";
import SubmissionPanel from "@/components/dashboard/SubmissionPanel";
import { getDashboardProfile, progressPercentFromMilestones } from "@/lib/demo/studentDashboard";

const DEMO_AUTH_COOKIE = "briticana_demo_auth";

export const metadata: Metadata = {
  title: "Student dashboard",
  description: "Track internship milestones, mentor reviews, and weekly submissions.",
};

export default function DashboardPage() {
  const token = cookies().get(DEMO_AUTH_COOKIE)?.value;
  const data = getDashboardProfile(token);
  const percent = progressPercentFromMilestones(data.milestones);

  return (
    <DashboardShell profile={data.profile} quickStats={data.quickStats}>
      <ProgressTracker milestones={data.milestones} percent={percent} />
      <SubmissionPanel submission={data.submission} deliverables={data.deliverables} />
    </DashboardShell>
  );
}
