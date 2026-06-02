// TODO: build Courses page
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCta from "@/components/shared/WhatsAppCta";

export default function CoursesPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Courses</h1>
      <p className="lead text-secondary col-lg-9">
        Short-form Briticana courses will complement internships with focused skills modules—this page will catalogue those add-ons once content is ready.
      </p>
      <SectionHeading
        title="Coming soon"
        description="Expect compact modules on communication, shipping culture, and tooling that pair with your internship domain."
      />
      <WhatsAppCta />
    </div>
  );
}
