import { dmChatAlarmState } from "@/components/metaverse/types/ChatAlarmType";
import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface initialChatAlarmState {
  globalChatState: boolean;
  dmChatStates: dmChatAlarmState[];
}

interface ChartAlarmStore extends initialChatAlarmState {
  sound: string;
  volume: number;
  isPlay: boolean;
  setChatAlarmState: ({
    globalChatState,
    dmChatStates,
  }: initialChatAlarmState) => void;
  setAlarmSound: (sound: string) => void;
  setAlarmVolume: (volume: number) => void;
  setAlarmPlayStatus: (status: boolean) => void;
}

const initialChatAlarm = {
  // 전체 채팅 알람
  globalChatState: false,
  // dm 채팅 알람 : dm[]
  dmChatStates: [],
  sound: localStorage.getItem("sound")
    ? localStorage.getItem("sound")!
    : "/assets/alarm/Blop.mp3",
  volume: localStorage.getItem("volume")
    ? parseInt(localStorage.getItem("volume")!)
    : 50,
  isPlay: false,
};

const useChatAlarmStoreBase = create<ChartAlarmStore>()((set) => ({
  ...initialChatAlarm,
  setChatAlarmState: ({
    globalChatState,
    dmChatStates,
  }: initialChatAlarmState) =>
    set(() => ({
      globalChatState,
      dmChatStates,
    })),
  setAlarmSound: (sound: string) => {
    localStorage.setItem("sound", sound);
    return set(() => ({ sound }));
  },
  setAlarmVolume: (volume: number) => {
    localStorage.setItem("volume", String(volume));
    return set(() => ({ volume }));
  },
  setAlarmPlayStatus: (status: boolean) => {
    return set(() => ({ isPlay: status }));
  },
}));

const useChatAlarmStore = createSelectors(useChatAlarmStoreBase);
export default useChatAlarmStore;
