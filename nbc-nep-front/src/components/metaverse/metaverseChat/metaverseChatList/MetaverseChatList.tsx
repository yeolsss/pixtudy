import React from "react";
import styled from "styled-components";
import { useMetaverseChatContext } from "@/context/MetaverseChatProvider";

export default function MetaverseChatList() {
  const { chatList } = useMetaverseChatContext();
  return (
    <>
      <StMetaverseChatList>
        {chatList?.map((chat, index) => (
          <div key={chat.userId + index}>
            <span>{chat.userId}: </span>
            <span>{chat.message}</span>
          </div>
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
