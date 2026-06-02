import type { Metadata } from "next";

import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import MarketingVendorScripts from "@/components/marketing/MarketingVendorScripts";

import "@/styles/marketing-home.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Briticana — internship experiences and a startup showcase. Learn the skills of tomorrow with mentor-led programs across Europe.",
  icons: {
    icon: "/edumove/images/favicon.png",
  },
};

export default function HomePage() {
  return (
    <>
      <MarketingPageShell />
      <MarketingVendorScripts />
    </>
  );
}
