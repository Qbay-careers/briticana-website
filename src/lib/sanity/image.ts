import createImageUrlBuilder from "@sanity/image-url";

import type { SanityImage } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForSanityImage(source: SanityImage | undefined, width = 1200): string | undefined {
  if (!projectId || !source?.asset?._ref) return undefined;
  return builder.image(source).width(width).auto("format").url();
}
