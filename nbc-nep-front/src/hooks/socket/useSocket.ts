import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket() {
  const socketRef = useRef<Socket>(
    io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`, {
      withCredentials: true,
    })
  );

  useEffect(() => {
    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("connect socket in useSocket.ts");
    });
  }, []);

  function disconnect() {
    socketRef.current?.disconnect();
  }

  return {
    socket: socketRef.current,
    disconnect,
  };
}
