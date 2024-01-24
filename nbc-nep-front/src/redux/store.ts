import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import chatAlarm from "./modules/chatAlarmSlice";
import chatType from "./modules/chatTypeSlice";
import dm from "./modules/dmSlice";
import layoutSlice from "./modules/layoutSlice";
import modalSlice from "./modules/modalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modalSlice,
      chatType,
      layoutSlice,
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
