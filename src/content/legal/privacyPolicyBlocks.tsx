import type { LegalBlock } from "@/components/marketing/LegalSections";
import { BRITICANA_COORDINATOR_EMAIL, BRITICANA_HR_EMAIL, BRITICANA_INFO_EMAIL } from "@/lib/legal/briticanaContact";

export const privacyPolicyBlocks: readonly LegalBlock[] = [
  {
    kind: "p",
    text: (
      <>
        This Privacy Policy explains how Briticana collects, uses, stores, and shares personal information when you use
        our website, apply for programs, participate in internships, or interact with our team. It is designed to align
        with common expectations under the UK GDPR, EU GDPR, and related data protection laws for the regions we serve
        (including Ireland, the United Kingdom, Germany, and Finland).
      </>
    ),
  },
  {
    kind: "h2",
    text: "1. Who we are",
  },
  {
    kind: "p",
    text: (
      <>
        Briticana operates an experience platform connecting students and early-career participants with structured,
        mentor-led internship-style programs. For privacy questions, contact{" "}
        <a href={`mailto:${BRITICANA_INFO_EMAIL}`}>{BRITICANA_INFO_EMAIL}</a>. For programme coordination, you may also
        reach <a href={`mailto:${BRITICANA_COORDINATOR_EMAIL}`}>{BRITICANA_COORDINATOR_EMAIL}</a>. HR-related enquiries
        can be directed to <a href={`mailto:${BRITICANA_HR_EMAIL}`}>{BRITICANA_HR_EMAIL}</a>.
      </>
    ),
  },
  {
    kind: "h2",
    text: "2. Information we collect",
  },
  {
    kind: "h3",
    text: "2.1 Information you provide directly",
  },
  {
    kind: "ul",
    items: [
      "Identity and contact details: full name, email address, phone number, country or region, and education background submitted through application forms or email.",
      "Programme preferences: domain of interest, preferred duration, region, cohort or batch preferences, and similar selections.",
      "Communications: messages you send to us, feedback you provide, and records of support conversations.",
      "Account and portal data: if you use a student or partner portal, login identifiers and activity needed to operate that service.",
      "Deliverables and project materials: files, links, or descriptions you upload as part of an internship or capstone submission process (where applicable).",
    ],
  },
  {
    kind: "h3",
    text: "2.2 Information collected automatically",
  },
  {
    kind: "ul",
    items: [
      "Technical data such as IP address, browser type, device type, operating system, and approximate location derived from IP.",
      "Usage data such as pages viewed, referring URLs, timestamps, and diagnostic logs that help us secure and improve the platform.",
      "Cookies and similar technologies as described in your browser settings and any cookie notice we publish.",
    ],
  },
  {
    kind: "h2",
    text: "3. How we use your information",
  },
  {
    kind: "ul",
    items: [
      "To assess applications, place participants in suitable cohorts, and operate mentor-led programmes.",
      "To communicate about onboarding, schedules, milestones, certificates, verification, and important service updates.",
      "To maintain security, prevent fraud, enforce our terms, and protect the rights of participants, mentors, and partners.",
      "To improve our website, content management systems, and internal workflows (including aggregated or de-identified analytics where appropriate).",
      "To comply with legal obligations, respond to lawful requests from public authorities, and establish or defend legal claims.",
    ],
  },
  {
    kind: "h2",
    text: "4. Legal bases (where GDPR / UK GDPR applies)",
  },
  {
    kind: "p",
    text: "Depending on the activity, we may rely on one or more of the following legal bases: performance of a contract with you or steps prior to entering a contract; legitimate interests (for example securing our services, improving programmes, and internal reporting), balanced against your rights; consent, where we ask for it separately (such as certain marketing communications or non-essential cookies); and legal obligation.",
  },
  {
    kind: "h2",
    text: "5. Sharing and processors",
  },
  {
    kind: "p",
    text: "We may share information with trusted service providers who assist us with hosting, email delivery, analytics, customer support tooling, document storage, or content management (for example Sanity or similar platforms configured for Briticana). Those providers process data on our instructions and under appropriate contractual safeguards. We may also disclose information if required by law or to protect Briticana, our users, or the public.",
  },
  {
    kind: "h2",
    text: "6. International transfers",
  },
  {
    kind: "p",
    text: "Because we work across European markets, your information may be processed in the UK, EEA, or other countries. Where transfers require additional safeguards, we use mechanisms recognised under applicable law (such as UK IDTA / Addendum or EU Standard Contractual Clauses) together with technical and organisational measures.",
  },
  {
    kind: "h2",
    text: "7. Retention",
  },
  {
    kind: "p",
    text: "We retain personal information only as long as necessary for the purposes described in this policy, including satisfying legal, accounting, or reporting requirements. Programme records, verification artefacts, and certificate-related metadata may be kept for longer where needed to evidence completion or respond to disputes.",
  },
  {
    kind: "h2",
    text: "8. Your rights",
  },
  {
    kind: "p",
    text: "Where applicable law provides rights of access, rectification, erasure, restriction, portability, objection, or withdrawal of consent, you may exercise those rights by contacting us at the email addresses above. You may also lodge a complaint with your local supervisory authority.",
  },
  {
    kind: "h2",
    text: "9. Security",
  },
  {
    kind: "p",
    text: "We implement appropriate technical and organisational measures designed to protect personal information against unauthorised access, alteration, disclosure, or destruction. No method of transmission over the Internet is completely secure; we encourage you to use strong passwords and protect your credentials.",
  },
  {
    kind: "h2",
    text: "10. Children",
  },
  {
    kind: "p",
    text: "Our services are intended for participants who meet the eligibility criteria communicated at application. If you believe we have collected information from a minor without appropriate authority, please contact us so we can investigate and take appropriate action.",
  },
  {
    kind: "h2",
    text: "11. Changes to this policy",
  },
  {
    kind: "p",
    text: "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when revisions are published, and where changes are material we will provide additional notice as appropriate.",
  },
];
