import { demoMilestones } from "@/lib/demo/studentDashboard";

type ProgressTrackerProps = Record<string, never>;

export default function ProgressTracker(_props: ProgressTrackerProps) {
  return (
    <div className="col-lg-7">
      <div className="card shadow-sm h-100" data-component="ProgressTracker">
        <div className="card-body">
          <h2 className="h5 fw-bold">Progress tracker</h2>
          <p className="small text-secondary mb-3">Demo milestones (static data — no auth or API).</p>
          <ul className="list-unstyled mb-0 small">
            {demoMilestones.map((m) => (
              <li key={m.id} className="d-flex align-items-center gap-2 py-2 border-bottom">
                <span className={m.done ? "text-success" : "text-secondary"} aria-hidden>
                  {m.done ? "✓" : "○"}
                </span>
                <span className={m.done ? "text-body" : "text-secondary"}>{m.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
