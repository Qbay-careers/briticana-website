/** True when public reads against Sanity are expected to work (project id set). */
export function isSanityConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "8lpmdwks";
  return Boolean(id && id !== "placeholder-not-configured");
}
