import type { DemoMilestone } from "@/lib/demo/studentDashboard";

type ProgressTrackerProps = {
  milestones: readonly DemoMilestone[];
  percent: number;
};

export default function ProgressTracker({ milestones, percent }: ProgressTrackerProps) {
  return (
    <div className="col-lg-7">
      <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5" data-component="ProgressTracker">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <h3 className="mb-0">Progress tracker</h3>
          <span className="fw-bold">{percent}%</span>
        </div>
        <p className="small text-secondary mb-3">Your internship milestones and mentor reviews.</p>

        <div className="progress mb-4" style={{ height: "8px" }} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>

        <ul className="list-unstyled mb-0">
          {milestones.map((m) => (
            <li key={m.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
              <i
                className={
                  m.done
                    ? "ri-checkbox-circle-fill text-success fs-5"
                    : "ri-checkbox-blank-circle-line text-secondary fs-5"
                }
                aria-hidden
              />
              <span className={m.done ? "text-body fw-medium" : "text-secondary"}>{m.title}</span>
              {m.done ? <span className="badge text-bg-success ms-auto">Done</span> : <span className="badge text-bg-light text-secondary ms-auto">Pending</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
