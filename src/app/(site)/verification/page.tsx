// TODO: build Verification lookup page
import VerificationForm from "@/components/verification/VerificationForm";
import VerificationResult from "@/components/verification/VerificationResult";

export default function VerificationPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Verification</h1>
      <p className="lead text-secondary col-lg-9">
        Employers and partners can confirm a learner&apos;s Briticana internship status using the verification code issued alongside eligible certificates.
      </p>
      <div className="row g-4">
        <div className="col-lg-6">
          <VerificationForm />
        </div>
        <div className="col-lg-6">
          <VerificationResult />
        </div>
      </div>
    </div>
  );
}
