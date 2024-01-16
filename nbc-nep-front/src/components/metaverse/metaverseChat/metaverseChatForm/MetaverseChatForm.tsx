import React from "react";
import styled from "styled-components";
import { useMetaverseChatContext } from "@/context/MetaverseChatProvider";

export default function MetaverseChatForm() {
  const { handleOnSubmitChat, handleOnChangeChat, chatInput } =
    useMetaverseChatContext();
  return (
    <>
      <form onSubmit={handleOnSubmitChat}>
        <StChatInput
          type="text"
          value={chatInput}
          onChange={handleOnChangeChat}
        />
      </form>
    </>
  );
}
const StChatInput = styled.input`
  width: 100%;
  height: 30px;
  outline: none;
  padding: 0 10px;
  background-color: #1f2542;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
`;
