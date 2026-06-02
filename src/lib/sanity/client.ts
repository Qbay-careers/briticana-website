import { createClient, type SanityClient } from "next-sanity";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
/** next-sanity throws if projectId is empty; placeholder allows importing this module in CI without env. Only call `fetch` when `isSanityConfigured()` is true. */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "placeholder-not-configured";

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  useCdn: dataset === "production",
  token: process.env.SANITY_API_TOKEN || undefined,
  perspective: "published",
});
