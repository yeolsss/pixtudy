import { getUserSessionHandler } from "@/api/supabase/auth";
import { Tables } from "@/supabase/types/supabase";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (session: Session, thunkAPI) => {
    const response = await getUserSessionHandler(session);
    return response;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    });
  },
});

export const { login, logout, setSaveLoginInfo } = authSlice.actions;
export default authSlice.reducer;
