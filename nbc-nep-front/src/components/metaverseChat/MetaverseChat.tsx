import styled from "styled-components";
import React from "react";
import MetaverseChatForm from "@/components/metaverseChat/metaverseChatForm/MetaverseChatForm";
import { MetaverseChatProvider } from "@/context/MetaverseChatProvider";
import MetaverseChatList from "@/components/metaverseChat/metaverseChatList/MetaverseChatList";

export default function MetaverseChat() {
  return (
    <MetaverseChatProvider>
      <StMetaverseChatWrapper>
        <MetaverseChatList />
        <MetaverseChatForm />
      </StMetaverseChatWrapper>
    </MetaverseChatProvider>
  );
}
const StMetaverseChatWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 500px;
  height: auto;
`;
