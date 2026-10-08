type VerificationFormProps = {
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
};

export default function VerificationForm({
  code,
  onCodeChange,
  onSubmit,
  isLoading = false,
}: VerificationFormProps) {
  return (
    <div className="bg-white rounded-4 shadow-sm h-100 p-4 p-sm-5" data-component="VerificationForm">
      <div className="d-flex align-items-center gap-2 mb-2">
        <i className="ri-shield-check-line fs-4 text-success" aria-hidden />
        <h3 className="mb-0">Verify a certificate</h3>
      </div>
      <p className="small text-secondary mb-4">
        Enter the Student ID or Certificate ID printed on the Briticana certificate to confirm the learner&apos;s
        internship record.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="verification-code" className="form-label fw-semibold">
          Student ID / Certificate ID
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <i className="ri-search-line" />
          </span>
          <input
            id="verification-code"
            type="text"
            className="form-control"
            placeholder="Enter Student ID or Certificate ID"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            autoComplete="off"
            maxLength={64}
            required
          />
        </div>

        <button
          type="submit"
          className="main-btn w-100 justify-content-center"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
