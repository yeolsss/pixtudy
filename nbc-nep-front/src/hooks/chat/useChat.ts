import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import useAuth from "@/zustand/authStore";
import useChatSocket from "@/hooks/socket/useChatSocket";
import React from "react";
import useInput from "@/hooks/useInput";

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

  const { chatList, sendChatMessage } = useChatSocket(currentPlayer?.nickname);

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
  };
}
