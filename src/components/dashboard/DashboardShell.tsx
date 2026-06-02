import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  // TODO: render student dashboard chrome: welcome header, quick links, and responsive grid for tracker + submissions.
  return (
    <div className="container py-4" data-component="DashboardShell">
      <div className="row g-4">{children}</div>
    </div>
  );
}
