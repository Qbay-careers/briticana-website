import type { LegalBlock } from "@/components/marketing/LegalSections";
import { BRITICANA_INFO_EMAIL } from "@/lib/legal/briticanaContact";

export const certificationPolicyBlocks: readonly LegalBlock[] = [
  {
    kind: "p",
    text: (
      <>
        This Certification Policy explains when Briticana issues experience certificates, how completion is evidenced,
        and how verification works alongside our public verification tools. For questions, contact{" "}
        <a href={`mailto:${BRITICANA_INFO_EMAIL}`}>{BRITICANA_INFO_EMAIL}</a>.
      </>
    ),
  },
  {
    kind: "h2",
    text: "1. What the certificate represents",
  },
  {
    kind: "p",
    text: "A Briticana experience certificate confirms that a named participant completed the requirements of a specified programme track within a stated timeframe, subject to mentor review and Briticana quality standards. It is an educational experience credential, not a government licence or university degree unless expressly co-branded with an accredited partner under a separate agreement.",
  },
  {
    kind: "h2",
    text: "2. Eligibility for issuance",
  },
  {
    kind: "ul",
    items: [
      "Satisfactory completion of required milestones, mentor checkpoints, and final deliverables where applicable.",
      "Compliance with the Code of Conduct and any partner-specific confidentiality or usage rules.",
      "Settlement of any outstanding fees connected to the programme, unless waived in writing by Briticana.",
    ],
  },
  {
    kind: "h2",
    text: "3. Mentor review and sign-off",
  },
  {
    kind: "p",
    text: "Certificates are issued only after designated mentors or programme leads confirm that submitted work meets the published rubric for the cohort. Briticana may withhold or revoke a certificate where academic dishonesty, plagiarism, or misrepresentation is identified.",
  },
  {
    kind: "h2",
    text: "4. Verification and access codes",
  },
  {
    kind: "p",
    text: "Certificates may reference a verification code or URL that allows third parties (for example employers) to confirm issuance against Briticana records. Codes are generated for legitimate verification; automated scraping or misuse may result in suspension of verification access.",
  },
  {
    kind: "h2",
    text: "5. Name and details on the certificate",
  },
  {
    kind: "p",
    text: "Names and programme titles are printed as provided in your official application and approved profile. Legal name changes may require supporting documentation before we reissue materials.",
  },
  {
    kind: "h2",
    text: "6. Reissues and corrections",
  },
  {
    kind: "p",
    text: "We will correct genuine typographical errors or system mistakes at no charge where reasonably practicable. Reissues requested for personal preference (for example rebranding a project title) may incur an administrative fee if approved.",
  },
  {
    kind: "h2",
    text: "7. Revocation",
  },
  {
    kind: "p",
    text: "Briticana may revoke or invalidate a certificate if it was issued in error, if serious misconduct is later substantiated, or if verification systems detect fraud. We maintain internal records to support such decisions.",
  },
  {
    kind: "h2",
    text: "8. Changes",
  },
  {
    kind: "p",
    text: "Programme structures evolve; this policy may be updated to reflect new issuance criteria or verification mechanics. The “Last updated” date reflects the latest published version.",
  },
];
