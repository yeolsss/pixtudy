import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setChatAlarmState } from "@/redux/modules/chatAlarmSlice";
import { dmChatAlarmState } from "@/components/metaverse/types/ChatAlarmType";

export default function useChatAlarm() {
  // chat alarm state
  const { globalChatState, dmChatStates } = useAppSelector(
    (state) => state.chatAlarm
  );
  const dispatch = useAppDispatch();

  // 전체 채팅 알람
  const handleSetGlobalChatAlarmState = (state: boolean) => {
    dispatch(
      setChatAlarmState({ globalChatState: state, dmChatStates: dmChatStates })
    );
  };

  // 배열을 받아올 수 있을듯.
  const handleSetDmChatAlarmState = (
    dm: dmChatAlarmState[],
    dm_id: string = ""
  ) => {
    if (dm_id !== "") {
    }

    dispatch(
      setChatAlarmState({
        globalChatState: globalChatState,
        dmChatStates: dm,
      })
    );
  };

  return {
    handleSetGlobalChatAlarmState,
    handleSetDmChatAlarmState,
  };
}
