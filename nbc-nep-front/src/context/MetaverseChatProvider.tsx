import React, { createContext, PropsWithChildren, useContext } from "react";
import useChatSocket from "@/hooks/socket/useChatSocket";
import { Chat } from "@/types/metaverse";
import useInput from "@/hooks/useInput";
import { useGetCurrentUser } from "@/hooks/query/useSupabase";

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
  // 필요한게 뭐냐 보즈아~~
  // 1. 채팅 내용<HTMLInputElement>,
  const [chatInput, setChatInput, onChangeChatHandler] = useInput<string>("");

  // 2. socket customHooks
  const { chatList, sendChatMessage } = useChatSocket();

  // 3. 채팅 내용을 보내는 함수<onSubmitChatHandler>
  const onSubmitChatHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChatMessage(chatInput);
    setChatInput("");
  };

  // 4. user 정보 customHooks
  const getUser = useGetCurrentUser();
  console.log(getUser);

  // context value
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
