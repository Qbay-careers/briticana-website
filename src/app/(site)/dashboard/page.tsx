// TODO: build Student dashboard (demo UI only)
import DashboardShell from "@/components/dashboard/DashboardShell";
import ProgressTracker from "@/components/dashboard/ProgressTracker";
import SubmissionPanel from "@/components/dashboard/SubmissionPanel";

export default function DashboardPage() {
  return (
    <div className="py-4 bg-body-secondary">
      <div className="container">
        <h1 className="h2 fw-bold mb-3">Student dashboard</h1>
        <p className="text-secondary col-lg-9 mb-4">
          Preview how Briticana learners track milestones and submit weekly deliverables. No accounts or API routes are wired in this phase.
        </p>
      </div>
      <DashboardShell>
        <ProgressTracker />
        <SubmissionPanel />
      </DashboardShell>
    </div>
  );
}
