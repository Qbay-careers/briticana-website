import { defineField, defineType } from "sanity";

export default defineType({
  name: "startupPartner",
  title: "Startup partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "collaborationType",
      title: "Collaboration type",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "collaborationType" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Partner", subtitle };
    },
  },
});
