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
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "48x48" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png?v=3", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png?v=3", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Briticana — Internships & startup showcase",
    description:
      "Briticana connects learners with structured internship experiences and showcases collaboration with startups across Ireland, the UK, Germany, and Finland.",
    url: "https://www.briticana.us",
    siteName: "Briticana",
    images: [
      {
        url: "https://www.briticana.us/android-chrome-512x512.png?v=3",
        width: 512,
        height: 512,
        alt: "Briticana Logo",
      },
    ],
    type: "website",
  },
  manifest: "/site.webmanifest",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.briticana.us/#organization",
      name: "Briticana",
      url: "https://www.briticana.us",
      logo: {
        "@type": "ImageObject",
        url: "https://www.briticana.us/android-chrome-512x512.png?v=3",
        width: 512,
        height: 512,
      },
      image: "https://www.briticana.us/android-chrome-512x512.png?v=3",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.briticana.us/#website",
      url: "https://www.briticana.us",
      name: "Briticana",
      publisher: {
        "@id": "https://www.briticana.us/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.briticana.us/internships?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="d-flex flex-column min-vh-100">{children}</body>
    </html>
  );
}

