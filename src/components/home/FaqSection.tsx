type FaqSectionProps = Record<string, never>;

export default function FaqSection(_props: FaqSectionProps) {
  // TODO: render accordion of faqItem documents ordered by the numeric order field.
  return (
    <div className="py-5 bg-body-secondary" data-component="FaqSection">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">Frequently asked questions</h2>
        <p className="text-secondary col-lg-8 mb-0">
          Eligibility, batch timing, regions, certification, and how startup matching works—content will load from Sanity FAQ entries.
        </p>
      </div>
    </div>
  );
}
