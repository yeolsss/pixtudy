import { dmChatAlarmState } from "@/components/metaverse/types/ChatAlarmType";
import useChatAlarmStore from "@/zustand/chatAlarmStore";

export default function useChatAlarm() {
  // chat alarm state
  const dmChatStates = useChatAlarmStore.use.dmChatStates();
  const globalChatState = useChatAlarmStore.use.globalChatState();
  const setChatAlarmState = useChatAlarmStore.use.setChatAlarmState();
  const setAlarmSound = useChatAlarmStore.use.setAlarmSound();
  const setAlarmVolume = useChatAlarmStore.use.setAlarmVolume();
  const setAlarmPlayStatus = useChatAlarmStore.use.setAlarmPlayStatus();
  const isPlay = useChatAlarmStore.use.isPlay();
  const sound = useChatAlarmStore.use.sound();
  const volume = useChatAlarmStore.use.volume();

  // 전체 채팅 알람
  const handleSetGlobalChatAlarmState = (state: boolean) => {
    setChatAlarmState({ globalChatState: state, dmChatStates });
  };

  // 배열을 받아올 수 있을듯.
  const handleSetDmChatAlarmState = (dm: dmChatAlarmState[]) => {
    setChatAlarmState({ globalChatState: globalChatState, dmChatStates: dm });
  };

  return {
    handleSetGlobalChatAlarmState,
    handleSetDmChatAlarmState,
    setAlarmSound,
    setAlarmVolume,
    setAlarmPlayStatus,
    isPlay,
    sound,
    volume,
    dmChatStates,
    globalChatState,
  };
}
