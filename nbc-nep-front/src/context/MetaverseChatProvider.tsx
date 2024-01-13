import React, { createContext, PropsWithChildren, useContext } from "react";
import useChatSocket from "@/hooks/socket/useChatSocket";
import { Chat } from "@/types/metaverse";
import useInput from "@/hooks/useInput";
import { useAppSelector } from "@/hooks/useReduxTK";

type MetaverseChatContext = {
  chatInput: string;
  chatList: Chat[];
  onChangeChatHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitChatHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};
const initialState: MetaverseChatContext = {
  chatInput: "",
  chatList: [] as Chat[],
  onChangeChatHandler: (e: React.ChangeEvent<HTMLInputElement>) => {},
  onSubmitChatHandler: (e: React.FormEvent<HTMLFormElement>) => {},
};

const MetaverseChatContext = createContext<MetaverseChatContext>(initialState);

export const MetaverseChatProvider = ({ children }: PropsWithChildren) => {
  const [chatInput, setChatInput, onChangeChatHandler] = useInput<string>("");
  const { display_name } = useAppSelector((state) => state.authSlice.user);
  const { chatList, sendChatMessage } = useChatSocket(display_name);

  const onSubmitChatHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChatMessage(chatInput);
    setChatInput("");
  };

  const value = {
    chatInput,
    chatList,
    onChangeChatHandler,
    onSubmitChatHandler,
  };

  return (
    <MetaverseChatContext.Provider value={value}>
      {children}
    </MetaverseChatContext.Provider>
  );
};

export const useMetaverseChatContext = () => useContext(MetaverseChatContext);
