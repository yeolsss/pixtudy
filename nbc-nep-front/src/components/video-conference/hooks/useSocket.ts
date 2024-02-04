import useConferenceSocketStore from "@/zustand/conferenceSocketStore";
import { AppData, RtpCapabilities } from "mediasoup-client/lib/types";
import {
  Consumer,
  MediaConsumeParams,
  MediaConsumeParamsForEmit,
  ProducerForConsume,
  TransPortParams,
} from "../../../types/conference.types";

export default function useSocket() {
  const socket = useConferenceSocketStore.use.socket();

  const joinRoom = (spaceId: string, currentPlayerId: string) => {
    socket.emit("join-room", spaceId, currentPlayerId);
  };

  const createTransport = (
    currentPlayerId: string,
    onCreatedTransport: (
      rtpCapabilities: RtpCapabilities,
      sendTransportParams: TransPortParams,
      recvTransportParams: TransPortParams
    ) => void
  ) => {
    socket.emit("create-transport", currentPlayerId, onCreatedTransport);
  };

  const transportRecvConsume = (
    paramsForEmit: MediaConsumeParamsForEmit,
    onConsume: (
      params: MediaConsumeParams & { appData: AppData }
    ) => Promise<Consumer | null>
  ) => {
    const { appData, playerId } = paramsForEmit;
    socket.emit(
      "transport-recv-consume",
      paramsForEmit,
      async (params: MediaConsumeParams) => {
        const consumer = await onConsume({ ...params, appData });

        if (!consumer) throw new Error("no consumer");

        socket.emit("consumer-resume", {
          consumerId: consumer.id,
          playerId,
        });
      }
    );
  };

  const closeProducer = (currentPlayerId: string, streamId: string) => {
    socket.emit("producer-close", currentPlayerId, streamId);
  };

  const getProducers = (
    spaceId: string,
    currentPlayerId: string,
    onConsumeProducers: (producerForConsume: ProducerForConsume[]) => void
  ) => {
    socket.emit("get-producers", spaceId, currentPlayerId, onConsumeProducers);
  };

  const closeTransport = (currentPlayerId: string) => {
    socket.emit("transport-close", currentPlayerId);
  };

  return {
    socket,
    joinRoom,
    closeProducer,
    getProducers,
    transportRecvConsume,
    createTransport,
    closeTransport,
  };
}
