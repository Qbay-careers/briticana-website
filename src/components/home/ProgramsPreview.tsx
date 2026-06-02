type ProgramsPreviewProps = Record<string, never>;

export default function ProgramsPreview(_props: ProgramsPreviewProps) {
  // TODO: render cards pulled from Sanity for featured domains / programs with links to /programs and /internships.
  return (
    <div className="py-5" data-component="ProgramsPreview">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">Programs preview</h2>
        <p className="text-secondary col-lg-8 mb-0">
          Explore multi-month tracks spanning engineering, data, design, and go-to-market roles—each aligned with how startups actually ship work.
        </p>
      </div>
    </div>
  );
}
