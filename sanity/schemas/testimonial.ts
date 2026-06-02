import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "studentName", title: "Student name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "cohortTag", title: "Cohort tag", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "studentName", subtitle: "role" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Unnamed", subtitle };
    },
  },
});
