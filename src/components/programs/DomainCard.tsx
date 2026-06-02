type DomainCardProps = Record<string, never>;

export default function DomainCard(_props: DomainCardProps) {
  // TODO: render a domain summary with skills preview and CTA into filtered internships for that domain.
  return (
    <div className="card h-100 border-0 shadow-sm" data-component="DomainCard">
      <div className="card-body">
        <p className="fw-semibold mb-2">Domain track</p>
        <p className="small text-secondary mb-0">
          Each card will describe a Briticana domain cluster and what learners build with startup mentors.
        </p>
      </div>
    </div>
  );
}
