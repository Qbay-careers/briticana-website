import { defineField, defineType } from "sanity";

const DOMAINS = [
  { title: "Software Engineering", value: "software-engineering" },
  { title: "Data Science & Analytics", value: "data-science-analytics" },
  { title: "Cybersecurity", value: "cybersecurity" },
  { title: "UX / UI Design", value: "ux-ui-design" },
  { title: "Digital Marketing", value: "digital-marketing" },
  { title: "Cloud & DevOps", value: "cloud-devops" },
  { title: "Artificial Intelligence", value: "artificial-intelligence" },
  { title: "Mobile Development", value: "mobile-development" },
  { title: "Web Development", value: "web-development" },
  { title: "Product Management", value: "product-management" },
  { title: "Business Analysis", value: "business-analysis" },
  { title: "FinTech", value: "fintech" },
] as const;

const DURATION_OPTIONS = [
  { title: "3 months", value: "3 months" },
  { title: "6 months", value: "6 months" },
  { title: "9 months", value: "9 months" },
] as const;

const REGIONS = [
  { title: "Ireland", value: "Ireland" },
  { title: "UK", value: "UK" },
  { title: "Germany", value: "Germany" },
  { title: "Finland", value: "Finland" },
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
      type: "string",
      options: { list: [...DOMAINS], layout: "dropdown" },
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
    select: { title: "title", domain: "domain" },
    prepare({ title, domain }) {
      return { title: title ?? "Untitled", subtitle: domain };
    },
  },
});
