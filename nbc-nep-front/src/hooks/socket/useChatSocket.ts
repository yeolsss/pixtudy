import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Chat } from "@/types/metaverse";

export default function useChatSocket() {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/chat`);
    socket.current.on("receiveMessage", (data) => {
      setChatList((prev) => [...prev, data]);
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const sendChatMessage = (message: string) => {
    const newChat = { message };
    socket.current?.emit("sendMessage", newChat);
  };

  return { chatList, sendChatMessage };
}
