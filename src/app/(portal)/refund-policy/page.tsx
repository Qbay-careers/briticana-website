import type { Metadata } from "next";

import { LegalSections } from "@/components/marketing/LegalSections";
import MarketingPolicyLayout from "@/components/marketing/MarketingPolicyLayout";
import { refundPolicyBlocks } from "@/content/legal/refundPolicyBlocks";

export const metadata: Metadata = {
  title: "Refund policy",
  description:
    "Briticana refund windows, cancellations, cohort changes, chargebacks, and how we handle programme fee disputes.",
};

const LAST_UPDATED = "16 June 2026";

export default function RefundPolicyPage() {
  return (
    <MarketingPolicyLayout
      breadcrumbCurrent="Refund policy"
      title={
        <>
          Refund <span>policy</span>
        </>
      }
      intro="Payments, cancellations, and how we approach refunds for mentor-led programmes and related services."
      lastUpdatedLabel={LAST_UPDATED}
    >
      <LegalSections blocks={refundPolicyBlocks} />
    </MarketingPolicyLayout>
  );
}
