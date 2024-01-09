import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket() {
  const socketRef = useRef<Socket>(
    io("http://localhost:3001", { withCredentials: true })
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
