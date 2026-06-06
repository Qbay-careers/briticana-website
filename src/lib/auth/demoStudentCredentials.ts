/**
 * Demo student login — server-only. Set DEMO_STUDENT_EMAIL and DEMO_STUDENT_PASSWORD in the environment
 * (e.g. .env.local). Never import this module from client components.
 */
export function getDemoStudentCredentials(): { email: string; password: string } | null {
  const email = process.env.DEMO_STUDENT_EMAIL?.trim();
  const password = process.env.DEMO_STUDENT_PASSWORD?.trim();
  if (!email || !password) {
    return null;
  }
  return { email, password };
}

export function validateDemoStudentCredentials(email: string, password: string): boolean {
  const creds = getDemoStudentCredentials();
  if (!creds) return false;
  const a = email.trim().toLowerCase();
  const b = creds.email.trim().toLowerCase();
  if (a !== b) return false;
  return password === creds.password;
}
