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
            await setUserSession();
          }
        } else if (event === "SIGNED_IN") {
          await setUserSession();
          if (session?.user.app_metadata.provider !== "email") {
            router.push("/dashboard");
          }
        } else if (event === "SIGNED_OUT") {
          // 로그아웃 시
          dispatch(logout());
          await router.push("/");
        } else if (event === "PASSWORD_RECOVERY") {
          console.log(session);
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
