import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  // const res = NextResponse.next();
  // const supabase = createMiddlewareClient({ req: request, res });

  // await supabase.auth.getSession();

  // 로그인 세션에 따른 접근제한

  const response = NextResponse.next();

  const sessionToken = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  if (request.headers.get("Purpose") === "prefetch")
    console.log("----------나는 프리 패 칭 -------------");

  console.log("middleware path name is : ", pathname);
  console.log("session token is : ", sessionToken);
  console.log("request url : ", request.url);

  if (
    !sessionToken &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/metaverse"))
  ) {
    console.log("여기서 걸린거아냐?");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    sessionToken &&
    (pathname.startsWith("/signin") || pathname.startsWith("/signup"))
  ) {
    console.log("여기서는 singin singup 로직 걸림");
    return NextResponse.redirect(new URL("/", request.url));
  }

  //   비정상적인 path에 접근 시 홈으로
  if (
    pathname !== "/" &&
    pathname !== "/dashboard" &&
    pathname !== "/signin" &&
    pathname !== "/signup" &&
    !pathname.startsWith("/metaverse") &&
    pathname !== "/redirect"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/metaverse/:path*",
    "/signin/:path*",
    "/signup/:path*",
    "/redirect/:path*",
  ],
  // runtime: "experimental-edge",
};
