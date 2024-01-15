import {
  DtlsParameters,
  RecvTransportType,
  TransPortParams,
} from "@/components/video-conference/types/ScreenShare.types";
import { useRef } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  createRecvTransportWithDevice: (params: TransPortParams) => RecvTransportType;
}

export default function useRecvTransport({
  socket,
  createRecvTransportWithDevice,
}: Props) {
  const recvTransportRef = useRef<RecvTransportType | null>(null);

  function createRecvTransport(params: TransPortParams) {
    if (recvTransportRef.current) return recvTransportRef.current;

    try {
      const recvTransport = createRecvTransportWithDevice(params);

      recvTransport.on("connect", handleRecvConsumerTransportConnect);

      recvTransportRef.current = recvTransport;
      return recvTransport;
    } catch (error) {
      console.error("create recv transport error: ", error);
    }
  }

  async function handleRecvConsumerTransportConnect(
    { dtlsParameters }: DtlsParameters,
    callback: Function,
    errorBack: Function
  ) {
    try {
      socket.emit("transport-recv-connect", {
        dtlsParameters,
        socketId: socket.id,
      });

      callback();
    } catch (error) {
      errorBack(error);
    }
  }
  return { recvTransport: recvTransportRef, createRecvTransport };
}
