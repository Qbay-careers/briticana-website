import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp number", type: "string" }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp link",
      type: "url",
      description: "e.g. https://wa.me/3531234567890",
    }),
    defineField({ name: "contactNumber", title: "Contact number", type: "string" }),
    defineField({ name: "officeAddress", title: "Office address", type: "text", rows: 3 }),
    defineField({ name: "googleMapsLink", title: "Google Maps link", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "youtube", title: "YouTube", type: "url" }),
    defineField({ name: "starterPrice", title: "Starter price (label)", type: "string" }),
    defineField({ name: "proPrice", title: "Pro price (label)", type: "string" }),
    defineField({
      name: "internshipBatchApplyUrl",
      title: 'Internships page — "Apply Now" link',
      type: "string",
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
