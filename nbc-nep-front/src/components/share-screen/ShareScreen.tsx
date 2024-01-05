import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export default function ShareScreen() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3001", {
        withCredentials: true,
      });
      return;
    }
    const socket = socketRef.current;

    if (socket.connected) return;
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return <div></div>;
}
