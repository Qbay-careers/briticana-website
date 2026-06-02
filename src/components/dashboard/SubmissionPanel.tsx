import { demoSubmissionCopy } from "@/lib/demo/studentDashboard";

type SubmissionPanelProps = Record<string, never>;

export default function SubmissionPanel(_props: SubmissionPanelProps) {
  return (
    <div className="col-lg-5">
      <div className="card shadow-sm h-100" data-component="SubmissionPanel">
        <div className="card-body">
          <h2 className="h5 fw-bold">{demoSubmissionCopy.title}</h2>
          <p className="small text-secondary mb-2">{demoSubmissionCopy.description}</p>
          <p className="small text-muted mb-3">{demoSubmissionCopy.lockedHint}</p>
          <button type="button" className="btn btn-secondary btn-sm" disabled>
            Upload deliverables (locked)
          </button>
        </div>
      </div>
    </div>
  );
}
