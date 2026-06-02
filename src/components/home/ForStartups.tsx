type ForStartupsProps = Record<string, never>;

export default function ForStartups(_props: ForStartupsProps) {
  // TODO: render partner value props, logos from startupPartner documents, and a CTA to collaborate with Briticana cohorts.
  return (
    <div className="py-5 bg-body-secondary" data-component="ForStartups">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">For startups</h2>
        <p className="text-secondary col-lg-8 mb-0">
          Surface meaningful projects to motivated interns, reduce hiring risk with structured evaluations, and showcase your collaboration on the Briticana startup wall.
        </p>
      </div>
    </div>
  );
}
