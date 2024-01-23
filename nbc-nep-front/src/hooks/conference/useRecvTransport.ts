import {
  DtlsParameters,
  MediaConsumeParams,
  RecvTransportType,
  TransPortParams,
} from "@/components/video-conference/types/ScreenShare.types";
import { useRef } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  createRecvTransportWithDevice: (params: TransPortParams) => RecvTransportType;
  playerId: string;
}

export default function useRecvTransport({
  socket,
  createRecvTransportWithDevice,
  playerId,
}: Props) {
  const recvTransportRef = useRef<RecvTransportType | null>(null);

  const createRecvTransport = (params: TransPortParams) => {
    if (recvTransportRef.current) return recvTransportRef.current;

    try {
      const recvTransport = createRecvTransportWithDevice(params);

      recvTransport.on("connect", handleRecvConsumerTransportConnect);

      recvTransportRef.current = recvTransport;
      return recvTransport;
    } catch (error) {
      console.error("create recv transport error: ", error);
    }
  };

  const handleRecvConsumerTransportConnect = async (
    { dtlsParameters }: DtlsParameters,
    callback: Function,
    errorBack: Function
  ) => {
    try {
      socket.emit("transport-recv-connect", {
        dtlsParameters,
        playerId,
      });

      callback();
    } catch (error) {
      errorBack(error);
    }
  };

  const consume = async (params: MediaConsumeParams) => {
    try {
      const consumer = await recvTransportRef.current?.consume({
        ...params,
      });

      if (!consumer) {
        throw new Error("The consumer was not created properly", {
          cause: "",
        });
      }

      consumer.on("@close", () => {
        console.log("@close consumer ");
      });

      consumer.observer.on("close", () => {
        console.log("observer close consumer");
      });

      return consumer;
    } catch (error) {
      console.error("An error occurred while consume", error);
    }
    return null;
  };

  return { recvTransport: recvTransportRef, createRecvTransport, consume };
}
