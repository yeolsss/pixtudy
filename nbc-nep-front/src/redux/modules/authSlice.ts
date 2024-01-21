import { Tables } from "@/supabase/types/supabase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  user: Tables<"users">;
  isSaveInfo: boolean;
}

const initialUser = {
  created_at: "",
  display_name: "",
  email: "",
  id: "",
};

const initialState: AuthState = {
  isLogin: false,
  user: initialUser,
  isSaveInfo: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Tables<"users">>) => {
      console.log("로그인 된거야?:", action.payload);
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = initialUser;
    },
    setSaveLoginInfo: (state, action: PayloadAction<boolean>) => {
      state.isSaveInfo = action.payload;
    },
  },
});

export const { login, logout, setSaveLoginInfo } = authSlice.actions;
export default authSlice.reducer;
