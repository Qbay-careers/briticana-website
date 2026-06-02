type VerificationFormProps = Record<string, never>;

export default function VerificationForm(_props: VerificationFormProps) {
  // TODO: render controlled input for verification code, submit handler calling client.fetch(getStudentByCode), and loading / error states.
  return (
    <div className="card shadow-sm" data-component="VerificationForm">
      <div className="card-body">
        <label className="form-label fw-semibold" htmlFor="verification-code">
          Verification code
        </label>
        <input id="verification-code" type="text" className="form-control" placeholder="Enter the code issued with your certificate" readOnly disabled />
        <p className="form-text mb-0">
          Form wiring will connect to Sanity using the student.internshipId lookup field for the Briticana verification demo.
        </p>
      </div>
    </div>
  );
}
