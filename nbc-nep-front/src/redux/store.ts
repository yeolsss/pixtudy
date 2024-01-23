import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./modules/authSlice";
import chatAlarm from "./modules/chatAlarmSlice";
import chatType from "./modules/chatTypeSlice";
import conferenceSlice from "./modules/conferenceSlice";
import dm from "./modules/dmSlice";
import globalNavBar from "./modules/globalNavBarSlice";
import layoutSlice from "./modules/layoutSlice";
import modalSlice from "./modules/modalSlice";
import spaceSlice from "./modules/spaceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modalSlice,
      authSlice,
      spaceSlice,
      globalNavBar,
      chatType,
      layoutSlice,
      conferenceSlice,
      dm,
      chatAlarm,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);

// export default wrapper.withRedux(makeStore);
