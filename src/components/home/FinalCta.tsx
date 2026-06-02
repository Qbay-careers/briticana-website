type FinalCtaProps = Record<string, never>;

export default function FinalCta(_props: FinalCtaProps) {
  // TODO: render closing CTA with WhatsApp + application buttons and trust badges.
  return (
    <div className="py-5" data-component="FinalCta">
      <div className="container">
        <div className="p-4 p-lg-5 bg-primary text-white rounded-3">
          <h2 className="h3 fw-bold mb-2">Ready to join the next Briticana batch?</h2>
          <p className="mb-0 col-lg-8 opacity-75">
            Browse open internships, pick your domain and duration, and chat with our team if you need help choosing the right track.
          </p>
        </div>
      </div>
    </div>
  );
}
