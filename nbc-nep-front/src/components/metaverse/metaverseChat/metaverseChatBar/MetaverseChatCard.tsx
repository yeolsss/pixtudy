import { Chat } from "@/components/metaverse/types/metaverse";
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
  font-family: var(--main-font);

  > span:last-child {
    word-break: break-all;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
  }
`;
