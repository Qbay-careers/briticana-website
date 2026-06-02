import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5 }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question", order: "order" },
    prepare({ title, order }) {
      return { title: title ?? "Untitled", subtitle: order != null ? `#${order}` : undefined };
    },
  },
});
