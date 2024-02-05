import {
  DtlsParameters,
  ProduceParameter,
  SendTransportType,
  TransPortParams,
} from "@/types/conference.types";

import { useRef } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  createSendTransportWithDevice: (params: TransPortParams) => SendTransportType;
  playerId: string;
}

export default function useSendTransport({
  socket,
  createSendTransportWithDevice,
  playerId,
}: Props) {
  const sendTransportRef = useRef<SendTransportType | null>(null);

  const handleSendTransportConnect = async (
    { dtlsParameters }: DtlsParameters,
    callback: () => void,
    errorBack: (erorr: Error) => void
  ) => {
    try {
      // 미디어 데이터를 안전하게 전송하기 위하여 dtlsParameters를 서버측으로 전송하여 핸드쉐이크를 한다.
      socket.emit("transport-send-connect", { dtlsParameters, playerId });
      // transport에 parameters들이 전송되었다는 것을 알려주는 역할
      callback();
    } catch (error) {
      errorBack(error as Error);
    }
  };

  const handleSendTransportProduce = async (
    parameter: ProduceParameter,
    callback: ({ id }: { id: string }) => void,
    errorBack: (error: Error) => void
  ) => {
    try {
      socket.emit(
        "transport-send-produce",
        { parameter, playerId },
        (data: { id: string }) => {
          const { id } = data;
          callback({ id });
        }
      );
    } catch (error) {
      errorBack(error as Error);
      console.error("handle local producer Transport Produce error:", error);
    }
  };

  const createSendTransport = (sendTransportParams: TransPortParams) => {
    if (sendTransportRef.current) return sendTransportRef.current;

    try {
      const sendTransport = createSendTransportWithDevice(sendTransportParams);

      sendTransport.on("connect", handleSendTransportConnect);
      sendTransport.on("produce", handleSendTransportProduce);

      sendTransportRef.current = sendTransport;
      return sendTransport;
    } catch (error) {
      console.error("create send transport error: ", error);
    }
    return null;
  };

  return { sendTransport: sendTransportRef, createSendTransport };
}
