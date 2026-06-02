// TODO: build Internships listing page
import BatchCalendar from "@/components/internships/BatchCalendar";
import FilterBar from "@/components/internships/FilterBar";
import InternshipCard from "@/components/internships/InternshipCard";

export default function InternshipsPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Internships</h1>
      <p className="lead text-secondary col-lg-9">
        Browse Briticana&apos;s open mentor-led tracks, compare batch timing across regions, and apply when your domain and duration align with startup demand.
      </p>
      <FilterBar />
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-xl-4">
          <InternshipCard />
        </div>
        <div className="col-md-6 col-xl-4">
          <InternshipCard />
        </div>
        <div className="col-md-6 col-xl-4">
          <InternshipCard />
        </div>
      </div>
      <BatchCalendar />
    </div>
  );
}
