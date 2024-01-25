import { getUserSessionHandler } from "@/api/supabase/auth";
import { supabase } from "@/supabase/supabase";
import useAuth from "@/zustand/authStore";
import { Session } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function CheckUserSession() {
  const { logout, login, user } = useAuth();
  const sessionRef = useRef<Session | null>(null);

  useEffect(() => {
    const channel = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "INITIAL_SESSION":
        case "SIGNED_IN":
          if (!session) return;
          getUserSessionHandler(session)
            .then((userData) => {
              if (!sessionRef.current) {
                toast.success(`${userData.display_name}님 로그인 성공`);
                sessionRef.current = session;
              }
              login(userData);
            })
            .catch((error) => {
              console.log(error);
            });
          break;

        case "SIGNED_OUT":
          sessionRef.current = null;
          toast.error("로그아웃 되었습니다");
          logout();
          break;
        default:
          break;
      }
    });

    return () => {
      channel.data.subscription.unsubscribe();
    };
  }, []);

  return <></>;
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
