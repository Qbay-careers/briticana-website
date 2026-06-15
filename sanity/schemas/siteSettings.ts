import { defineField, defineType } from "sanity";

const footerLinkFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "href",
    title: "Link",
    type: "string",
    description: "Use a site path such as /programs or a full https:// URL.",
    validation: (Rule) =>
      Rule.required().custom((value) =>
        !value || value.startsWith("/") || /^https?:\/\//i.test(value)
          ? true
          : "Enter a site path beginning with / or a full http(s) URL.",
      ),
  }),
];

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social links" },
    { name: "navigation", title: "Marketing navigation" },
    { name: "footer", title: "Marketing footer" },
    { name: "other", title: "Other" },
  ],
  fields: [
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp number", type: "string", group: "contact" }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp link",
      type: "url",
      group: "contact",
      description: "e.g. https://wa.me/3531234567890",
    }),
    defineField({ name: "contactNumber", title: "Contact number", type: "string", group: "contact" }),
    defineField({ name: "officeAddress", title: "Office address", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "googleMapsLink", title: "Google Maps link", type: "url", group: "contact" }),
    defineField({ name: "instagram", title: "Instagram", type: "url", group: "social" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url", group: "social" }),
    defineField({ name: "facebook", title: "Facebook", type: "url", group: "social" }),
    defineField({ name: "twitter", title: "X / Twitter", type: "url", group: "social" }),
    defineField({ name: "youtube", title: "YouTube", type: "url", group: "social" }),
    defineField({
      name: "marketingApplyUrl",
      title: '"Apply Now" link',
      type: "string",
      group: "navigation",
      description: "Link used by the Apply Now button in the marketing navigation.",
      validation: (Rule) =>
        Rule.custom((value) =>
          !value || value.startsWith("/") || /^https?:\/\//i.test(value)
            ? true
            : "Enter a site path beginning with / or a full http(s) URL.",
        ),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      rows: 3,
      group: "footer",
      description: "Short brand description shown below the logo.",
    }),
    defineField({
      name: "footerLocations",
      title: "Footer locations",
      type: "string",
      group: "footer",
      description: "Short location list, for example: Dublin, London, Berlin",
    }),
    defineField({
      name: "footerExploreLinks",
      title: "Explore links",
      type: "array",
      group: "footer",
      validation: (Rule) => Rule.max(8),
      of: [
        {
          name: "footerExploreLink",
          title: "Explore link",
          type: "object",
          fields: footerLinkFields,
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "footerPageLinks",
      title: "Page links",
      type: "array",
      group: "footer",
      validation: (Rule) => Rule.max(8),
      of: [
        {
          name: "footerPageLink",
          title: "Page link",
          type: "object",
          fields: footerLinkFields,
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({ name: "starterPrice", title: "Starter price (label)", type: "string", group: "other" }),
    defineField({ name: "proPrice", title: "Pro price (label)", type: "string", group: "other" }),
    defineField({
      name: "internshipBatchApplyUrl",
      title: 'Internships page - "Apply Now" link',
      type: "string",
      group: "other",
      description:
        'Target for the green "Apply Now" button in the Choose Your Start Date section on /internships. Use a full URL (e.g. Google Form) or a site path such as /contact.',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
