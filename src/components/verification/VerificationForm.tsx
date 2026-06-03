type VerificationFormProps = {
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  sampleCodes: readonly string[];
};

export default function VerificationForm({ code, onCodeChange, onSubmit, sampleCodes }: VerificationFormProps) {
  return (
    <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5" data-component="VerificationForm">
      <div className="d-flex align-items-center gap-2 mb-2">
        <i className="ri-shield-check-line fs-4 text-success" aria-hidden />
        <h3 className="mb-0">Verify a certificate</h3>
      </div>
      <p className="small text-secondary mb-4">
        Enter the access code printed on the Briticana certificate to confirm the learner&apos;s internship record.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="verification-code" className="form-label fw-semibold">
          Access code
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <i className="ri-search-line" />
          </span>
          <input
            id="verification-code"
            type="text"
            className="form-control"
            placeholder="e.g. BRT-2026-001"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className="main-btn w-100 justify-content-center">
          Verify
        </button>
      </form>

      <div className="mt-4 pt-3 border-top">
        <p className="small text-secondary mb-2">
          Demo data only — try one of these sample codes:
        </p>
        <div className="d-flex flex-wrap gap-2">
          {sampleCodes.map((c) => (
            <button
              key={c}
              type="button"
              className="badge text-bg-light border text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => onCodeChange(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
