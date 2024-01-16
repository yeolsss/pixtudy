"use client";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import MetaverseChat from "@/components/metaverse/metaverseChat/MetaverseChat";
import { ChatType } from "@/components/metaverse/metaverseChat/types/ChatType";

export default function MetaverseChatBar() {
  const isOpenChatSection = useAppSelector(
    (state) => state.globalNavBar.chatSection
  );
  const { isOpenChat, chatType } = useAppSelector((state) => state.chatType);
  const dispatch = useAppDispatch();

  const handleChatTypeOpen = (type: ChatType) => {
    let updateChatType = {
      isOpenChat,
      chatType: type,
    };

    dispatch(setIsOpenChat(updateChatType));
  };

  return (
    <>
      <StMetaverseChatBar $isOpenChatSection={isOpenChatSection}>
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

const StMetaverseChatBar = styled.div<{ $isOpenChatSection: boolean }>`
  width: ${({ $isOpenChatSection }) =>
    $isOpenChatSection
      ? "100px"
      : "0"}; // isOpenChat이 true일 때 100px, false일 때 0
  overflow: hidden; // width가 0일 때 내부 내용이 보이지 않도록 설정
  border-left: 1px solid black;
  background-color: #1f2542;
  display: flex;
  flex-direction: column;
  gap: 30px;
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenChatSection }) => ($isOpenChatSection ? "100" : "-1")};
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
