import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import useChatSocket from "@/hooks/socket/useChatSocket";
import useInput from "@/hooks/useInput";
import useAuth from "@/zustand/authStore";
import React from "react";

export default function useChat() {
  const { playerList } = useMetaversePlayer();
  const [chatInput, setChatInput, handleOnChangeChat, handleFocus, handleBlur] =
    useInput<string>("");
  const {
    user: { id: currentPlayerId },
  } = useAuth();

  const currentPlayer = playerList.find(
    (player) => player.playerId === currentPlayerId
  );

  const { chatList, sendChatMessage, emitRemoveSpace } = useChatSocket(
    currentPlayer?.nickname
  );

  const handleOnSubmitChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput) return;
    sendChatMessage(chatInput);
    setChatInput("");
  };

  return {
    chatInput,
    handleOnChangeChat,
    handleOnSubmitChat,
    chatList,
    handleFocus,
    handleBlur,
    emitRemoveSpace,
  };
}
