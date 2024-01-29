import { dmChatAlarmState } from "@/components/metaverse/types/ChatAlarmType";
import chatAlarmStore from "@/zustand/chatAlarmStore";

export default function useChatAlarm() {
  // chat alarm state
  const {
    dmChatStates,
    globalChatState,
    setChatAlarmState,
    setAlarmSound,
    setAlarmVolume,
    setAlarmPlayStatus,
    isPlay,
    sound,
    volume,
  } = chatAlarmStore();

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
