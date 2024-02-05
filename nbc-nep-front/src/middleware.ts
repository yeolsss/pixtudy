import { createMiddlewareClient, User } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const PAGES_PATH = [
  { path: "/", dynamic: false },
  { path: "/dashboard", dynamic: false },
  { path: "/metaverse", dynamic: true },
  { path: "/signin", dynamic: false },
  { path: "/signup", dynamic: false },
  { path: "/boards/scrumboards", dynamic: true },
  { path: "/changepassword", dynamic: false },
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const userAgent = request.headers.get("user-agent")?.toLowerCase();
  const isMobile = /android|iphone/i.test(userAgent || "");

  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  const checkSpace = async (id: string) => {
    const { data: spaceInfo } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", id)
      .single();
    return !!spaceInfo;
  };

  const isPublicResource =
    pathname.startsWith("/assets/") || pathname.startsWith("/styles/");
  const isStaticFile =
    pathname.startsWith("/_next/static/") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/);

  if (isStaticFile || isPublicResource) {
    return NextResponse.next();
  }

  const isDynamicPath = PAGES_PATH.some(
    (page) => page.dynamic && pathname.startsWith(`${page.path}/`)
  );

  const isStaticPath = PAGES_PATH.some(
    (page) => !page.dynamic && pathname === page.path
  );

  if (!isDynamicPath && !isStaticPath) {
    const url = new URL("/", request.url);
    const newResponse = NextResponse.redirect(url);
    response.cookies.set("message", "invalid_path");
    return newResponse;
  }

  if (isMobile) {
    if (pathname.startsWith("/metaverse")) {
      const url = new URL("/", request.url);
      const newResponse = NextResponse.redirect(url);
      response.cookies.set("message", "mobile_error");
      return newResponse;
    }
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/metaverse")) {
    if (!session && request.headers.get("Purpose") !== "prefetch") {
      const url = new URL("/signin", request.url);
      const newResponse = NextResponse.redirect(url);
      response.cookies.set("message", "login_first");
      return newResponse;
    }
  }

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    if (session && request.headers.get("Purpose") !== "prefetch") {
      const url = new URL("/", request.url);
      const newResponse = NextResponse.redirect(url);
      response.cookies.set("message", "login_already");
      return newResponse;
    }
  }

  if (session && pathname.startsWith("/metaverse")) {
    const spaceId = request.url.split("?")[0].split("/").at(-1);
    const checkResult = await checkSpace(spaceId!);
    if (!checkResult) {
      const url = new URL("/dashboard", request.url);
      const newResponse = NextResponse.redirect(url);
      response.cookies.set("message", "invalid_space");
      return newResponse;
    }
  }

  if (pathname.startsWith("/changepassword")) {
    const user = session?.user as User & { amr?: [{ method: string }] };
    if (
      user?.amr &&
      typeof user.amr[0] === "object" &&
      "method" in user.amr[0]
    ) {
      if (user.amr[0].method !== "recovery") {
        const url = new URL("/", request.url);
        const newResponse = NextResponse.redirect(url);
        response.cookies.set("message", "invalid_path");
        return newResponse;
      }
    }
  }

  if (session && pathname.startsWith("/boards/scrumboards")) {
    if (isDynamicPath) {
      const spaceId = request.url.split("?")[0].split("/").at(-1);
      await checkSpace(spaceId!);
      const checkResult = await checkSpace(spaceId!);
      if (!checkResult) {
        return NextResponse.redirect(
          new URL("/boards/scrumboards", request.url)
        );
      }
    }
  }
  return response;
}

export const config = {
  matcher: ["/(.*)"],
};
