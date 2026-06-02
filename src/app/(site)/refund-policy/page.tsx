// TODO: build Refund policy page
import SectionHeading from "@/components/shared/SectionHeading";

export default function RefundPolicyPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Refund policy</h1>
      <SectionHeading
        title="Payments and refunds"
        description="This section will outline Briticana refund windows, chargeback handling, and what happens if a batch is rescheduled or cancelled."
      />
      <p className="text-secondary">
        Coordinate finance and legal before publishing live refund language tied to checkout flows.
      </p>
    </div>
  );
}
