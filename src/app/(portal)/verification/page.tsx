import type { Metadata } from "next";

import VerificationLookup from "@/components/verification/VerificationLookup";

export const metadata: Metadata = {
  title: "Verification",
  description:
    "Confirm a learner's Briticana internship status using the verification code issued alongside eligible certificates.",
};

export default function VerificationPage() {
  return (
    <div className="container mw-1345 py-5">
      <div className="section-title text-center mx-auto mb-5" style={{ maxWidth: "640px" }}>
        <div className="position-relative z-1">
          <h2>
            Certificate <span>Verification</span>
          </h2>
        </div>
        <p className="text-secondary mt-3 mb-0">
          Employers and partners can confirm a learner&apos;s Briticana internship status using the verification code
          issued alongside eligible certificates.
        </p>
      </div>

      <VerificationLookup />
    </div>
  );
}
