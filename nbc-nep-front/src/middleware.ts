import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.headers.get("Purpose") === "prefetch") {
    return response;
  }

  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(`session : ${!!session}`);

  const { pathname } = request.nextUrl;

  if (
    !session &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/metaverse"))
  ) {
    console.log("세션이 없는데 dashboard, metaverse에 들어옴");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    session &&
    (pathname.startsWith("/signin") || pathname.startsWith("/signup"))
  ) {
    console.log("세션은 있는데 signin singup 페이지에 들어옴");
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/metaverse/:path*",
    "/signin/:path",
    "/signup/:path",
  ],
};
