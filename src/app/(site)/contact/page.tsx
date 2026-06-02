// TODO: build Contact page
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCta from "@/components/shared/WhatsAppCta";

export default function ContactPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Contact Briticana</h1>
      <p className="lead text-secondary col-lg-9">
        Reach the team for admissions questions, startup partnerships, or press inquiries. Structured details will sync from Sanity site settings later.
      </p>
      <SectionHeading
        title="Talk with us"
        description="Share your goals, preferred region, and domain—we will route you to the right Briticana coordinator."
      />
      <WhatsAppCta />
    </div>
  );
}
