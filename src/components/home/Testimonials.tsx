type TestimonialsProps = Record<string, never>;

export default function Testimonials(_props: TestimonialsProps) {
  // TODO: render carousel or grid of testimonial documents from Sanity with photos and cohort tags.
  return (
    <div className="py-5 bg-body-secondary" data-component="Testimonials">
      <div className="container">
        <h2 className="h3 fw-bold mb-3">What learners say</h2>
        <p className="text-secondary col-lg-8 mb-0">
          Stories from recent cohorts about mentorship quality, workload clarity, and how internship deliverables translated into interviews.
        </p>
      </div>
    </div>
  );
}
