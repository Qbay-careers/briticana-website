type CertificationSectionProps = Record<string, never>;

export default function CertificationSection(_props: CertificationSectionProps) {
  // TODO: render certification policy highlights, issuance criteria, and link to /certification-policy.
  return (
    <div className="py-5" data-component="CertificationSection">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">Certification you can verify</h2>
        <p className="text-secondary col-lg-8 mb-0">
          Completion signals, mentor sign-off, and public verification codes help employers trust what you built during your Briticana internship.
        </p>
      </div>
    </div>
  );
}
