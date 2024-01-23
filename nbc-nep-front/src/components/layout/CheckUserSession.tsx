import { supabase } from "@/api/supabase/auth";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { fetchUser, logout } from "@/redux/modules/authSlice";
import { useEffect } from "react";

export default function CheckUserSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        if (!session) return;

        dispatch(fetchUser(session));
      } else if (event === "SIGNED_OUT") {
        dispatch(logout());
      }
    });
  }, []);

  return <></>;
}
