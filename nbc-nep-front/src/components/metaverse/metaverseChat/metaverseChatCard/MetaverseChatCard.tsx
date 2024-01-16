import { Chat } from "@/types/metaverse";
import React from "react";
import styled from "styled-components";

interface Props {
  chat: Chat;
}

export default function MetaverseChatCard({ chat }: Props) {
  return (
    <StMetaverseChatCard>
      <span>{chat.playerDisplayName} : </span>
      <span>{chat.message}</span>
    </StMetaverseChatCard>
  );
}

const StMetaverseChatCard = styled.div`
  > span:last-child {
    word-break: break-all;
  }
`;
