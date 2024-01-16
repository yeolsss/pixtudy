"use client";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import MetaverseChat from "@/components/metaverse/metaverseChat/MetaverseChat";

type ChatType = "GLOBAL" | "DM";

export default function MetaverseChatBar() {
  const isOpenChat = useAppSelector((state) => state.globalNavBar.chatSection);
  const { globalChat, dmChat } = useAppSelector((state) => state.chatType);
  const dispatch = useAppDispatch();

  const handleChatTypeOpen = (type: ChatType) => {
    let updateChatType = {
      globalChat,
      dmChat,
    };

    if (type === "GLOBAL") {
      updateChatType = {
        globalChat: !globalChat,
        dmChat: false,
      };
    } else {
      updateChatType = {
        globalChat: false,
        dmChat: !dmChat,
      };
    }
    dispatch(setIsOpenChat(updateChatType));
  };

  return (
    <>
      <StMetaverseChatBar $isOpenChat={isOpenChat}>
        <StChatWrapperTitle>
          <h1>Chat</h1>
        </StChatWrapperTitle>
        <button onClick={() => handleChatTypeOpen("GLOBAL")}>Room</button>
        <button onClick={() => handleChatTypeOpen("DM")}>DM</button>
      </StMetaverseChatBar>
      <MetaverseChat />
    </>
  );
}

const StMetaverseChatWrapper = styled.section<{ $isOpenChat: boolean }>`
  display: flex;
  width: ${({ $isOpenChat }) => ($isOpenChat ? "auto" : "0")};
`;

const StMetaverseChatBar = styled.div<{ $isOpenChat: boolean }>`
  width: ${({ $isOpenChat }) =>
    $isOpenChat ? "100px" : "0"}; // isOpenChat이 true일 때 100px, false일 때 0
  overflow: hidden; // width가 0일 때 내부 내용이 보이지 않도록 설정
  border-left: 1px solid black;
  background-color: #1f2542;
  display: flex;
  flex-direction: column;
  gap: 30px;
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenChat }) => ($isOpenChat ? "100" : "-1")};
`;
const StChatWrapperTitle = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;
