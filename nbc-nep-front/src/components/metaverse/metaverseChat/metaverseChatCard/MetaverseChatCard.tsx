import { Chat } from "@/types/metaverse";
import React from "react";

interface Props {
  chat: Chat;
}

export default function MetaverseChatCard({ chat }: Props) {
  return (
    <div>
      <span>{chat.playerDisplayName} : </span>
      <span>{chat.message}</span>
    </div>
  );
}
