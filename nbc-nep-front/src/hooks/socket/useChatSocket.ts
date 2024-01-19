import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Chat } from "@/types/metaverse";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";

export default function useChatSocket(playerDisplayName: string | null = "") {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useRef<Socket | null>(null);
  const { spaceId } = usePlayerContext();

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/chat`, {
      query: { spaceId },
    });
    socket.current.on("receiveMessage", (data) => {
      setChatList((prev) => [...prev, data]);
    });
    return () => {
      socket.current?.disconnect();
    };
  }, [spaceId]);

  const sendChatMessage = (message: string) => {
    const newChat = { playerDisplayName, message, spaceId };
    socket.current?.emit("sendMessage", newChat);
  };

  return { chatList, sendChatMessage };
}
