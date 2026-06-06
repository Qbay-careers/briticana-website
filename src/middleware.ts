import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEMO_AUTH_COOKIE = "briticana_demo_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(DEMO_AUTH_COOKIE)?.value;
    if (token !== "1") {
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
