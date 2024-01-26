import MetaverseChatCard from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatCard";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import useChat from "@/hooks/chat/useChat";
import useEndOfChat from "@/hooks/metaverse/useEndOfChat";
import useChatType from "@/zustand/chatTypeStore";
import useDm from "@/zustand/dmStore";
import useGlobalNavBar from "@/zustand/globalNavBarStore";
import { useEffect } from "react";
import styled from "styled-components";

export default function MetaverseChatList() {
  const { chatList } = useChat();
  const { handleSetGlobalChatAlarmState } = useChatAlarm();
  const { isOpenChat, chatType, closeChat } = useChatType();
  const { resetAllSections } = useGlobalNavBar();
  const { closeDm } = useDm();

  const endOfChatsRef = useEndOfChat([chatList]);

  const handleOnClickCloseChat = () => {
    resetAllSections();
    closeDm();
    closeChat();
  };

  useEffect(() => {
    if (isOpenChat && chatType === "GLOBAL")
      handleSetGlobalChatAlarmState(false);
    return () => {
      if (isOpenChat && chatType === "GLOBAL")
        handleSetGlobalChatAlarmState(false);
    };
  }, [isOpenChat, chatList]);

  return (
    <>
      <StMetaverseChatList>
        <MetaverseChatHeader title={"Chat"} handler={handleOnClickCloseChat} />
        {chatList?.map((chat, index) => {
          return <MetaverseChatCard chat={chat} key={chat.userId + index} />;
        })}
        <div ref={endOfChatsRef}></div>
      </StMetaverseChatList>
    </>
  );
}

const StMetaverseChatList = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: scroll;
  flex: 10;

  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  color: white;
  &::-webkit-scrollbar {
    display: none;
  }
  > div > span {
    font-size: 1.6rem;
    font-family: var(--main-font);
  }
`;
