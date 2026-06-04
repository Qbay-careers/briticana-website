import { defineField, defineType } from "sanity";

const DURATION_OPTIONS = [
  { title: "3 months", value: "3 months" },
  { title: "6 months", value: "6 months" },
  { title: "9 months", value: "9 months" },
] as const;

const REGIONS = [
  { title: "Ireland", value: "Ireland" },
  { title: "United Kingdom", value: "United Kingdom" },
  { title: "Germany", value: "Germany" },
  { title: "Finland", value: "Finland" },
  { title: "Sweden", value: "Sweden" },
] as const;

export default defineType({
  name: "internship",
  title: "Internship",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "domain",
      title: "Domain",
      type: "reference",
      to: [{ type: "internshipDomain" }],
      description: "Category for this program — managed under Internship domains.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "skillsCovered",
      title: "Skills covered",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "toolsUsed",
      title: "Tools used",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "durationOptions",
      title: "Duration options",
      type: "array",
      of: [
        {
          type: "string",
          options: { list: [...DURATION_OPTIONS], layout: "radio" },
        },
      ],
    }),
    defineField({
      name: "availableRegions",
      title: "Available regions",
      type: "array",
      of: [
        {
          type: "string",
          options: { list: [...REGIONS], layout: "checkbox" },
        },
      ],
    }),
    defineField({
      name: "certificationDetails",
      title: "Certification details",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "projectStructure",
      title: "Project structure",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "applicationStatus",
      title: "Application status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Closed", value: "closed" },
          { title: "Coming soon", value: "coming-soon" },
        ],
        layout: "radio",
      },
      initialValue: "open",
    }),
    defineField({
      name: "batchStartDate",
      title: "Batch start date",
      type: "date",
    }),
    defineField({
      name: "googleFormLink",
      title: "Google Form link",
      type: "url",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", domainTitle: "domain.title" },
    prepare({ title, domainTitle }) {
      return { title: title ?? "Untitled", subtitle: domainTitle ?? "Select a domain" };
    },
  },
});
