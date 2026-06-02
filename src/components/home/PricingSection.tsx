type PricingSectionProps = Record<string, never>;

export default function PricingSection(_props: PricingSectionProps) {
  // TODO: render Starter vs Pro pricing cards using labels from siteSettings in Sanity (wired later).
  return (
    <div className="py-5" data-component="PricingSection">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">Simple pricing</h2>
        <p className="text-secondary col-lg-8 mb-0">
          Transparent tiers for individual learners and teams—details will sync from Briticana site settings once CMS content is connected.
        </p>
      </div>
    </div>
  );
}
