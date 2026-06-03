import type { ReactNode } from "react";
import { Suspense } from "react";

import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingVendorScripts from "@/components/marketing/MarketingVendorScripts";
import ScrollCueRouteSync from "@/components/marketing/ScrollCueRouteSync";
import MarketingCopyrightBar from "@/components/marketing/sections/MarketingCopyrightBar";
import MarketingFooterSection from "@/components/marketing/sections/MarketingFooterSection";

import "@/styles/marketing-home.css";

type PortalLayoutProps = {
  children: ReactNode;
};

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <div className="marketing-home-root d-flex flex-column min-vh-100">
      <MarketingNav />
      <main className="flex-grow-1">{children}</main>
      <footer className="mt-auto">
        <MarketingFooterSection />
        <MarketingCopyrightBar />
      </footer>
      <MarketingVendorScripts />
      <Suspense fallback={null}>
        <ScrollCueRouteSync />
      </Suspense>
    </div>
  );
}
