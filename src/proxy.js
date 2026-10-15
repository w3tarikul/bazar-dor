import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic check only: pages verify the session again on the server.
export function proxy(request) {
  if (getSessionCookie(request)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("callbackURL", `${pathname}${search}`);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
