import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import chartIcon from "@/assets/icons/Comments.svg";
import { setIsSomeSection } from "@/redux/modules/globalNavBarSlice";
import { ChatType } from "@/components/metaverse/metaverseChat/types/ChatType";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import SettingsIcon from "@/assets/icons/Cog.svg";
import reportIcon from "@/assets/icons/User Headset.svg";
import avatorIcon from "@/assets/icons/Users.svg";
import { setCloseDm } from "@/redux/modules/dmSlice";

export default function useGNBIconButtons(): IconButtonProperty[] {
  const dispatch = useAppDispatch();
  const { chatSection, settingsSection, playerList } = useAppSelector(
    (state) => state.globalNavBar
  );

  let updateIsChatSection = {
    chatSection: false,
    settingsSection: false,
    playerList: false,
  };

  return [
    {
      buttonImage: chartIcon,
      description: "채팅",
      type: "chat",
      handleOnClick: () => {
        updateIsChatSection = {
          chatSection: !chatSection,
          settingsSection: false,
          playerList: false,
        };
        dispatch(setIsSomeSection(updateIsChatSection));
        const updateIsOpenChat = {
          isOpenChat: !chatSection,
          chatType: "GLOBAL" as ChatType,
        };
        dispatch(setIsOpenChat(updateIsOpenChat));
      },
    },
    {
      buttonImage: SettingsIcon,
      description: "설정",
      type: "settings",
      handleOnClick: () => {},
    },
    {
      buttonImage: reportIcon,
      description: "오류제보",
      type: "report",
      handleOnClick: () => {},
    },
    {
      buttonImage: avatorIcon,
      description: "접속자 정보",
      type: "playerList",
      handleOnClick: () => {
        const updateIsOpenChat = {
          isOpenChat: false,
          chatType: "GLOBAL" as ChatType,
        };
        dispatch(setCloseDm());
        dispatch(setIsOpenChat(updateIsOpenChat));
        updateIsChatSection = {
          chatSection: false,
          settingsSection: false,
          playerList: !playerList,
        };
        dispatch(setIsSomeSection(updateIsChatSection));
      },
    },
  ];
}
