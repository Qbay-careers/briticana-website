// TODO: build Certification policy page
import SectionHeading from "@/components/shared/SectionHeading";

export default function CertificationPolicyPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Certification policy</h1>
      <SectionHeading
        title="When Briticana issues certificates"
        description="Upcoming policy text will clarify mentor sign-off requirements, verification codes, and how completion status appears in Sanity-backed lookups."
      />
      <p className="text-secondary">
        Link this page from marketing sections and the verification flow once the policy is finalized.
      </p>
    </div>
  );
}
