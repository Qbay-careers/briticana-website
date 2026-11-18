import type { MetadataRoute } from "next";

import { SUPPLEMENTAL_CORE_TRACKS } from "@/lib/internships/supplementalTracks";
import { getSiteBaseUrl } from "@/lib/seo/siteSeo";

const STATIC_PUBLIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/internships", changeFrequency: "weekly", priority: 0.9 },
  { path: "/domains", changeFrequency: "weekly", priority: 0.8 },
  { path: "/experience-centers", changeFrequency: "monthly", priority: 0.8 },
  { path: "/briticana-world", changeFrequency: "monthly", priority: 0.8 },
  { path: "/verification", changeFrequency: "monthly", priority: 0.7 },
  { path: "/apply", changeFrequency: "monthly", priority: 0.8 },
  { path: "/google-apply", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.4 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/certification-policy", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteBaseUrl();
  const lastModified = new Date("2026-11-12T00:00:00.000Z");

  const entries: MetadataRoute.Sitemap = STATIC_PUBLIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const seenSlugs = new Set<string>();
  for (const track of SUPPLEMENTAL_CORE_TRACKS) {
    const slug = track.slug?.current?.trim();
    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    entries.push({
      url: `${baseUrl}/internships/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
