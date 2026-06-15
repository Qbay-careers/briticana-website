/** Split "Data Analyst — Advanced Analytics…" into a short title + descriptive subtitle. */
export function splitInternshipTitle(title: string): { main: string; subtitle?: string } {
  const match = title.split(/\s[—–-]\s/);
  if (match.length > 1) {
    const [main, ...rest] = match;
    return { main: main.trim(), subtitle: rest.join(" — ").trim() };
  }
  return { main: title.trim() };
}
