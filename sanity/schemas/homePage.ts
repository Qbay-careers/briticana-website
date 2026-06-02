import { defineField, defineType } from "sanity";

/** Singleton: use fixed document id `homePage` in Studio (see desk structure). */
export default defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero subheadline",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroOverview",
      title: "Short company overview",
      description: "Shown under the hero CTAs (PRD short overview).",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroCtaApplyUrl",
      title: "Apply CTA URL",
      type: "url",
      description: "e.g. Google Form or /contact",
    }),
    defineField({
      name: "heroCtaExploreUrl",
      title: "Explore programs CTA URL",
      type: "url",
      description: "e.g. /programs or /internships",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
