import InternshipsExplorerSection from "@/components/internships/InternshipsExplorerSection";
import InternshipSectionIntro from "@/components/internships/InternshipSectionIntro";
import type { Internship } from "@/lib/sanity/types";

export type MarketingCoursesSectionProps = {
  internships: Internship[];
};

export default function MarketingCoursesSection({ internships }: MarketingCoursesSectionProps) {
  return (
    <section className="courses-area briti-internship-section">
      <div className="container mw-1380">
        <InternshipSectionIntro showBreadcrumbs={false} />
        <InternshipsExplorerSection internships={internships} isHomePreview={true} />
      </div>
    </section>
  );
}
