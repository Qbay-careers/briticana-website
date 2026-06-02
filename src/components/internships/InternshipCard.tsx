type InternshipCardProps = Record<string, never>;

export default function InternshipCard(_props: InternshipCardProps) {
  // TODO: render internship title, domain badge, batch date, application status, and link to detail route using slug from Sanity.
  return (
    <div className="card shadow-sm h-100" data-component="InternshipCard">
      <div className="card-body">
        <p className="small text-uppercase text-secondary mb-1">Internship card</p>
        <p className="card-text mb-0">
          This shell will list each open track with region availability and a clear apply action.
        </p>
      </div>
    </div>
  );
}
