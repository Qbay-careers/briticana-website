import { defineField, defineType } from "sanity";

/**
 * CMS-managed domain/category for internships.
 * Internships reference this document (like a foreign key) instead of a hardcoded string list.
 */
export default defineType({
  name: "internshipDomain",
  title: "Internship domain",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Program / domain title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Stable id for URLs and filters (e.g. data-analysis).",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortOverview",
      title: "Short overview",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "Optional icon or image used for domain cards. Prefer SVG for crisp vector icons.",
      options: { hotspot: true },
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first in Studio lists (optional).",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] },
    { title: "Title A–Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title: title ?? "Untitled", subtitle: slug ? `/${slug}` : undefined };
    },
  },
});
