type SubmissionPanelProps = Record<string, never>;

export default function SubmissionPanel(_props: SubmissionPanelProps) {
  // TODO: render file / link submission placeholders for weekly deliverables in the demo student dashboard.
  return (
    <div className="col-lg-5">
      <div className="card shadow-sm h-100" data-component="SubmissionPanel">
        <div className="card-body">
          <h2 className="h5 fw-bold">Submissions</h2>
          <p className="small text-secondary mb-0">
            Learners will drop links to repos, decks, or demo videos—this phase keeps the layout only, without persistence or auth.
          </p>
        </div>
      </div>
    </div>
  );
}
