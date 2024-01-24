import { dmChatAlarmState } from "@/components/metaverse/types/ChatAlarmType";
import { create } from "zustand";

interface initialChatAlarmState {
  globalChatState: boolean;
  dmChatStates: dmChatAlarmState[];
}

interface ChartAlarmStore extends initialChatAlarmState {
  setChatAlarmState: ({
    globalChatState,
    dmChatStates,
  }: initialChatAlarmState) => void;
}

const initialChatAlarm: initialChatAlarmState = {
  // 전체 채팅 알람
  globalChatState: false,
  // dm 채팅 알람 : dm[]
  dmChatStates: [],
};

const chatAlarmStore = create<ChartAlarmStore>()((set) => ({
  ...initialChatAlarm,
  setChatAlarmState: ({
    globalChatState,
    dmChatStates,
  }: initialChatAlarmState) =>
    set(() => ({
      globalChatState,
      dmChatStates,
    })),
}));

export default chatAlarmStore;
