import SettingsIcon from "@/assets/icons/Cog.svg";
import chartIcon from "@/assets/icons/Comments.svg";
import reportIcon from "@/assets/icons/User Headset.svg";
import usersIcon from "@/assets/icons/Users.svg";
import kanbanIcon from "@/assets/icons/kanbanIcon.svg";
import { GOOGLE_FORM_LINK } from "@/components/layout/Header";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import useChatType from "@/zustand/chatTypeStore";
import useDmStore from "@/zustand/dmStore";
import useGlobalNavBar, {
  changeSectionVisibility,
} from "@/zustand/globalNavBarStore";
import useMetaverseScrumIsOpen from "@/zustand/metaverseScrumIsOpenStore";
import useModal from "../modal/useModal";
import { useEffect } from "react";
import usePhaserInput from "@/hooks/phaser/usePhaserInput";

export default function useGNBIconButtons(): IconButtonProperty[] {
  const { isChatSectionOn, isPlayerListOn, setSectionVisibility } =
    useGlobalNavBar();
  const closeDm = useDmStore.use.closeDm();
  const openChat = useChatType.use.openChat();
  const closeChat = useChatType.use.closeChat();
  const { openConfigModal } = useModal();
  const {
    isOpen: isScrumOpen,
    openMetaverseScrum,
    closeMetaverseScrum,
  } = useMetaverseScrumIsOpen();

  //
  const { enableInput, disableInput } = usePhaserInput();
  useEffect(() => {
    if (isScrumOpen) disableInput();
    else enableInput();
  }, [isScrumOpen]);

  return [
    {
      buttonImage: kanbanIcon,
      description: "스크럼보드",
      type: "kanban",
      handleOnClick: () => {
        if (isScrumOpen) closeMetaverseScrum();
        else openMetaverseScrum();
      },
    },
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
      handleOnClick: () => {
        openConfigModal();
      },
    },
    {
      buttonImage: reportIcon,
      description: "오류제보",
      type: "report",
      handleOnClick: () => {
        window.open(GOOGLE_FORM_LINK, "_blank");
      },
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
