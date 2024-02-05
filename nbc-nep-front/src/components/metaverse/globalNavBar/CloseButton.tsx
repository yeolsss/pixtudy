import IconButton from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButton";
import useChatTypeStore from "@/zustand/chatTypeStore";
import useDmStore from "@/zustand/dmStore";
import useGlobalNavBarStore from "@/zustand/globalNavBarStore";
import { StCloseButton } from "@/components/metaverse/styles/metaverse.styles";
import { close } from "../../../assets/GNB";

export default function CloseButton() {
  const resetAllSections = useGlobalNavBarStore.use.resetAllSections();
  const closeDm = useDmStore.use.closeDm();
  const closeChat = useChatTypeStore.use.closeChat();

  const handleOnClickClose = () => {
    resetAllSections();
    closeDm();
    closeChat();
  };

  return (
    <StCloseButton>
      <IconButton
        buttonImage={close}
        description={`펼친메뉴
        닫기`}
        type="close"
        handleOnClick={handleOnClickClose}
      />
    </StCloseButton>
  );
}
