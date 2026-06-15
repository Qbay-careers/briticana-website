import type { ReactNode } from "react";
import { Suspense } from "react";

import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingVendorScripts from "@/components/marketing/MarketingVendorScripts";
import ScrollCueRouteSync from "@/components/marketing/ScrollCueRouteSync";
import MarketingCopyrightBar from "@/components/marketing/sections/MarketingCopyrightBar";
import MarketingFooterSection from "@/components/marketing/sections/MarketingFooterSection";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getSiteSettings } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";

import "@/styles/marketing-home.css";

type PortalLayoutProps = {
  children: ReactNode;
};

export default async function PortalLayout({ children }: PortalLayoutProps) {
  let settings: SiteSettings | null = null;
  if (isSanityConfigured()) {
    try {
      settings = await client.fetch<SiteSettings | null>(getSiteSettings);
    } catch {
      settings = null;
    }
  }

  return (
    <div className="marketing-home-root d-flex flex-column min-vh-100">
      <MarketingNav settings={settings} />
      <main className="flex-grow-1">{children}</main>
      <footer className="mt-auto">
        <MarketingFooterSection settings={settings} />
        <MarketingCopyrightBar />
      </footer>
      <MarketingVendorScripts />
      <Suspense fallback={null}>
        <ScrollCueRouteSync />
      </Suspense>
    </div>
  );
}
