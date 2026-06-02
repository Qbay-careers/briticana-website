type VerificationResultProps = Record<string, never>;

export default function VerificationResult(_props: VerificationResultProps) {
  // TODO: render student completion status, domain, duration, region, certificateIssued flag, and mentorEvaluation excerpt when a match is found.
  return (
    <div className="alert alert-secondary mb-0" data-component="VerificationResult">
      <p className="fw-semibold mb-1">Lookup result</p>
      <p className="small mb-0">
        After you submit a valid code, Briticana will show a concise verification summary sourced from the student record in Sanity.
      </p>
    </div>
  );
}
