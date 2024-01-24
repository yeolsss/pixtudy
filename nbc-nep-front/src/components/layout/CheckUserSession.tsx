import { getUserSessionHandler } from "@/api/supabase/auth";
import { supabase } from "@/supabase/supabase";
import useAuth from "@/zustand/authStore";
import { useEffect } from "react";

export default function CheckUserSession() {
  const { logout, login } = useAuth();

  useEffect(() => {
    const channel = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        if (!session) return;
        getUserSessionHandler(session)
          .then((user) => {
            login(user);
          })
          .catch((error) => {
            console.log(error);
          });

        // 여기가 실행이 안됨
      } else if (event === "SIGNED_OUT") {
        logout();
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
