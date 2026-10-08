import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "8lpmdwks";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export default defineConfig({
  name: "briticana",
  title: "Briticana CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
