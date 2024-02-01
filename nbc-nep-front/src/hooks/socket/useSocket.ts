import { PlayerState } from "@/components/metaverse/types/metaverse";
import { useRef } from "react";
import { Socket, io } from "socket.io-client";

interface Props {
  namespace: string;
  userId?: string;
  spaceId?: string;
}

export default function useSocket({ namespace, userId, spaceId }: Props) {
  const socketRef = useRef<Socket | null>(null);
  const dashboardFlagRef = useRef<boolean>(false);
  const conferenceFlagRef = useRef<boolean>(false);

  if (userId && namespace === "/metaverse") {
    if (!dashboardFlagRef.current) {
      socketRef.current = io(
        `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}${namespace}`,
        {
          withCredentials: true,
          auth: {
            userId: userId ? userId : "",
            spaceId: spaceId ? spaceId : "",
          },
        }
      );
      dashboardFlagRef.current = true;
    } else {
      return null;
    }
  }

  if (namespace === "/conference") {
    socketRef.current = io(
      `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}${namespace}`,
      {
        withCredentials: true,
        auth: {
          userId: userId ? userId : "",
          spaceId: spaceId ? spaceId : "",
        },
      }
    );
    conferenceFlagRef.current = true;
  }

  if (!socketRef.current?.connected) {
    socketRef.current?.on("connect", () => {
      console.log("connect socket in useSocket.ts");
    });
  }

  const disconnect = () => {
    console.log("socket disconnect");
    ``;
    socketRef.current?.disconnect();
  };

  const changePlayerState = (playerId: string, state: PlayerState) => {
    socketRef.current?.emit("change-player-state", playerId, state);
  };

  // 중복 접속시 리다이렉션
  socketRef.current?.on("duplicate-login", () => {
    localStorage.setItem("message", "duplicate");
    window.location.href = "/dashboard";
  });

  return {
    socket: socketRef.current,
    disconnect,
    changePlayerState,
  };
}
