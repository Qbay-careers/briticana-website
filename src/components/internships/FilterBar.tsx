type FilterBarProps = Record<string, never>;

export default function FilterBar(_props: FilterBarProps) {
  // TODO: render filters for domain, region, duration, and application status with Bootstrap form controls (react-bootstrap where needed).
  return (
    <div className="card mb-4" data-component="FilterBar">
      <div className="card-body">
        <p className="small text-secondary mb-0">
          Filter controls will map to GROQ-filtered internship queries for the Briticana listing page.
        </p>
      </div>
    </div>
  );
}
