// TODO: build Internship detail page
import InternshipCard from "@/components/internships/InternshipCard";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusBadge from "@/components/shared/StatusBadge";

type InternshipDetailPageProps = {
  params: { slug: string };
};

export default function InternshipDetailPage({ params }: InternshipDetailPageProps) {
  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
        <h1 className="mb-0">Internship detail</h1>
        <StatusBadge label="Application status" variant="info" />
      </div>
      <p className="text-secondary col-lg-9">
        This route will hydrate from Sanity for slug <span className="fw-semibold text-body">{params.slug}</span>, showing overview, skills, tools, certification, and the Google Form link when applications are open.
      </p>
      <SectionHeading
        kicker="Related"
        title="Comparable tracks"
        description="Once live, this area can surface sibling internships in the same domain or region."
      />
      <div className="row g-4">
        <div className="col-md-6">
          <InternshipCard />
        </div>
      </div>
    </div>
  );
}
