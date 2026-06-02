type DurationCardProps = Record<string, never>;

export default function DurationCard(_props: DurationCardProps) {
  // TODO: render 3 / 6 / 9 month expectations, weekly rhythm, and certification checkpoints for Briticana programs.
  return (
    <div className="card h-100 border-0 shadow-sm" data-component="DurationCard">
      <div className="card-body">
        <p className="fw-semibold mb-2">Duration option</p>
        <p className="small text-secondary mb-0">
          Cards will outline scope differences across Briticana&apos;s three-, six-, and nine-month internship arcs.
        </p>
      </div>
    </div>
  );
}
