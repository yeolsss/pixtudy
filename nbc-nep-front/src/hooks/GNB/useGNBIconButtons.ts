import SettingsIcon from "@/assets/icons/Cog.svg";
import chartIcon from "@/assets/icons/Comments.svg";
import reportIcon from "@/assets/icons/User Headset.svg";
import usersIcon from "@/assets/icons/Users.svg";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import useChatType from "@/zustand/chatTypeStore";
import useDm from "@/zustand/dmStore";
import useGlobalNavBar, {
  changeSectionVisibility,
} from "@/zustand/globalNavBarStore";

export default function useGNBIconButtons(): IconButtonProperty[] {
  const { isChatSectionOn, isPlayerListOn, setSectionVisibility } =
    useGlobalNavBar();
  const { closeDm } = useDm();
  const { openChat, closeChat } = useChatType();

  return [
    {
      buttonImage: chartIcon,
      description: "채팅",
      type: "chat",
      handleOnClick: () => {
        if (isChatSectionOn) {
          setSectionVisibility(
            changeSectionVisibility("isChatSectionOn", false)
          );
          closeChat();
          return;
        }
        setSectionVisibility(changeSectionVisibility("isChatSectionOn", true));
        openChat("GLOBAL");
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
        if (isPlayerListOn) {
          setSectionVisibility(
            changeSectionVisibility("isPlayerListOn", false)
          );
          closeChat();
          closeDm();

          return;
        }
        setSectionVisibility(changeSectionVisibility("isPlayerListOn", true));
      },
    },
  ];
}
