import type { ReactNode } from "react";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Briticana — Internships & startup showcase",
    template: "%s | Briticana",
  },
  description:
    "Briticana connects learners with structured internship experiences and showcases collaboration with startups across Ireland, the UK, Germany, and Finland.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">{children}</body>
    </html>
  );
}
