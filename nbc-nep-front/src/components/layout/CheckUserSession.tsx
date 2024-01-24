import { getUserSessionHandler } from "@/api/supabase/auth";
import { supabase } from "@/supabase/supabase";
import useAuth from "@/zustand/authStore";
import { useEffect } from "react";

export default function CheckUserSession() {
  const { logout, login } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        if (!session) return;
        const user = await getUserSessionHandler(session);
        login(user);
      } else if (event === "SIGNED_OUT") {
        logout();
      }
    });
  }, []);

  return <></>;
}
