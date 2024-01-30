import MetaverseChat from "@/components/metaverse/metaverseChat/MetaverseChat";
import { ChatType } from "@/components/metaverse/types/ChatType";
import useChatType from "@/zustand/chatTypeStore";
import useGlobalNavBar from "@/zustand/globalNavBarStore";
import styled from "styled-components";

export default function MetaverseChatBar() {
  const { isChatSectionOn } = useGlobalNavBar();
  const { openChat, chatType } = useChatType();

  const handleChatTypeOpen = (chatType: ChatType) => {
    openChat(chatType);
  };

  return (
    <>
      <StMetaverseChatBar
        $isOpenChatSection={isChatSectionOn}
        $chatType={chatType}
      >
        <StChatWrapperTitle>
          <h1>Chat</h1>
        </StChatWrapperTitle>
        <StChatButton
          onClick={() => handleChatTypeOpen("GLOBAL")}
          $isActive={chatType === "GLOBAL"}
        >
          Space
        </StChatButton>
        <StChatButton
          onClick={() => handleChatTypeOpen("DM")}
          $isActive={chatType === "DM"}
        >
          DM
        </StChatButton>
      </StMetaverseChatBar>
      <MetaverseChat />
    </>
  );
}

const StMetaverseChatBar = styled.div<{
  $isOpenChatSection: boolean;
  $chatType: ChatType;
}>`
  width: ${({ $isOpenChatSection }) => ($isOpenChatSection ? "93px" : "0")};
  border-right: ${({ $isOpenChatSection }) =>
      $isOpenChatSection ? "1px" : "0"}
    solid rgba(0, 0, 0, 0.5);
  overflow: hidden;
  background-color: #1f2542;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenChatSection }) => ($isOpenChatSection ? "100" : "-1")};
  padding: ${({ theme }) => theme.spacing["16"]} 0;
`;
const StChatWrapperTitle = styled.div`
  font-weight: bold;
  color: #fff;
  padding-bottom: ${(props) => props.theme.spacing["20"]};
  margin-bottom: ${(props) => props.theme.spacing["8"]};
  width: 80%;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.color.border["sub-line"]};
  & > h1 {
    font-size: ${(props) => props.theme.unit["20"]};
    font-family: var(--point-font);
  }
`;

const StChatButton = styled.button<{ $isActive: boolean }>`
  background: ${(props) =>
    props.$isActive ? props.theme.color.metaverse.secondary : "none"};
  color: ${(props) => props.theme.color.base.white};
  border: none;
  font-size: ${(props) => props.theme.unit["12"]};
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  font-family: var(--main-font);
  padding: 0;
  width: 100%;
  border-radius: 0;
  padding: ${(props) => props.theme.spacing["8"]};
  &:hover {
    background: #111424;
  }
`;
