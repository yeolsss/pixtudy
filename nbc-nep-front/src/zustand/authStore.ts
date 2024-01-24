import { Tables } from "@/supabase/types/supabase";
import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  user: Tables<"users">;
  isSaveInfo: boolean;
  login: (user: Tables<"users">) => void;
  logout: () => void;
  setSaveLoginInfo: (isRememberLoginInfo: boolean) => void;
}

const initialUser = {
  created_at: "",
  display_name: "",
  email: "",
  id: "",
};

const authStore = create<AuthState>()((set) => ({
  isLogin: false,
  user: initialUser,
  isSaveInfo: false,
  login: (user: Tables<"users">) => set(() => ({ isLogin: true, user })),
  logout: () =>
    set(() => ({
      isLogin: false,
      user: { ...initialUser },
    })),
  setSaveLoginInfo: (isRememberLoginInfo: boolean) =>
    set(() => ({ isSaveInfo: isRememberLoginInfo })),
}));

export default authStore;
