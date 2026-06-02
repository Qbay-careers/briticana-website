// TODO: build Programs overview page
import DomainCard from "@/components/programs/DomainCard";
import DurationCard from "@/components/programs/DurationCard";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ProgramsPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Programs</h1>
      <p className="lead text-secondary col-lg-9">
        Briticana programs bundle internships with a clear delivery arc—pick a domain, choose how deep you want to go, and graduate with artifacts startups recognize.
      </p>
      <SectionHeading
        kicker="Domains"
        title="Where you can specialize"
        description="Each domain maps to Sanity-managed internship content and mentor expectations."
      />
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <DomainCard />
        </div>
        <div className="col-md-4">
          <DomainCard />
        </div>
        <div className="col-md-4">
          <DomainCard />
        </div>
      </div>
      <SectionHeading
        kicker="Duration"
        title="Pick the depth that matches your runway"
        description="Three-, six-, and nine-month options balance learning velocity with portfolio depth."
      />
      <div className="row g-4">
        <div className="col-md-4">
          <DurationCard />
        </div>
        <div className="col-md-4">
          <DurationCard />
        </div>
        <div className="col-md-4">
          <DurationCard />
        </div>
      </div>
    </div>
  );
}
