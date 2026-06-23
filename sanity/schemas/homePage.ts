import { defineField, defineType } from "sanity";

/** Singleton: use fixed document id `homePage` in Studio (see desk structure). */
export default defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero section" },
    { name: "heroImages", title: "Hero floating images" },
    { name: "heroStrip", title: "Hero bottom strip" },
    { name: "about", title: "About section" },
    { name: "featured", title: "Featured internships" },
    { name: "certification", title: "Certification section" },
    { name: "testimonials", title: "Testimonials section" },
  ],
  fields: [
    // ── Hero text / CTAs ─────────────────────────────────────────────────
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero subheadline",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroOverview",
      title: "Short company overview",
      description: "Shown under the hero CTAs (PRD short overview).",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroCtaApplyUrl",
      title: "Apply CTA URL",
      type: "url",
      description: "Google Form or site path. Leave empty to use the default student application form.",
      group: "hero",
    }),
    defineField({
      name: "heroCtaExploreUrl",
      title: "Explore programs CTA URL",
      type: "url",
      description: "e.g. /programs or /internships",
      group: "hero",
    }),
    defineField({
      name: "heroWideBackgroundMode",
      title: "Small-screen background (under 1200px)",
      type: "string",
      group: "hero",
      description:
        "Controls the hero band on phones and tablets. Desktop (1200px+) always uses the floating image collage when slots are filled.",
      options: {
        list: [
          { title: "Background image", value: "image" },
          { title: "White background", value: "white" },
          { title: "No background image", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "heroImageWide",
      title: "Hero image — wide (under 1400px)",
      type: "image",
      group: "hero",
      description:
        "Landscape photo used when “Background image” is selected above. Recommended 16:9 (e.g. 1600×900). Leave empty for the default.",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.heroWideBackgroundMode !== "image",
    }),

    // ── Hero floating image slots (banner1–6) ────────────────────────────
    defineField({
      title: "Hero image — wide (under 1200px)",
      title: "Floating image — slot 1 (top-left)",
      type: "image",
      group: "heroImages",
      description: "Positioned top-left in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage2",
      title: "Floating image — slot 2 (top-center)",
      type: "image",
      group: "heroImages",
      description: "Positioned top-center in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage3",
      title: "Floating image — slot 3 (top-right)",
      type: "image",
      group: "heroImages",
      description: "Positioned top-right in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage4",
      title: "Floating image — slot 4 (bottom-left)",
      type: "image",
      group: "heroImages",
      description: "Positioned bottom-left in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage5",
      title: "Floating image — slot 5 (bottom-center)",
      type: "image",
      group: "heroImages",
      description: "Positioned bottom-center in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage6",
      title: "Floating image — slot 6 (bottom-right)",
      type: "image",
      group: "heroImages",
      description: "Positioned bottom-right in the hero. Portrait photo, min 290 × 340 px. Leave empty to use the default.",
      options: { hotspot: true },
    }),

    // ── Hero bottom strip ────────────────────────────────────────────────
    defineField({
      name: "stripMainImage",
      title: "Strip — main image (left, large)",
      type: "image",
      group: "heroStrip",
      description: "Large landscape image on the left. Recommended aspect ratio 1260 × 900. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "stripSideImage",
      title: "Strip — side image (right, tall)",
      type: "image",
      group: "heroStrip",
      description: "Tall portrait image on the right. Recommended aspect ratio 1030 × 1350. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "stripAvatar1",
      title: "Strip — educator avatar 1",
      type: "image",
      group: "heroStrip",
      description: "Small circular avatar (45 × 45 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "stripAvatar2",
      title: "Strip — educator avatar 2",
      type: "image",
      group: "heroStrip",
      description: "Small circular avatar (45 × 45 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "stripAvatar3",
      title: "Strip — educator avatar 3",
      type: "image",
      group: "heroStrip",
      description: "Small circular avatar (45 × 45 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "stripAvatar4",
      title: "Strip — educator avatar 4",
      type: "image",
      group: "heroStrip",
      description: "Small circular avatar (45 × 45 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),

    // ── About section ────────────────────────────────────────────────────
    defineField({
      name: "aboutImage",
      title: "About section — main image",
      type: "image",
      group: "about",
      description: "Large image on the left side of the 'What is Briticana?' section. Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuredInternships",
      title: "Featured internships",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "internship" }] }],
      validation: (Rule) => Rule.max(8),
      description: "Choose up to 8 internships to feature on the homepage.",
    }),

    // ── Certification section ─────────────────────────────────────────────
    defineField({
      name: "certImage",
      title: "Certification section — certificate image",
      type: "image",
      group: "certification",
      description: "Image on the right side of the Certification section (e.g. a certificate mockup). Leave empty to use the default.",
      options: { hotspot: true },
    }),
    // ── Testimonials section ─────────────────────────────────────────────
    defineField({
      name: "showTestimonials",
      title: "Show testimonials section",
      type: "boolean",
      group: "testimonials",
      initialValue: true,
    }),
    defineField({
      name: "testimonialAvatar1",
      title: "Testimonial community avatar 1",
      type: "image",
      group: "testimonials",
      description: "Small avatar in 'Join Our Growing Community' (60 × 60 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "testimonialAvatar2",
      title: "Testimonial community avatar 2",
      type: "image",
      group: "testimonials",
      description: "Small avatar in 'Join Our Growing Community' (60 × 60 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "testimonialAvatar3",
      title: "Testimonial community avatar 3",
      type: "image",
      group: "testimonials",
      description: "Small avatar in 'Join Our Growing Community' (60 × 60 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "testimonialAvatar4",
      title: "Testimonial community avatar 4",
      type: "image",
      group: "testimonials",
      description: "Small avatar in 'Join Our Growing Community' (60 × 60 px). Leave empty to use the default.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
