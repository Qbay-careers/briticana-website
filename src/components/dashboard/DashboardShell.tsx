import type { ReactNode } from "react";

import DashboardSignOutButton from "@/components/dashboard/DashboardSignOutButton";
import type { QuickStat, StudentProfile } from "@/lib/demo/studentDashboard";

type DashboardShellProps = {
  profile: StudentProfile;
  quickStats: readonly QuickStat[];
  children: ReactNode;
};

export default function DashboardShell({ profile, quickStats, children }: DashboardShellProps) {
  return (
    <div className="container mw-1345 py-5" data-component="DashboardShell">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
        <div className="d-flex align-items-center gap-3">
          <img
            src={profile.avatar}
            className="rounded-circle"
            style={{ width: "64px", height: "64px", objectFit: "cover" }}
            alt=""
          />
          <div>
            <h2 className="mb-1">
              Welcome back, <span>{profile.firstName}</span>
            </h2>
            <p className="text-secondary mb-0">{profile.program}</p>
          </div>
        </div>
        <DashboardSignOutButton />
      </div>

      <p className="small text-secondary col-lg-9 mb-4">
        Track your internship milestones, mentor reviews, and final deliverables.
      </p>

      <div className="row g-4 mb-4">
        {quickStats.map((stat) => (
          <div key={stat.id} className="col-sm-6 col-lg-3">
            <div className="bg-white rounded-4 shadow-sm h-100 p-4 d-flex align-items-center gap-3">
              <div
                className="d-flex justify-content-center align-items-center rounded-circle bg-f7f7f7 flex-shrink-0"
                style={{ width: "48px", height: "48px" }}
              >
                <i className={`${stat.icon} fs-5`} />
              </div>
              <div>
                <span className="small text-secondary d-block">{stat.label}</span>
                <strong className={stat.id === "verification" ? "font-monospace text-break" : undefined}>
                  {stat.value}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">{children}</div>
    </div>
  );
}
