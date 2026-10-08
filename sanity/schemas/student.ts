import { defineField, defineType } from "sanity";

export default defineType({
  name: "student",
  title: "Student Verification",
  type: "document",
  fields: [
    defineField({ name: "studentName", title: "Student name", type: "string" }),
    defineField({
      name: "internshipId",
      title: "Student ID / Certificate ID",
      type: "string",
      description: "Unique Student ID or Certificate ID used for public verification lookup.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "domain", title: "Domain", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "region", title: "Region", type: "string" }),
    defineField({
      name: "completionStatus",
      title: "Completion status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In progress", value: "in-progress" },
          { title: "Not started", value: "not-started" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "certificateIssued",
      title: "Certificate issued",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "mentorEvaluation",
      title: "Mentor evaluation",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "studentName", code: "internshipId" },
    prepare({ title, code }) {
      return { title: title ?? "Student", subtitle: code };
    },
  },
});
