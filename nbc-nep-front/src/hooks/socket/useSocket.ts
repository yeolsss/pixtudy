import { PlayerState } from "@/components/metaverse/types/metaverse";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

interface Props {
  namespace: string;
}

export default function useSocket({ namespace }: Props) {
  const socketRef = useRef<Socket>(
    io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}${namespace}`, {
      withCredentials: true,
    })
  );

  useEffect(() => {
    if (socketRef.current?.connected) return;

    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("connect socket in useSocket.ts");
    });
  }, []);

  const disconnect = () => {
    console.log("socket disconnect");
    socketRef.current?.disconnect();
  };

  const changePlayerState = (playerId: string, state: PlayerState) => {
    socketRef.current?.emit("change-player-state", playerId, state);
  };

  return {
    socket: socketRef.current,
    disconnect,
    changePlayerState,
  };
}
