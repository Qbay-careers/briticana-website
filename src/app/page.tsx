import type { Metadata } from "next";

import { homeHeroFromSanity } from "@/components/marketing/homeHero";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import MarketingVendorScripts from "@/components/marketing/MarketingVendorScripts";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getHomePage } from "@/lib/sanity/queries";
import type { HomePage } from "@/lib/sanity/types";

import "@/styles/marketing-home.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Briticana — internship experiences and a startup showcase. Learn the skills of tomorrow with mentor-led programs across Europe.",
  icons: {
    icon: "/edumove/images/favicon.png",
  },
};

export default async function HomePage() {
  let homeDoc: HomePage | null = null;
  if (isSanityConfigured()) {
    try {
      homeDoc = await client.fetch<HomePage | null>(getHomePage);
    } catch {
      homeDoc = null;
    }
  }
  const homeHero = homeHeroFromSanity(homeDoc);

  return (
    <>
      <MarketingPageShell homeHero={homeHero} />
      <MarketingVendorScripts />
    </>
  );
}
