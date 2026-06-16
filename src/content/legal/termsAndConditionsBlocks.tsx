import type { LegalBlock } from "@/components/marketing/LegalSections";
import { BRITICANA_INFO_EMAIL } from "@/lib/legal/briticanaContact";

export const termsAndConditionsBlocks: readonly LegalBlock[] = [
  {
    kind: "p",
    text: (
      <>
        These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of Briticana websites, application
        flows, student or partner portals, and related services (collectively, the &quot;Services&quot;). By using the
        Services or submitting an application, you agree to these Terms. If you do not agree, you should not use the
        Services. For questions, contact <a href={`mailto:${BRITICANA_INFO_EMAIL}`}>{BRITICANA_INFO_EMAIL}</a>.
      </>
    ),
  },
  {
    kind: "h2",
    text: "1. Eligibility and accounts",
  },
  {
    kind: "ul",
    items: [
      "You must provide accurate, current, and complete information in application forms and profile fields.",
      "You are responsible for maintaining the confidentiality of any credentials issued to you and for all activity under your account.",
      "Briticana may refuse service, suspend access, or close accounts where we reasonably believe there is fraud, abuse, or risk to other participants.",
    ],
  },
  {
    kind: "h2",
    text: "2. Nature of the Services",
  },
  {
    kind: "p",
    text: "Briticana facilitates structured learning and work-simulation experiences, including mentor-led projects, cohort-based activities, and documentation of outcomes. Unless expressly stated in a separate agreement, the Services do not constitute employment, agency, or guaranteed placement with any third party.",
  },
  {
    kind: "h2",
    text: "3. Code of conduct",
  },
  {
    kind: "ul",
    items: [
      "Treat mentors, peers, staff, and partners with respect. Harassment, discrimination, hate speech, or threats are not permitted.",
      "Do not misrepresent your identity, credentials, or contributions. Do not attempt to gain unauthorised access to systems, data, or accounts.",
      "Respect confidentiality obligations communicated for specific projects or partner engagements.",
    ],
  },
  {
    kind: "h2",
    text: "4. Intellectual property and deliverables",
  },
  {
    kind: "p",
    text: "Unless a separate written agreement states otherwise, you retain ownership of materials you create, subject to a licence to Briticana and, where applicable, participating partners to operate the programme (for example, to review work, issue certificates, showcase anonymised outcomes, or meet legal obligations). Partner-specific projects may require additional assignment or licence terms presented before you begin that work.",
  },
  {
    kind: "h2",
    text: "5. Fees and payments",
  },
  {
    kind: "p",
    text: "Where fees apply, pricing, taxes, currency, and payment methods will be presented at checkout or in an order form. Failure to pay amounts when due may result in suspension or cancellation of access. Chargebacks or payment disputes may be handled according to our Refund Policy and the rules of the relevant payment provider.",
  },
  {
    kind: "h2",
    text: "6. Third-party services",
  },
  {
    kind: "p",
    text: "The Services may link to or embed third-party tools (for example Google Forms, video conferencing, or document platforms). Those services are governed by their own terms and privacy policies.",
  },
  {
    kind: "h2",
    text: "7. Disclaimers",
  },
  {
    kind: "p",
    text: "To the fullest extent permitted by law, the Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. Briticana does not warrant uninterrupted or error-free operation. Mentorship and project guidance are educational in nature and do not constitute regulated professional advice (legal, financial, medical, or otherwise) unless separately agreed in writing by a qualified provider.",
  },
  {
    kind: "h2",
    text: "8. Limitation of liability",
  },
  {
    kind: "p",
    text: "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law. Subject to the foregoing, Briticana is not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill, arising from your use of the Services. Where liability is permitted to be capped, our aggregate liability arising out of or relating to the Services in any twelve-month period is limited to the fees you paid to Briticana for the specific programme giving rise to the claim, or one hundred euros (€100) if no fees were paid.",
  },
  {
    kind: "h2",
    text: "9. Suspension and termination",
  },
  {
    kind: "p",
    text: "We may suspend or terminate access where necessary to protect the Services, comply with law, or enforce these Terms. You may stop using the Services at any time; certain provisions survive termination (including intellectual property, limitation of liability, and governing law).",
  },
  {
    kind: "h2",
    text: "10. Governing law and disputes",
  },
  {
    kind: "p",
    text: "Unless mandatory local law requires otherwise, these Terms are governed by the laws of the jurisdiction Briticana designates in your programme agreement or order form, without regard to conflict-of-law rules. Courts in that jurisdiction have exclusive jurisdiction, except where consumer law grants you non-waivable rights in your country of residence.",
  },
  {
    kind: "h2",
    text: "11. Changes",
  },
  {
    kind: "p",
    text: "We may update these Terms from time to time. Material changes will be communicated through reasonable means (for example email or a notice in the portal). Continued use after the effective date may constitute acceptance of the revised Terms where permitted by law.",
  },
];
