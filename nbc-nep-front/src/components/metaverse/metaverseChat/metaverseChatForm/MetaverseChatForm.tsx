import React from "react";
import styled from "styled-components";
import { useMetaverseChatContext } from "@/context/MetaverseChatProvider";

export default function MetaverseChatForm() {
  const { onSubmitChatHandler, onChangeChatHandler, chatInput } =
    useMetaverseChatContext();
  return (
    <>
      <form onSubmit={onSubmitChatHandler}>
        <StChatInput
          type="text"
          value={chatInput}
          onChange={onChangeChatHandler}
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
