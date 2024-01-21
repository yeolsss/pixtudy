import { getUserSessionHandler } from "@/api/supabase/auth";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { login, logout } from "@/redux/modules/authSlice";
import { supabase } from "@/supabase/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { useEffect } from "react";

export default function ChangeUserSession() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // 유저정보를 불러오는 코드
  const setUserSession = async () => {
    // document.cookie = `access_token=${session.access_token}; path=/; max-age=${session.expires_in}; secure; samesite=strict`;

    const data = await getUserSessionHandler();
    dispatch(login(data!));
    await router.push("/dashboard");
  };

  // /* 로그인 상태를 tracking*/
  // useEffect(() => {
  //   const trackingAuth = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       console.log(event, session);
  //       if (event === "INITIAL_SESSION") {
  //         if (session) {
  //           // 쿠키생성
  //           await setUserSession(session);
  //         }
  //       } else if (event === "SIGNED_IN") {
  //         await setUserSession(session!);
  //         // 쿠키생성
  //       } else if (event === "SIGNED_OUT") {
  //         dispatch(logout());
  //         // 쿠키삭제
  //         document.cookie = `pixtudy-access-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  //         await router.push("/");
  //       } else if (event === "PASSWORD_RECOVERY") {
  //         // 비밀번호 찾기 페이지 들어갈 시
  //       } else if (event === "TOKEN_REFRESHED") {
  //         // 리프레시 토큰 작동시
  //       } else if (event === "USER_UPDATED") {
  //         // 유저 정보 업데이트 시
  //       }
  //     }
  //   );
  //   return () => {
  //     trackingAuth.data.subscription.unsubscribe();
  //   };
  // }, []);
  useEffect(() => {
    const trackingAuth = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Send a request to your API route
        await fetch("/api/login", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then(async (res) => {
          const { message } = await res.json();

          if (message === "login") {
            await setUserSession();
          } else if (message === "logout") {
            dispatch(logout());
          }
        });

        // Handle the response (e.g., redirect, update local state)
      }
    );

    return () => {
      trackingAuth.data.subscription.unsubscribe();
    };
  }, []);
  return <></>;
}

// function getStatic
