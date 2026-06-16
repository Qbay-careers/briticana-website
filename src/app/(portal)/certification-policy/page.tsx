import type { Metadata } from "next";

import { LegalSections } from "@/components/marketing/LegalSections";
import MarketingPolicyLayout from "@/components/marketing/MarketingPolicyLayout";
import { certificationPolicyBlocks } from "@/content/legal/certificationPolicyBlocks";

export const metadata: Metadata = {
  title: "Certification policy",
  description:
    "When Briticana issues experience certificates, mentor sign-off requirements, verification, and eligibility criteria.",
};

const LAST_UPDATED = "16 June 2026";

export default function CertificationPolicyPage() {
  return (
    <MarketingPolicyLayout
      breadcrumbCurrent="Certification policy"
      title={
        <>
          Certification <span>policy</span>
        </>
      }
      intro="How we issue experience certificates, verify completion, and maintain trust with learners and employers."
      lastUpdatedLabel={LAST_UPDATED}
    >
      <LegalSections blocks={certificationPolicyBlocks} />
    </MarketingPolicyLayout>
  );
}
