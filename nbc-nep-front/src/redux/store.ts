import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./modules/authSlice";
import modalSlice from "./modules/modalSlice";
import globalNavBar from "./modules/globalNavBarSlice";
import chatType from "./modules/chatTypeSlice";
import dm from "./modules/dmSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { modalSlice, authSlice, globalNavBar, chatType, dm },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);

// export default wrapper.withRedux(makeStore);
