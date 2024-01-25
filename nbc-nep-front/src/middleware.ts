import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const PAGES_PATH = [
  { path: "/", dynamic: false },
  { path: "/dashboard", dynamic: false },
  { path: "/metaverse", dynamic: true },
  { path: "/signin", dynamic: false },
  { path: "/signup", dynamic: false },
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // supabase에 접근하여 유효한 spaceid인지 확인
  const checkSpace = async (id: string) => {
    const { data: spaceInfo } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", id)
      .single();
    return spaceInfo ? true : false;
  };

  // 정적 파일, 이미지(public 포함), 프리패칭에 대한 요청을 허용하는 로직
  const isPublicResource =
    pathname.startsWith("/assets/") || pathname.startsWith("/styles/");
  const isStaticFile =
    pathname.startsWith("/_next/static/") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/);

  if (
    isStaticFile ||
    isPublicResource ||
    request.headers.get("Purpose") === "prefetch"
  ) {
    return NextResponse.next();
  }

  // request 정보가 지정한 path에 등록된 정보인지 확인
  const isDynamicPath = PAGES_PATH.some(
    (page) => page.dynamic && pathname.startsWith(`${page.path}/`)
  );
  const isStaticPath = PAGES_PATH.some(
    (page) => !page.dynamic && pathname === page.path
  );

  // 등록된 정보가 아니라면
  if (!isDynamicPath && !isStaticPath) {
    const url = new URL("/", request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set("message", "invalid_path");
    return response;
  }

  // 로그인 세션에 따른 조건부 처리
  if (
    !session &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/metaverse"))
  ) {
    const url = new URL("/signin", request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set("message", "login_first");
    return response;
  }

  if (
    session &&
    (pathname.startsWith("/signin") || pathname.startsWith("/signup"))
  ) {
    const url = new URL("/", request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set("message", "login_already");
    return response;
  }

  // 유효한 메타버스 id가 없을 때
  if (session && pathname.startsWith("/metaverse")) {
    const spaceId = request.url.split("?")[0].split("/").at(-1);
    const checkResult = await checkSpace(spaceId!);
    if (!checkResult) {
      const url = new URL("/dashboard", request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("message", "invalid_space");
      return response;
    }
  }

  return response;
}

export const config = {
  matcher: [
    // 모든 경로에 대해 미들웨어를 적용
    "/(.*)",
  ],
};
