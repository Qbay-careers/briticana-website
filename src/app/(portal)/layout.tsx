import type { ReactNode } from "react";

import MarketingNav from "@/components/marketing/MarketingNav";
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
      const fetchPromise = client.fetch<SiteSettings | null>(getSiteSettings);
      const timeoutPromise = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 1500),
      );
      settings = await Promise.race([fetchPromise, timeoutPromise]);
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
    </div>
  );
}
