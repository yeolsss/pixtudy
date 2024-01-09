import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./modules/authSlice";
import modalSlice from "./modules/modalSlice";

const store = configureStore({
  reducer: { modalSlice, authSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
