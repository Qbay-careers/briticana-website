type HeroProps = Record<string, never>;

export default function Hero(_props: HeroProps) {
  // TODO: render headline, subcopy, dual CTAs (browse internships / for startups), and optional hero visual aligned with Briticana positioning.
  return (
    <div className="py-5 bg-primary-subtle" data-component="Hero">
      <div className="container py-lg-4">
        <p className="text-uppercase small text-primary fw-semibold mb-2">Structured internships · Startup showcase</p>
        <h2 className="display-5 fw-bold col-lg-9">Launch your career through real startup collaboration</h2>
        <p className="lead text-secondary col-lg-8 mt-3">
          Briticana pairs ambitious learners with mentor-led internship tracks and surfaces the startups shaping tomorrow&apos;s products across Ireland, the UK, Germany, and Finland.
        </p>
      </div>
    </div>
  );
}
