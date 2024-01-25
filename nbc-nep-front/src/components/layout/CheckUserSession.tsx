import { getUserSessionHandler } from "@/api/supabase/auth";
import { supabase } from "@/supabase/supabase";
import useAuth from "@/zustand/authStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CheckUserSession() {
  const { logout, login } = useAuth();

  useEffect(() => {
    const channel = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      switch (event) {
        case "INITIAL_SESSION":
        case "SIGNED_IN":
          if (!session) return;
          getUserSessionHandler(session)
            .then((user) => {
              login(user);
              toast.success(`${user.display_name}님 로그인 성공`);
            })
            .catch((error) => {
              console.log(error);
            });
          break;

        case "SIGNED_OUT":
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
