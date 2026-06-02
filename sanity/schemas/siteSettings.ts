import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp number", type: "string" }),
    defineField({ name: "contactNumber", title: "Contact number", type: "string" }),
    defineField({ name: "officeAddress", title: "Office address", type: "text", rows: 3 }),
    defineField({ name: "googleMapsLink", title: "Google Maps link", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "youtube", title: "YouTube", type: "url" }),
    defineField({ name: "starterPrice", title: "Starter price (label)", type: "string" }),
    defineField({ name: "proPrice", title: "Pro price (label)", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
