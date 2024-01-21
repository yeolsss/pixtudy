import { getUserSessionHandler } from "@/api/supabase/auth";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { login, logout } from "@/redux/modules/authSlice";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ChangeUserSession() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // 유저정보를 불러오는 코드
  const setUserSession = async () => {
    const data = await getUserSessionHandler();
    dispatch(login(data!));
  };

  /* 로그인 상태를 tracking*/
  useEffect(() => {
    const trackingAuth = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "INITIAL_SESSION") {
          if (session) {
            // 쿠키생성
            document.cookie = `pixtudy-access-token=${session?.access_token}; Path=/; Max-Age=${session?.expires_in}; Secure; SameSite=Strict`;
            await setUserSession();
          }
        } else if (event === "SIGNED_IN") {
          console.log(session);
          // 쿠키생성
          document.cookie = `pixtudy-access-token=${session?.access_token}; Path=/; Max-Age=${session?.expires_in}; Secure; SameSite=Strict`;
          await setUserSession();
          if (session?.user.app_metadata.provider !== "email") {
            router.push("/dashboard");
          }
        } else if (event === "SIGNED_OUT") {
          dispatch(logout());
          // 쿠키삭제
          document.cookie = `pixtudy-access-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
          await router.push("/");
        } else if (event === "PASSWORD_RECOVERY") {
          // 비밀번호 찾기 페이지 들어갈 시
        } else if (event === "TOKEN_REFRESHED") {
          // 리프레시 토큰 작동시
        } else if (event === "USER_UPDATED") {
          // 유저 정보 업데이트 시
        }
      }
    );
    return () => {
      trackingAuth.data.subscription.unsubscribe();
    };
  }, []);

  return <></>;
}
