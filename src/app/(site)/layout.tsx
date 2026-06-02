import type { ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getSiteSettings } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";

type SiteLayoutProps = {
  children: ReactNode;
};

export default async function SiteLayout({ children }: SiteLayoutProps) {
  let settings: SiteSettings | null = null;
  if (isSanityConfigured()) {
    try {
      settings = await client.fetch<SiteSettings | null>(getSiteSettings);
    } catch {
      settings = null;
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100 flex-grow-1 w-100">
      <Navbar />
      <main className="flex-grow-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
