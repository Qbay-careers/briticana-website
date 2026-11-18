import type { Metadata } from "next";

export const PRODUCTION_SITE_URL = "https://www.briticana.us";

export function getSiteBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) return envUrl.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return PRODUCTION_SITE_URL;
}

export function buildPageAlternates(pathname: string): NonNullable<Metadata["alternates"]> {
  const normalizedPath = pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  return {
    canonical: normalizedPath,
    languages: {
      en: normalizedPath,
      "en-US": normalizedPath,
      "en-GB": normalizedPath,
      "x-default": normalizedPath,
    },
  };
}
