import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  useCdn: dataset === "production",
  token: process.env.SANITY_API_TOKEN || undefined,
  perspective: "published",
});
