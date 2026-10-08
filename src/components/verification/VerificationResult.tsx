export type VerificationRecord = {
  code: string;
  name: string;
  domain: string;
  duration: string;
  region: string;
  status: string;
  certificateIssued: boolean;
  mentorEvaluation: string;
};

export type VerificationResultState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; record: VerificationRecord }
  | { status: "not-found"; code: string }
  | { status: "error"; message: string };

type VerificationResultProps = {
  state: VerificationResultState;
};

const DETAIL_ICONS: Record<string, string> = {
  "Student ID / Certificate ID": "ri-hashtag",
  Domain: "ri-briefcase-line",
  Duration: "ri-time-line",
  Region: "ri-map-pin-line",
  "Completion status": "ri-flag-line",
  "Certificate issued": "ri-award-line",
  "Mentor evaluation": "ri-star-line",
};

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="col-sm-6">
      <div className="d-flex align-items-start gap-2 py-2 border-bottom h-100">
        <i className={`${DETAIL_ICONS[label] ?? "ri-information-line"} text-secondary mt-1`} aria-hidden />
        <div>
          <span className="small text-secondary d-block">{label}</span>
          <span className="fw-medium">{value}</span>
        </div>
      </div>
    </div>
  );
}

export default function VerificationResult({ state }: VerificationResultProps) {
  if (state.status === "idle") {
    return (
      <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5 d-flex flex-column justify-content-center text-center" data-component="VerificationResult">
        <i className="ri-search-eye-line fs-1 text-secondary mb-3" aria-hidden />
        <h3 className="mb-2">Lookup result</h3>
        <p className="small text-secondary mb-0 mx-auto col-md-9">
          Enter a Student ID or Certificate ID and select <strong>Verify</strong> to view the learner&apos;s internship
          completion details sourced from the Briticana record.
        </p>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5 d-flex flex-column justify-content-center text-center" data-component="VerificationResult">
        <i className="ri-loader-4-line fs-1 text-secondary mb-3" aria-hidden />
        <h3 className="mb-2">Verifying certificate...</h3>
        <p className="small text-secondary mb-0 mx-auto col-md-9">
          Checking the Briticana verification registry for the submitted Student ID / Certificate ID.
        </p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5 d-flex flex-column justify-content-center text-center" data-component="VerificationResult">
        <i className="ri-error-warning-line fs-1 text-danger mb-3" aria-hidden />
        <h3 className="mb-2">Verification unavailable</h3>
        <p className="small text-secondary mb-0 mx-auto col-md-9">
          {state.message}
        </p>
      </div>
    );
  }

  if (state.status === "not-found") {
    return (
      <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5 d-flex flex-column justify-content-center text-center" data-component="VerificationResult">
        <i className="ri-error-warning-line fs-1 text-warning mb-3" aria-hidden />
        <h3 className="mb-2">Verification record not found</h3>
        <p className="small text-secondary mb-0 mx-auto col-md-9">
          We couldn&apos;t find a verification record for
          {state.code ? <> ID <strong>{state.code}</strong></> : <> the ID entered</>}. Check the Student ID or
          Certificate ID printed on the certificate and try again.
        </p>
      </div>
    );
  }

  const { record } = state;

  return (
    <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5" data-component="VerificationResult">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex justify-content-center align-items-center rounded-circle bg-f7f7f7 flex-shrink-0"
            style={{ width: "56px", height: "56px" }}
          >
            <i className="ri-user-3-line fs-4" aria-hidden />
          </div>
          <div>
            <span className="small text-secondary d-block">Verified learner</span>
            <h3 className="mb-0">{record.name}</h3>
          </div>
        </div>
        <span className="badge text-bg-success d-inline-flex align-items-center gap-1 py-2 px-3">
          <i className="ri-checkbox-circle-fill" /> Verified
        </span>
      </div>

      <div className="row g-2">
        <DetailRow label="Student ID / Certificate ID" value={record.code} />
        <DetailRow label="Domain" value={record.domain} />
        <DetailRow label="Duration" value={record.duration} />
        <DetailRow label="Region" value={record.region} />
        <DetailRow
          label="Completion status"
          value={
            <span className={record.status === "Completed" ? "text-success" : "text-body"}>
              {record.status}
            </span>
          }
        />
        <DetailRow
          label="Certificate issued"
          value={
            record.certificateIssued ? (
              <span className="text-success d-inline-flex align-items-center gap-1">
                <i className="ri-checkbox-circle-fill" /> Yes
              </span>
            ) : (
              <span className="text-secondary d-inline-flex align-items-center gap-1">
                <i className="ri-close-circle-line" /> No
              </span>
            )
          }
        />
        <DetailRow label="Mentor evaluation" value={record.mentorEvaluation} />
      </div>
    </div>
  );
}
