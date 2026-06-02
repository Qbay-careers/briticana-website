// TODO: build Privacy policy page
import SectionHeading from "@/components/shared/SectionHeading";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Privacy policy</h1>
      <SectionHeading
        title="How Briticana handles personal data"
        description="This policy will describe what we collect during applications, how internship telemetry is stored, and your rights across the EU and UK markets we serve."
      />
      <p className="text-secondary">
        Final legal copy will replace this scaffold text before launch. Coordinate with counsel to align Briticana marketing forms and Sanity-stored records.
      </p>
    </div>
  );
}
