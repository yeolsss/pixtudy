import SettingsIcon from "@/assets/icons/Cog.svg";
import chartIcon from "@/assets/icons/Comments.svg";
import reportIcon from "@/assets/icons/User Headset.svg";
import usersIcon from "@/assets/icons/Users.svg";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import { ChatType } from "@/components/metaverse/types/ChatType";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import useDm from "@/zustand/dmStore";
import useGlobalNavBar, {
  changeSectionVisibility,
} from "@/zustand/globalNavBarStore";

export default function useGNBIconButtons(): IconButtonProperty[] {
  const dispatch = useAppDispatch();

  const { isChatSectionOn, isPlayerListOn, setSectionVisibility } =
    useGlobalNavBar();
  const { closeDm } = useDm();

  return [
    {
      buttonImage: chartIcon,
      description: "채팅",
      type: "chat",
      handleOnClick: () => {
        setSectionVisibility(
          changeSectionVisibility("isChatSectionOn", !isChatSectionOn)
        );

        const updateIsOpenChat = {
          isOpenChat: !isChatSectionOn,
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
      buttonImage: usersIcon,
      description: "접속자 정보",
      type: "playerList",
      handleOnClick: () => {
        const updateIsOpenChat = {
          isOpenChat: false,
          chatType: "GLOBAL" as ChatType,
        };
        closeDm();
        dispatch(setIsOpenChat(updateIsOpenChat));

        setSectionVisibility(
          changeSectionVisibility("isPlayerListOn", !isPlayerListOn)
        );
      },
    },
  ];
}
