"use client";
import MetaverseChatForm from "@/components/metaverse/metaverseChat/metaverseChatForm/MetaverseChatForm";
import MetaverseChatList from "@/components/metaverse/metaverseChat/metaverseChatList/MetaverseChatList";
import { MetaverseChatProvider } from "@/context/MetaverseChatProvider";
import { useAppSelector } from "@/hooks/useReduxTK";
import styled from "styled-components";

export default function MetaverseChat() {
  const { isOpenChat, chatType } = useAppSelector((state) => state.chatType);

  return (
    <MetaverseChatProvider>
      <StMetaverseGlobalChatWrapper $isOpenChat={isOpenChat}>
        {isOpenChat && chatType === "GLOBAL" ? (
          <>
            <MetaverseChatList />
            <MetaverseChatForm />
          </>
        ) : (
          <div>DM</div>
        )}
      </StMetaverseGlobalChatWrapper>
    </MetaverseChatProvider>
  );
}

const StMetaverseGlobalChatWrapper = styled.div<{ $isOpenChat: boolean }>`
  width: ${({ $isOpenChat }) => ($isOpenChat ? "300px" : "0")};
  overflow: hidden; // width가 0일 때 내부 내용이 보이지 않도록 설정
  background-color: #1f2542;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 30px;
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenChat }) => ($isOpenChat ? "100" : "-1")};
`;
