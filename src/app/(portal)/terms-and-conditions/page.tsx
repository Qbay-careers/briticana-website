import type { Metadata } from "next";

import { LegalSections } from "@/components/marketing/LegalSections";
import MarketingPolicyLayout from "@/components/marketing/MarketingPolicyLayout";
import { termsAndConditionsBlocks } from "@/content/legal/termsAndConditionsBlocks";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "Terms governing use of Briticana websites, applications, portals, mentor-led programmes, and related services.",
};

const LAST_UPDATED = "16 June 2026";

export default function TermsAndConditionsPage() {
  return (
    <MarketingPolicyLayout
      breadcrumbCurrent="Terms and conditions"
      title={
        <>
          Terms &amp; <span>conditions</span>
        </>
      }
      intro="The rules that apply when you use Briticana services, join a programme, or submit work through our platform."
      lastUpdatedLabel={LAST_UPDATED}
    >
      <LegalSections blocks={termsAndConditionsBlocks} />
    </MarketingPolicyLayout>
  );
}
