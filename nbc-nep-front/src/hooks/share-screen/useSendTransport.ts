import {
  DtlsParameters,
  ProduceParameter,
  SendTransportType,
  TransPortParams,
} from "@/components/share-screen/types/ScreenShare.types";

import { useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  createSendTransportWithDevice: (params: TransPortParams) => SendTransportType;
}

export default function useSendTransport({
  socket,
  createSendTransportWithDevice,
}: Props) {
  const sendTransportRef = useRef<SendTransportType | null>(null);
  const [sendTransport, setSendTransport] = useState<SendTransportType | null>(
    null
  );

  function createSendTransport(sendTransportParams: TransPortParams) {
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
  }

  async function handleSendTransportConnect(
    { dtlsParameters }: DtlsParameters,
    callback: Function,
    errorBack: Function
  ) {
    try {
      // 미디어 데이터를 안전하게 전송하기 위하여 dtlsParameters를 서버측으로 전송하여 핸드쉐이크를 한다.
      socket.emit("transport-send-connect", { dtlsParameters });
      // transport에 parameters들이 전송되었다는 것을 알려주는 역할
      callback();
    } catch (error) {
      errorBack(error);
    }
  }

  async function handleSendTransportProduce(
    parameter: ProduceParameter,
    callback: Function,
    errorBack: Function
  ) {
    try {
      socket.emit(
        "transport-send-produce",
        parameter,
        (data: { id: string }) => {
          const { id } = data;
          callback({ id });
        }
      );
    } catch (error) {
      errorBack(error);
      console.error("handle local producer Transport Produce error:", error);
    }
  }

  return { sendTransport: sendTransportRef, createSendTransport };
}
