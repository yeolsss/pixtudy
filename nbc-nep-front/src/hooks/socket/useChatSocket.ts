import { Chat } from "@/components/metaverse/types/metaverse";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import useAuthStore from "@/zustand/authStore";
import useChatListStore from "@/zustand/chatListStore";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import io, { Socket } from "socket.io-client";
import useMetaversePlayer from "../metaverse/useMetaversePlayer";

export default function useChatSocket(playerDisplayName: string | null = "") {
  const socket = useRef<Socket>(
    io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/chat`, {
      withCredentials: true,
      autoConnect: false,
    })
  );
  const { spaceId } = useMetaversePlayer();
  const user = useAuthStore.use.user();
  const { handleSetGlobalChatAlarmState } = useChatAlarm();
  const setChatList = useChatListStore((state) => state.setChatList);

  const handleConnect = () => {
    socket.current!.emit("joinRoom", spaceId);
  };
  const handleReceiveMessage = (data: Chat) => {
    setChatList(data);
    handleSetGlobalChatAlarmState(true);
  };
  const handleRemoveRoom = () => {
    toast.error("스페이스가 삭제됐습니다", {
      position: "top-center",
      toastId: "remove-room",
    });
    window.location.href = "/dashboard";
  };

  useEffect(() => {
    if (!spaceId) return;
    if (socket.current && !socket.current.connected) {
      socket.current.connect();
    }

    socket.current.on("connect", handleConnect);

    socket.current.on("receiveMessage", handleReceiveMessage);

    socket.current.on("removedRoom", handleRemoveRoom);

    return () => {
      socket.current.off("connect", handleConnect);
      socket.current.off("receiveMessage", handleReceiveMessage);
      socket.current.off("removeRoom", handleRemoveRoom);
    };
  }, [spaceId, socket.current?.connected]);

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

  return { sendChatMessage, emitRemoveSpace };
}
