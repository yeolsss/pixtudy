import { fetchUser } from "@/redux/modules/authSlice";
import { supabase } from "@/supabase/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useReduxTK";

export default function ChangeUserSession() {
  const dispatch = useAppDispatch();
  // 유저정보를 불러오는 코드
  const setUserSession = async (session: Session) => {
    dispatch(fetchUser(session));
  };

  useEffect(() => {
    //TODO: 로직 개선중
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event, session);
      if (session) {
        document.cookie = `access_token=${session.access_token}; Path=/; Max-Age=${session.expires_in}`;
      } else {
        document.cookie = `access_token=; Path=/; Max-Age=0`;
      }

      switch (event) {
        case "INITIAL_SESSION":
          await setUserSession(session!);
          break;
        case "SIGNED_IN":
          await setUserSession(session!);
          break;
        case "SIGNED_OUT":
          dispatch(logout());
          break;
      }
      // Send a request to your API route
      /* const res = await fetch("/api/login", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });

      const { message } = await res.json();

      if (message === "initialSession") {
        await setUserSession(session!);
      } else if (message === "login") {
        await setUserSession(session!);
      } else if (message === "logout") {
        dispatch(logout());
      } */
    });
  }, []);

  return <></>;
}
