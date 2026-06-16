import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEMO_AUTH_COOKIE = "briticana_demo_auth";

/** Cookie holds the workflow stage id once signed in (see demoStudentAccounts). */
const KNOWN_PROFILE_IDS = ["started", "midway", "open", "completed"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(DEMO_AUTH_COOKIE)?.value;
    if (!token || !KNOWN_PROFILE_IDS.includes(token)) {
      const login = new URL("/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
