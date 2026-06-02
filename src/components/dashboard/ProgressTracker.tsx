type ProgressTrackerProps = Record<string, never>;

export default function ProgressTracker(_props: ProgressTrackerProps) {
  // TODO: render milestone checklist for the demo dashboard (static sample data until auth-backed progress exists).
  return (
    <div className="col-lg-7">
      <div className="card shadow-sm h-100" data-component="ProgressTracker">
        <div className="card-body">
          <h2 className="h5 fw-bold">Progress tracker</h2>
          <p className="small text-secondary mb-0">
            This panel will visualize internship milestones such as kickoff, mid-batch review, final demo, and certification readiness.
          </p>
        </div>
      </div>
    </div>
  );
}
