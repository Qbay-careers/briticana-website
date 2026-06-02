type HowItWorksProps = Record<string, never>;

export default function HowItWorks(_props: HowItWorksProps) {
  // TODO: render a three- or four-step timeline explaining apply → match → build → certify for Briticana internships.
  return (
    <div className="py-5" data-component="HowItWorks">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">How Briticana works</h2>
        <p className="text-secondary col-lg-8">
          Choose a domain, join a batch with a clear delivery plan, collaborate with startup mentors, and graduate with artifacts you can show employers.
        </p>
      </div>
    </div>
  );
}
