type WhatYouGetProps = Record<string, never>;

export default function WhatYouGet(_props: WhatYouGetProps) {
  // TODO: render icon-led checklist of outcomes: mentorship, portfolio project, office hours, cohort community, and certification path.
  return (
    <div className="py-5 bg-body-secondary" data-component="WhatYouGet">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">What you get</h2>
        <p className="text-secondary col-lg-8 mb-0">
          Weekly mentor checkpoints, production-minded tooling, peer reviews, and a verification-friendly record of your internship progress.
        </p>
      </div>
    </div>
  );
}
