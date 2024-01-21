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

  function disconnect() {
    console.log("socket disconnect");
    socketRef.current?.disconnect();
  }

  return {
    socket: socketRef.current,
    disconnect,
  };
}
