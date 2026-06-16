import Link from "next/link";

import UploadDeliverablesDemo from "@/components/dashboard/UploadDeliverablesDemo";
import type { DemoDeliverable, SubmissionInfo } from "@/lib/demo/studentDashboard";

type SubmissionPanelProps = {
  submission: SubmissionInfo;
  deliverables: readonly DemoDeliverable[];
};

function StatusBadge({ phase }: { phase: SubmissionInfo["phase"] }) {
  if (phase === "open") {
    return (
      <span className="badge text-bg-primary d-inline-flex align-items-center gap-1">
        <i className="ri-upload-cloud-2-line" /> Open
      </span>
    );
  }
  if (phase === "certificate_ready") {
    return (
      <span className="badge text-bg-success d-inline-flex align-items-center gap-1">
        <i className="ri-medal-line" /> Issued
      </span>
    );
  }
  return (
    <span className="badge text-bg-light text-secondary d-inline-flex align-items-center gap-1">
      <i className="ri-lock-line" /> Locked
    </span>
  );
}

export default function SubmissionPanel({ submission, deliverables }: SubmissionPanelProps) {
  return (
    <div className="col-lg-5">
      <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5" data-component="SubmissionPanel">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <h3 className="mb-0">{submission.title}</h3>
          <StatusBadge phase={submission.phase} />
        </div>
        <p className="small text-secondary mb-3">{submission.description}</p>

        {submission.phase === "open" ? (
          <UploadDeliverablesDemo deliverables={deliverables} />
        ) : submission.phase === "certificate_ready" ? (
          <>
            <ul className="list-unstyled mb-4">
              {deliverables.map((d) => (
                <li key={d.id} className="d-flex align-items-center gap-3 py-2 border-bottom">
                  <i className="ri-checkbox-circle-fill fs-5 text-success" aria-hidden />
                  <span className="flex-grow-1">{d.label}</span>
                  <span className="small text-success">Submitted</span>
                </li>
              ))}
            </ul>
            <Link href="/dashboard/certificate" className="main-btn w-100 justify-content-center">
              <i className="ri-medal-line me-2" aria-hidden /> {submission.certificateButtonLabel ?? "View certificate"}
            </Link>
          </>
        ) : (
          <>
            <ul className="list-unstyled mb-4">
              {deliverables.map((d) => (
                <li key={d.id} className="d-flex align-items-center gap-3 py-2 border-bottom">
                  <i className={`${d.icon} fs-5 text-secondary`} aria-hidden />
                  <span>{d.label}</span>
                </li>
              ))}
            </ul>

            {submission.lockedHint ? <p className="small text-muted mb-3">{submission.lockedHint}</p> : null}

            <button type="button" className="main-btn w-100 justify-content-center disabled" aria-disabled="true" tabIndex={-1}>
              <i className="ri-upload-2-line me-2" /> Upload deliverables (locked)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
