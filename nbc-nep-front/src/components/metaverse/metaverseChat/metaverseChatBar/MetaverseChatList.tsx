import React, { useEffect } from "react";
import styled from "styled-components";
import MetaverseChatCard from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatCard";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setCloseChat } from "@/redux/modules/chatTypeSlice";
import { setIsCloseSomeSection } from "@/redux/modules/globalNavBarSlice";
import { setCloseDm } from "@/redux/modules/dmSlice";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import { useMetaverseChatContext } from "@/context/MetaverseChatProvider";

export default function MetaverseChatList() {
  const { chatList } = useMetaverseChatContext();
  const dispatch = useAppDispatch();
  const { handleSetGlobalChatAlarmState } = useChatAlarm();
  const { isOpenChat, chatType } = useAppSelector((state) => state.chatType);
  const handleOnClickCloseChat = () => {
    dispatch(setIsCloseSomeSection());
    dispatch(setCloseDm());
    dispatch(setCloseChat());
  };

  useEffect(() => {
    if (isOpenChat && chatType === "GLOBAL")
      handleSetGlobalChatAlarmState(false);
  }, [isOpenChat]);

  useEffect(() => {
    if (isOpenChat && chatType === "GLOBAL")
      handleSetGlobalChatAlarmState(false);
    return () => {
      if (isOpenChat && chatType === "GLOBAL")
        handleSetGlobalChatAlarmState(false);
    };
  }, [chatList]);

  return (
    <>
      <StMetaverseChatList>
        <MetaverseChatHeader title={"Chat"} handler={handleOnClickCloseChat} />
        {chatList?.map((chat, index) => {
          return <MetaverseChatCard chat={chat} key={chat.userId + index} />;
        })}
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
