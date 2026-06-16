import type { Metadata } from "next";

import { LegalSections } from "@/components/marketing/LegalSections";
import MarketingPolicyLayout from "@/components/marketing/MarketingPolicyLayout";
import { privacyPolicyBlocks } from "@/content/legal/privacyPolicyBlocks";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Briticana collects, uses, and protects personal data for applications, programmes, and internship experiences across the UK and EU.",
};

const LAST_UPDATED = "16 June 2026";

export default function PrivacyPolicyPage() {
  return (
    <MarketingPolicyLayout
      breadcrumbCurrent="Privacy policy"
      title={
        <>
          Privacy <span>policy</span>
        </>
      }
      intro="Transparency about personal data when you apply, join a cohort, use our portals, or interact with Briticana online."
      lastUpdatedLabel={LAST_UPDATED}
    >
      <LegalSections blocks={privacyPolicyBlocks} />
    </MarketingPolicyLayout>
  );
}
