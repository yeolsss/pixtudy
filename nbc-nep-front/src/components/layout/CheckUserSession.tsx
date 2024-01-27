import { getUserSessionHandler } from "@/api/supabase/auth";
import { supabase } from "@/supabase/supabase";
import useAuth from "@/zustand/authStore";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function CheckUserSession() {
  const { logout, login } = useAuth();
  const sessionRef = useRef<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      switch (event) {
        case "INITIAL_SESSION":
        case "SIGNED_IN":
          if (!session) return;
          getUserSessionHandler(session)
            .then((userData) => {
              if (
                !sessionRef.current &&
                router.pathname !== "/changepassword"
              ) {
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
          if (router.pathname !== "/changepassword") {
            toast.error("로그아웃 되었습니다");
          }
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
