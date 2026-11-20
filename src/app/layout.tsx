import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { buildPageAlternates, getSiteBaseUrl, PRODUCTION_SITE_URL } from "@/lib/seo/siteSeo";

import "@/styles/globals.css";

const siteBaseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: "Briticana: Real Project Internships, Work & Skill Experience",
    template: "%s | Briticana",
  },
  description:
    "Join Briticana for real project internships and hands-on work experience. Learn practical skills, view Google & European tracks, and grow your career.",
  authors: [{ name: "Briticana", url: `${siteBaseUrl}/experience-centers` }],
  creator: "Briticana",
  publisher: "Briticana",
  alternates: buildPageAlternates("/"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
    title: "Briticana: Real Project Internships, Work & Skill Experience",
    description:
      "Join Briticana for real project internships and hands-on work experience. Learn practical skills, view Google & European tracks, and grow your career.",
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
  verification: {
    google: "sXXCcXtHj-U8A3MQXDFLqVgLtUXALpst3mIyTkKSctQ",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${PRODUCTION_SITE_URL}/#organization`,
      name: "Briticana",
      url: PRODUCTION_SITE_URL,
      description:
        "Briticana connects learners with structured internship experiences and showcases collaboration with startups across Ireland, the UK, Germany, and Finland.",
      email: "Info@briticana.us",
      telephone: "+17342498898",
      sameAs: ["https://www.linkedin.com/company/briticana/"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "2nd Floor, Room Number 019, 206 E Huron St",
        addressLocality: "Ann Arbor",
        addressRegion: "MI",
        postalCode: "48104",
        addressCountry: "US",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@briticana.us",
          telephone: "+17342498898",
          availableLanguage: ["English"],
        },
      ],
      logo: {
        "@type": "ImageObject",
        url: `${PRODUCTION_SITE_URL}/android-chrome-512x512.png?v=3`,
        width: 512,
        height: 512,
      },
      image: `${PRODUCTION_SITE_URL}/android-chrome-512x512.png?v=3`,
    },
    {
      "@type": "WebSite",
      "@id": `${PRODUCTION_SITE_URL}/#website`,
      url: PRODUCTION_SITE_URL,
      name: "Briticana",
      inLanguage: "en",
      publisher: {
        "@id": `${PRODUCTION_SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${PRODUCTION_SITE_URL}/internships?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteBaseUrl}/#webpage`,
      url: siteBaseUrl,
      name: "Briticana: Real Project Internships, Work & Skill Experience",
      isPartOf: {
        "@id": `${PRODUCTION_SITE_URL}/#website`,
      },
      about: {
        "@id": `${PRODUCTION_SITE_URL}/#organization`,
      },
      author: {
        "@id": `${PRODUCTION_SITE_URL}/#organization`,
      },
      publisher: {
        "@id": `${PRODUCTION_SITE_URL}/#organization`,
      },
      datePublished: "2026-01-15T00:00:00Z",
      dateModified: "2026-11-12T00:00:00Z",
      inLanguage: "en",
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
        <meta
          name="google-site-verification"
          content="sXXCcXtHj-U8A3MQXDFLqVgLtUXALpst3mIyTkKSctQ"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        />
        <link rel="preload" as="image" href="/images/hero-map.webp" fetchPriority="high" />
        <link rel="stylesheet" href="/edumove/css/remixicon.css" />
        <link rel="stylesheet" href="/edumove/css/style.css" />
        <link rel="stylesheet" href="/edumove/css/responsive.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}