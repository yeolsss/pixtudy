import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import chatType from "./modules/chatTypeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chatType,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);

// export default wrapper.withRedux(makeStore);
