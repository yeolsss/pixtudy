import { getUserSessionHandler } from "@/api/supabase/auth";
import { supabase } from "@/libs/supabase";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { login, logout, setSaveLoginInfo } from "@/redux/modules/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OnChangeUserSession() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // 유저정보를 불러오는 코드
  const setUserSession = async () => {
    const data = await getUserSessionHandler();
    dispatch(login(data!));
  };

  /* 로그인 상태를 tracking*/
  useEffect(() => {
    // let currentSession = await supabase.auth.getSession();
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION") {
        if (session) {
          await setUserSession();
        }
      } else if (event === "SIGNED_IN") {
        if (router.pathname === "/" && session) {
          await setUserSession();
          await router.push("/dashboard");
        }
      } else if (event === "SIGNED_OUT") {
        // 로그아웃 시
        dispatch(logout());
        await router.push("/");
      } else if (event === "PASSWORD_RECOVERY") {
        // 비밀번호 찾기 페이지 들어갈 시
      } else if (event === "TOKEN_REFRESHED") {
        // 리프레시 토큰 작동시
      } else if (event === "USER_UPDATED") {
        // 유저 정보 업데이트 시
      }
    });
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("saveLogin"));
    dispatch(setSaveLoginInfo(!!localStorage.getItem("saveLogin")));
  }, []);
  return <></>;
}
