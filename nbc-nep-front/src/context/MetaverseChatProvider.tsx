import useChatSocket from "@/hooks/socket/useChatSocket";
import useInput from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Chat } from "@/types/metaverse";
import React, { createContext, PropsWithChildren, useContext } from "react";

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
  const { display_name } = useAppSelector((state) => state.authSlice.user);
  const { chatList, sendChatMessage } = useChatSocket(display_name);

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
