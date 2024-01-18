import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "@/components/metaverse/metaverseChat/types/ChatType";

type Payload = {
  isOpenChat: boolean;
  chatType: ChatType;
};

const initialState = {
  isOpenChat: false,
  chatType: "GLOBAL",
};

const chatTypeSlice = createSlice({
  name: "chatType",
  initialState,
  reducers: {
    setIsOpenChat: (state, action: PayloadAction<Payload>) => {
      state.isOpenChat = action.payload.isOpenChat;
      state.chatType = action.payload.chatType;
    },
    setCloseChat: (state) => {
      state.isOpenChat = false;
      state.chatType = "GLOBAL";
    },
  },
});

export const { setIsOpenChat, setCloseChat } = chatTypeSlice.actions;
export default chatTypeSlice.reducer;
