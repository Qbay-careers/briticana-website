import createImageUrlBuilder from "@sanity/image-url";

import type { SanityImage } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForSanityImage(source: SanityImage | undefined, width = 1200, height?: number): string | undefined {
  if (!projectId || !source?.asset?._ref) return undefined;
  const image = builder.image(source).width(width).auto("format");
  return height ? image.height(height).fit("crop").url() : image.url();
}
