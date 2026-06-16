import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

import CertificateView from "@/components/dashboard/CertificateView";
import { getDashboardProfile } from "@/lib/demo/studentDashboard";

const DEMO_AUTH_COOKIE = "briticana_demo_auth";

export const metadata: Metadata = {
  title: "Certificate",
  description: "View your Briticana experience certificate.",
};

export default function CertificatePage() {
  const token = cookies().get(DEMO_AUTH_COOKIE)?.value;
  const data = getDashboardProfile(token);
  const isReady = data.submission.phase === "certificate_ready";

  return (
    <div className="container mw-1345 py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <h2 className="mb-0">Certificate</h2>
        <Link href="/dashboard" className="main-btn black">
          <i className="ri-arrow-left-line me-2" aria-hidden /> Back to dashboard
        </Link>
      </div>

      {isReady ? (
        <CertificateView profile={data.profile} issuedDate={data.submission.certificateIssuedDate} />
      ) : (
        <div className="bg-white rounded-4 shadow-sm p-4 p-sm-5 text-center">
          <i className="ri-time-line text-secondary" style={{ fontSize: "2.5rem" }} aria-hidden />
          <h3 className="mt-3 mb-1">Your certificate isn&apos;t issued yet</h3>
          <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "520px" }}>
            Complete your internship and submit your final deliverables for mentor review. Once approved, your
            experience certificate will appear here.
          </p>
          <Link href="/dashboard" className="main-btn">
            Back to dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
