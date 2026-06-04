import { defineField, defineType } from "sanity";

/** Singleton: use fixed document id `homePage` in Studio (see desk structure). */
export default defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero section" },
    { name: "heroImages", title: "Hero floating images" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      group: "hero",
      // No required() — code falls back to a default when empty,
      // so the client can publish image-only changes without a headline.
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero subheadline",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroOverview",
      title: "Short company overview",
      description: "Shown under the hero CTAs (PRD short overview).",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroCtaApplyUrl",
      title: "Apply CTA URL",
      type: "url",
      description: "e.g. Google Form or /contact",
      group: "hero",
    }),
    defineField({
      name: "heroCtaExploreUrl",
      title: "Explore programs CTA URL",
      type: "url",
      description: "e.g. /programs or /internships",
      group: "hero",
    }),

    // ── Hero floating image slots ─────────────────────────────────────────
    defineField({
      name: "heroImage1",
      title: "Floating image — slot 1 (top-left)",
      type: "image",
      group: "heroImages",
      description: "Positioned top-left in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage2",
      title: "Floating image — slot 2 (top-center)",
      type: "image",
      group: "heroImages",
      description: "Positioned top-center in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage3",
      title: "Floating image — slot 3 (top-right)",
      type: "image",
      group: "heroImages",
      description: "Positioned top-right in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage4",
      title: "Floating image — slot 4 (bottom-left)",
      type: "image",
      group: "heroImages",
      description: "Positioned bottom-left in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage5",
      title: "Floating image — slot 5 (bottom-center)",
      type: "image",
      group: "heroImages",
      description: "Positioned bottom-center in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage6",
      title: "Floating image — slot 6 (bottom-right)",
      type: "image",
      group: "heroImages",
      description: "Positioned bottom-right in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
