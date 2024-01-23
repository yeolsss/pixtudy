import useChatSocket from "@/hooks/socket/useChatSocket";
import useInput from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Chat } from "@/components/metaverse/types/metaverse";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";

type MetaverseChatContext = {
  chatInput: string;
  chatList: Chat[];
  handleOnChangeChat: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitChat: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
};
const initialState: MetaverseChatContext = {
  chatInput: "",
  chatList: [] as Chat[],
  handleOnChangeChat: () => {},
  handleOnSubmitChat: () => {},
  handleFocus: () => {},
  handleBlur: () => {},
};

const MetaverseChatContext = createContext<MetaverseChatContext>(initialState);

export const MetaverseChatProvider = ({ children }: PropsWithChildren) => {
  const [chatInput, setChatInput, handleOnChangeChat, handleFocus, handleBlur] =
    useInput<string>("");
  const { playerList } = usePlayerContext();
  const { id: currentPlayerId } = useAppSelector(
    (state) => state.authSlice.user
  );
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

  const value = {
    chatInput,
    chatList,
    handleOnChangeChat,
    handleOnSubmitChat,
    handleFocus,
    handleBlur,
  };

  return (
    <MetaverseChatContext.Provider value={value}>
      {children}
    </MetaverseChatContext.Provider>
  );
};

export const useMetaverseChatContext = () => useContext(MetaverseChatContext);
