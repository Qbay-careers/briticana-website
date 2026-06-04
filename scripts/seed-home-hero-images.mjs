import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "next-sanity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const HERO_FILES = [
  "hero-collaboration-1.png",
  "hero-collaboration-2.png",
  "hero-collaboration-3.png",
  "hero-collaboration-4.png",
  "hero-collaboration-5.png",
  "hero-collaboration-6.png",
];

function loadLocalEnv() {
  const envPath = path.join(rootDir, ".env.local");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const [rawKey, ...rawValueParts] = trimmed.split("=");
    const key = rawKey.trim();
    const value = rawValueParts.join("=").trim().replace(/^["']|["']$/g, "");
    process.env[key] ??= value;
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required. Add it to .env.local before running this script.`);
  }
  return value;
}

async function main() {
  loadLocalEnv();

  const projectId = requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const token = requireEnv("SANITY_API_TOKEN");

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-10-01",
    useCdn: false,
  });

  const heroDir = path.join(rootDir, "public", "edumove", "hero");
  const imageRefs = [];

  for (const [index, filename] of HERO_FILES.entries()) {
    const filePath = path.join(heroDir, filename);
    if (!existsSync(filePath)) {
      throw new Error(`Missing hero image: ${filePath}`);
    }

    console.log(`Uploading ${filename}...`);
    const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
    imageRefs.push({
      _key: `heroFloatingImage${index + 1}`,
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    });
  }

  await client.createIfNotExists({
    _id: "homePage",
    _type: "homePage",
    heroHeadline: "Build Real Industry Experience",
  });

  await client.patch("homePage").set({ heroFloatingImages: imageRefs }).commit();

  console.log("Done. The Home page hero floating images are now seeded in Sanity.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
