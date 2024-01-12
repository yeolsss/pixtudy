import { getUserSessionHandler } from "@/api/supabase/auth";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { supabase } from "@/libs/supabase";
import { login, logout } from "@/redux/modules/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OnChangeUserSession() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  // 유저정보를 불러오는 코드
  const setUserSession = async () => {
    const data = await getUserSessionHandler();
    console.log(data);
    dispatch(login(data!));
  };
  /* 로그인 상태를 tracking*/
  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        // 최초 랜더링 시
        if (session) {
          setUserSession();
          //   router.push("/dashboard");
        }
        console.log("render");
      } else if (event === "SIGNED_IN") {
        // 로그인 시
        setUserSession();
      } else if (event === "SIGNED_OUT") {
        // 로그아웃 시
        dispatch(logout());
      } else if (event === "PASSWORD_RECOVERY") {
        // 비밀번호 찾기 페이지 들어갈 시
      } else if (event === "TOKEN_REFRESHED") {
        // 리프레시 토큰 작동시
        console.log("rf");
      } else if (event === "USER_UPDATED") {
        // 유저 정보 업데이트 시
      }
    });
    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);
  return <></>;
}
