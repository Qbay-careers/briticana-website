import type { InternshipDurationOption, InternshipRegion } from "@/lib/sanity/types";

/** Values aligned with Sanity schema — used by filter UI and GROQ. */
export const INTERNSHIP_REGIONS: InternshipRegion[] = [
  "Ireland",
  "United Kingdom",
  "Germany",
  "Finland",
  "Sweden",
];

export const INTERNSHIP_DURATIONS: InternshipDurationOption[] = ["3 months", "6 months", "9 months"];
