import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 로그인 세션에 따른 접근제한
  const sessionToken = request.cookies.get("pixtudy-access-token");
  const { pathname } = request.nextUrl;

  if (
    !sessionToken &&
    (pathname === "/dashboard" || pathname.startsWith("/metaverse"))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (sessionToken && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //   비정상적인 path에 접근 시 홈으로
  if (
    pathname !== "/" &&
    pathname !== "/dashboard" &&
    pathname !== "/signin" &&
    pathname !== "/signup" &&
    !pathname.startsWith("/metaverse")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
