import { demoDeliverables, demoSubmissionCopy } from "@/lib/demo/studentDashboard";

type SubmissionPanelProps = Record<string, never>;

export default function SubmissionPanel(_props: SubmissionPanelProps) {
  return (
    <div className="col-lg-5">
      <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5" data-component="SubmissionPanel">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <h3 className="mb-0">{demoSubmissionCopy.title}</h3>
          <span className="badge text-bg-light text-secondary d-inline-flex align-items-center gap-1">
            <i className="ri-lock-line" /> Locked
          </span>
        </div>
        <p className="small text-secondary mb-3">{demoSubmissionCopy.description}</p>

        <ul className="list-unstyled mb-4">
          {demoDeliverables.map((d) => (
            <li key={d.id} className="d-flex align-items-center gap-3 py-2 border-bottom">
              <i className={`${d.icon} fs-5 text-secondary`} aria-hidden />
              <span>{d.label}</span>
            </li>
          ))}
        </ul>

        <p className="small text-muted mb-3">{demoSubmissionCopy.lockedHint}</p>

        <button type="button" className="main-btn w-100 justify-content-center disabled" aria-disabled="true" tabIndex={-1}>
          <i className="ri-upload-2-line me-2" /> Upload deliverables (locked)
        </button>
      </div>
    </div>
  );
}
