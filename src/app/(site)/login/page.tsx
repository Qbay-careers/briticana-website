// TODO: build Login page (demo UI only)
import Link from "next/link";

import SectionHeading from "@/components/shared/SectionHeading";

export default function LoginPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Login</h1>
      <p className="lead text-secondary col-lg-9">
        This screen is a visual placeholder only—Briticana authentication is out of scope for this scaffold. Use the demo dashboard link below to preview learner UI.
      </p>
      <SectionHeading
        title="Demo access"
        description="When real auth ships, this page will handle magic links or SSO. For now, navigate straight to the dashboard mock."
      />
      <Link className="btn btn-primary" href="/dashboard">
        Open demo dashboard
      </Link>
    </div>
  );
}
