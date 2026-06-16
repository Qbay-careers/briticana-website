/**
 * Demo student logins - server-only. Each account maps to a dashboard workflow
 * stage so the portal can be demoed at different points in the journey.
 *
 * All stage accounts share one password (DEMO_STUDENT_PASSWORD env, or the
 * fallback below). The legacy DEMO_STUDENT_EMAIL account still works and maps to
 * the default stage. Never import this module from client components.
 */
import { getDemoStudentCredentials } from "@/lib/auth/demoStudentCredentials";
import {
  DEFAULT_DASHBOARD_PROFILE_ID,
  DASHBOARD_PROFILE_ORDER,
  getDashboardProfile,
  type DashboardProfileId,
} from "@/lib/demo/studentDashboard";

const FALLBACK_SHARED_PASSWORD = "Brit1cana#2026";

export type DemoAccount = {
  email: string;
  password: string;
  profileId: DashboardProfileId;
};

function sharedPassword(): string {
  return getDemoStudentCredentials()?.password ?? FALLBACK_SHARED_PASSWORD;
}

/** One account per workflow stage, plus the legacy env account. */
export function getDemoStudentAccounts(): DemoAccount[] {
  const password = sharedPassword();
  const stageAccounts: DemoAccount[] = DASHBOARD_PROFILE_ORDER.map((profileId) => ({
    email: getDashboardProfile(profileId).profile.email,
    password,
    profileId,
  }));

  const env = getDemoStudentCredentials();
  if (env) {
    const alreadyListed = stageAccounts.some(
      (a) => a.email.trim().toLowerCase() === env.email.trim().toLowerCase(),
    );
    if (!alreadyListed) {
      stageAccounts.push({
        email: env.email,
        password: env.password,
        profileId: DEFAULT_DASHBOARD_PROFILE_ID,
      });
    }
  }

  return stageAccounts;
}

/** Returns the matching stage id for valid credentials, otherwise null. */
export function resolveDemoAccount(email: string, password: string): DashboardProfileId | null {
  const normalizedEmail = email.trim().toLowerCase();
  const account = getDemoStudentAccounts().find(
    (a) => a.email.trim().toLowerCase() === normalizedEmail && a.password === password,
  );
  return account?.profileId ?? null;
}
