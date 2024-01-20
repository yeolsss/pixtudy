import React from "react";
import styled from "styled-components";
import { useMetaverseChatContext } from "@/context/MetaverseChatProvider";
import MetaverseChatCard from "@/components/metaverse/metaverseChat/metaverseChatCard/MetaverseChatCard";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatHeader/MetaverseChatHeader";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { setCloseChat } from "@/redux/modules/chatTypeSlice";
import { setIsCloseSomeSection } from "@/redux/modules/globalNavBarSlice";
import { setCloseDm } from "@/redux/modules/dmSlice";

export default function MetaverseChatList() {
  const { chatList } = useMetaverseChatContext();
  const dispatch = useAppDispatch();
  const handleOnClickCloseChat = () => {
    dispatch(setIsCloseSomeSection());
    dispatch(setCloseDm());
    dispatch(setCloseChat());
  };
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
