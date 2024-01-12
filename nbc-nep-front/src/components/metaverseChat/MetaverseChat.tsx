import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

type Chat = {
  userId: string;
  message: string;
};

export default function MetaverseChat() {
  const [chatInput, setChatInput] = useState<string>("");
  const [chatList, setChatList] = useState<Chat[]>([]);
  let socket = useRef<Socket | null>(null);
  useEffect(() => {
    //  웹소켓 시작
    socket.current = io("http://localhost:3001/chat");
    socket.current?.on("receiveMessage", (data) => {
      setChatList((prev) => [...prev, data]);
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const onChangeChatInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };
  const onSubmitChatHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newChat = {
      message: chatInput,
    };
    socket.current?.emit("sendMessage", newChat);
    setChatInput("");
  };

  return (
    <StMetaverseChatWrapper>
      <StMetaverseChatList>
        {chatList?.map((chat, index) => (
          <div key={chat.userId + index}>
            <span>{chat.userId}: </span>
            <span>{chat.message}</span>
          </div>
        ))}
      </StMetaverseChatList>
      <form onSubmit={onSubmitChatHandler}>
        <StChatInput
          type="text"
          value={chatInput}
          onChange={onChangeChatInputHandler}
        />
      </form>
    </StMetaverseChatWrapper>
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

const StMetaverseChatList = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  > div > span {
    font-size: 1.6rem;
  }
`;

const StChatInput = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  padding: 0 10px;
`;
