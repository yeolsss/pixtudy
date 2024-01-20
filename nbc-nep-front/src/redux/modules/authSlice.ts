import { Tables } from "@/supabase/types/supabase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  user: Tables<"users">;
}

const initialState: AuthState = {
  isLogin: false,
  user: {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Tables<"users">>) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      return (state = initialState);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
