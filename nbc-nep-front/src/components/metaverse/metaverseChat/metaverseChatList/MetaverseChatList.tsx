import React from "react";
import styled from "styled-components";
import { useMetaverseChatContext } from "@/context/MetaverseChatProvider";
import MetaverseChatCard from "@/components/metaverse/metaverseChat/metaverseChatCard/MetaverseChatCard";

export default function MetaverseChatList() {
  const { chatList } = useMetaverseChatContext();
  return (
    <>
      <StMetaverseChatList>
        {chatList?.map((chat, index) => (
          <MetaverseChatCard chat={chat} key={chat.userId + index} />
        ))}
      </StMetaverseChatList>
    </>
  );
}

const StMetaverseChatList = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  > div > span {
    font-size: 1.6rem;
  }
`;
