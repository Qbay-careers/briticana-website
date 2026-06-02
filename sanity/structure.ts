import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Briticana")
    .items([
      S.listItem()
        .title("Home page")
        .id("homePageSingleton")
        .child(S.document().schemaType("homePage").documentId("homePage").title("Home page")),
      S.listItem()
        .title("Site settings")
        .id("siteSettingsSingleton")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings")),
      S.divider(),
      S.listItem()
        .title("Internships")
        .id("internshipList")
        .child(S.documentTypeList("internship").title("Internships").defaultOrdering([{ field: "title", direction: "asc" }])),
      S.listItem()
        .title("Testimonials")
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem()
        .title("FAQ items")
        .child(S.documentTypeList("faqItem").title("FAQ items")),
      S.listItem()
        .title("Startup partners")
        .child(S.documentTypeList("startupPartner").title("Startup partners")),
      S.divider(),
      S.listItem()
        .title("Students (verification demo)")
        .child(S.documentTypeList("student").title("Students")),
    ]);
