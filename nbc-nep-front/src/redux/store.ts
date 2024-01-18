import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./modules/authSlice";
import chatType from "./modules/chatTypeSlice";
import dm from "./modules/dmSlice";
import conferenceSlice from "./modules/conferenceSlice";
import globalNavBar from "./modules/globalNavBarSlice";
import modalSlice from "./modules/modalSlice";

import layoutSlice from "./modules/layoutSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modalSlice,
      authSlice,
      globalNavBar,
      chatType,
      layoutSlice,
      conferenceSlice,
      dm,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);

// export default wrapper.withRedux(makeStore);
