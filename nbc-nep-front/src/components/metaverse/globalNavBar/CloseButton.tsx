import CloseIcon from "@/assets/icons/Close.svg";
import IconButton from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButton";
import useChatType from "@/zustand/chatTypeStore";
import useDmStore from "@/zustand/dmStore";
import useGlobalNavBarStore from "@/zustand/globalNavBarStore";
import styled from "styled-components";

export default function CloseButton() {
  const resetAllSections = useGlobalNavBarStore.use.resetAllSections();
  const closeDm = useDmStore.use.closeDm();
  const closeChat = useChatType.use.closeChat();

  const handleOnClickClose = () => {
    resetAllSections();
    closeDm();
    closeChat();
  };

  return (
    <StCloseButton>
      <IconButton
        buttonImage={CloseIcon}
        description={`펼친메뉴
        닫기`}
        type={"close"}
        handleOnClick={handleOnClickClose}
      />
    </StCloseButton>
  );
}

const StCloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.border.primary};
  padding-top: ${({ theme }) => theme.spacing["24"]};
`;
