import { Chat } from "@/components/metaverse/types/metaverse";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import useAuth from "@/zustand/authStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import io, { Socket } from "socket.io-client";
import useMetaversePlayer from "../metaverse/useMetaversePlayer";

export default function useChatSocket(playerDisplayName: string | null = "") {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const socket = useRef<Socket | null>(null);
  const { spaceId } = useMetaversePlayer();
  const { user } = useAuth();
  const { handleSetGlobalChatAlarmState } = useChatAlarm();

  useEffect(() => {
    if (socket.current || !spaceId) return;

    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/chat`);

    socket.current.emit("joinRoom", spaceId);

    socket.current.on("receiveMessage", (data) => {
      setChatList((prev) => [...prev, data]);
      handleSetGlobalChatAlarmState(true);
    });

    socket.current.on("removedRoom", () => {
      toast.error("스페이스가 삭제됐습니다", {
        position: "top-center",
        toastId: "remove-room",
      });
      window.location.href = "/dashboard";
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [spaceId]);

  const sendChatMessage = (message: string) => {
    const newChat = {
      playerDisplayName,
      message,
      spaceId,
      playerId: user.id,
      chatTime: new Date(),
    };
    socket.current?.emit("sendMessage", newChat);
  };

  const emitRemoveSpace = () => {
    socket.current?.emit("removeRoom");
  };

  return { chatList, sendChatMessage, emitRemoveSpace };
}
