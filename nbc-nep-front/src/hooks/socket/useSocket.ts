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
      autoConnect: false,
    })
  );

  const handleConnect = () => {
    console.log("connect socket in userSocket");
  };

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

  const disconnect = () => {
    console.log("socket disconnect");
    socketRef.current?.disconnect();
  };

  const connect = () => {
    if (socketRef.current.connected) return;
    socketRef.current.connect();
  };

  const changePlayerState = (playerId: string, state: PlayerState) => {
    socketRef.current?.emit("change-player-state", playerId, state);
  };

  return {
    socket: socketRef.current,
    disconnect,
    connect,
    changePlayerState,
  };
}
