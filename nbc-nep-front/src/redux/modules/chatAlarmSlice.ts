import { dmChatAlarmState } from "@/components/metaverse/types/ChatAlarmType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatAlarmPayload = {
  globalChatState: boolean;
  dmChatStates: dmChatAlarmState[];
};

const initialState: ChatAlarmPayload = {
  // 전체 채팅 알람
  globalChatState: false,
  // dm 채팅 알람 : dm[]
  dmChatStates: [],
};

const chatAlarmSlice = createSlice({
  name: "chatAlarm",
  initialState,
  reducers: {
    setChatAlarmState: (state, action: PayloadAction<ChatAlarmPayload>) => {
      state.globalChatState = action.payload.globalChatState;
      state.dmChatStates = action.payload.dmChatStates;
    },
  },
});

export const { setChatAlarmState } = chatAlarmSlice.actions;
export default chatAlarmSlice.reducer;
