import type { LegalBlock } from "@/components/marketing/LegalSections";
import { BRITICANA_INFO_EMAIL } from "@/lib/legal/briticanaContact";

export const refundPolicyBlocks: readonly LegalBlock[] = [
  {
    kind: "p",
    text: (
      <>
        This Refund Policy describes how Briticana handles payments, cancellations, rescheduling, and refund requests
        for paid programmes or services. It should be read together with your checkout summary, order confirmation, and
        the Terms and Conditions. For billing questions, contact{" "}
        <a href={`mailto:${BRITICANA_INFO_EMAIL}`}>{BRITICANA_INFO_EMAIL}</a>.
      </>
    ),
  },
  {
    kind: "h2",
    text: "1. When this policy applies",
  },
  {
    kind: "p",
    text: "This policy applies where Briticana charges fees directly for a programme, bundle, or add-on. Some offerings may be invoiced under a separate enterprise agreement; in that case, the contract terms control.",
  },
  {
    kind: "h2",
    text: "2. Cooling-off and eligibility window",
  },
  {
    kind: "p",
    text: "Where you qualify as a consumer under applicable law, you may have a statutory right to cancel distance contracts within a cooling-off period (often 14 days from purchase). If you request access to digital materials or begin the programme during that period, you may lose part or all of that right as permitted by law. The exact cancellation form and deadline will be provided at purchase where required.",
  },
  {
    kind: "h2",
    text: "3. Refunds before the cohort start date",
  },
  {
    kind: "ul",
    items: [
      "If you withdraw within the published cooling-off window and have not received disallowed early access, we will refund eligible amounts to the original payment method where technically possible.",
      "If you cancel after the cooling-off window but before the published cohort start date, we may refund on a sliding scale: for example a full or partial credit toward a future cohort, or a partial refund minus administrative costs, as stated on the product page at the time of purchase.",
    ],
  },
  {
    kind: "h2",
    text: "4. Refunds after the cohort has started",
  },
  {
    kind: "p",
    text: "Once a cohort has begun, fees generally cover reserved mentor capacity, curriculum delivery, and operational costs. Refunds are typically not available except where Briticana cancels the cohort, materially changes essential programme elements without a suitable remedy, or where local consumer law requires a refund.",
  },
  {
    kind: "h2",
    text: "5. Cancellations or changes by Briticana",
  },
  {
    kind: "ul",
    items: [
      "If we cancel a cohort before it starts, you may choose a full refund or transfer to another eligible cohort.",
      "If we postpone a cohort, we will offer reasonable alternatives (for example a new start date). If you cannot participate and we cannot place you in a suitable alternative, we will refund eligible amounts.",
      "We are not responsible for delays caused by events outside our reasonable control (for example natural disasters, pandemics, government actions, or major infrastructure outages), but we will work in good faith to minimise disruption.",
    ],
  },
  {
    kind: "h2",
    text: "6. Chargebacks and payment disputes",
  },
  {
    kind: "p",
    text: "If you initiate a chargeback, we may suspend programme access until the dispute is resolved. We ask that you contact us first so we can attempt to resolve the issue promptly. Unwarranted chargebacks may result in account closure.",
  },
  {
    kind: "h2",
    text: "7. Processing time",
  },
  {
    kind: "p",
    text: "Approved refunds are processed to the original payment method where possible. Banks and card networks may take additional business days to post credits; Briticana does not control those timelines.",
  },
  {
    kind: "h2",
    text: "8. Changes to this policy",
  },
  {
    kind: "p",
    text: "We may update this Refund Policy to reflect new products, payment partners, or legal requirements. The “Last updated” date will change when revisions are published.",
  },
];
