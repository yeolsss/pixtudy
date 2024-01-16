import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  globalChat: boolean;
  dmChat: boolean;
};

const initialState = {
  globalChat: false,
  dmChat: false,
};

const chatTypeSlice = createSlice({
  name: "chatType",
  initialState,
  reducers: {
    setIsOpenChat: (state, action: PayloadAction<Payload>) => {
      state.globalChat = action.payload.globalChat;
      state.dmChat = action.payload.dmChat;
    },
  },
});

export const { setIsOpenChat } = chatTypeSlice.actions;
export default chatTypeSlice.reducer;
