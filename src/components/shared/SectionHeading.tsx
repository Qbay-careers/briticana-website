type SectionHeadingProps = {
  title: string;
  description?: string;
  kicker?: string;
};

export default function SectionHeading({ title, description, kicker }: SectionHeadingProps) {
  // TODO: add optional actions slot (buttons) for section-level CTAs reused across marketing pages.
  return (
    <div className="mb-4" data-component="SectionHeading">
      {kicker ? <p className="text-uppercase small text-primary fw-semibold mb-2">{kicker}</p> : null}
      <h2 className="h3 fw-bold">{title}</h2>
      {description ? <p className="text-secondary col-lg-8 mb-0 mt-2">{description}</p> : null}
    </div>
  );
}
