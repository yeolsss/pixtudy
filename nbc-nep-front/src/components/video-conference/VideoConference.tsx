import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import useDevice from "@/hooks/share-screen/useDevice";
import useRecvTransport from "@/hooks/share-screen/useRecvTransport";
import useSendTransport from "@/hooks/share-screen/useSendTransport";
import useSocket from "@/hooks/socket/useSocket";
import { useAppSelector } from "@/hooks/useReduxTK";
import { RtpParameters } from "mediasoup-client/lib/RtpParameters";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ShareButton from "./ShareButton";
import { isAlreadyConsume, isEmptyTracks } from "./lib/util";
import {
  AppData,
  Consumer,
  Producer,
  ProducerForConsume,
  RtpCapabilities,
  ShareType,
  TransPortParams,
} from "./types/ScreenShare.types";
import ShareMediaItemContainer from "./video-media-item/ShareMediaItemContainer";

export default function VideoConference() {
  const { socket, disconnect } = useSocket({ namespace: "/conference" });

  const { playerList, spaceId } = usePlayerContext();
  const { id: currentPlayerId } = useAppSelector(
    (state) => state.authSlice.user
  );

  const [producers, setProducers] = useState<Producer[]>([]);
  const [consumers, setConsumers] = useState<Consumer[]>([]);

  const {
    loadDevice,
    getRtpCapabilitiesFromDevice,
    createSendTransportWithDevice,
    createRecvTransportWithDevice,
  } = useDevice();

  const { sendTransport, createSendTransport } = useSendTransport({
    socket,
    createSendTransportWithDevice,
  });

  const { recvTransport, createRecvTransport } = useRecvTransport({
    socket,
    createRecvTransportWithDevice,
  });

  useEffect(() => {
    console.log("socket connected");
    socket.emit("join-room", spaceId);

    socket.emit("create-transport", handleCreatedTransport);

    socket.on("new-producer", handleConsumeNewProducer);

    socket.on("producer-closed", handleProducerClose);

    return () => {
      disconnect();
      socket.off("new-producer", handleConsumeProducers);
      socket.off("producer-closed", handleProducerClose);
    };
  }, []);

  async function handleCreatedTransport(
    rtpCapabilities: RtpCapabilities,
    sendTransportParams: TransPortParams,
    recvTransportParams: TransPortParams
  ) {
    await loadDevice(rtpCapabilities);
    createSendTransport(sendTransportParams);
    createRecvTransport(recvTransportParams);

    socket.emit("get-producers", handleConsumeProducers);
  }

  async function handleConsumeNewProducer(
    producerId: string,
    appData: AppData
  ) {
    if (isAlreadyConsume(consumers, producerId)) {
      return;
    }

    try {
      const rtpCapabilities = getRtpCapabilitiesFromDevice();

      socket.emit(
        "transport-recv-consume",
        { rtpCapabilities, producerId, appData },
        async (data: {
          id: string;
          producerId: string;
          kind: "audio" | "video";
          rtpParameters: RtpParameters;
        }) => {
          const { id, producerId, kind, rtpParameters } = data;

          const consumer = await recvTransport.current?.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            appData,
          });

          if (!consumer) {
            throw new Error("consumer가 없다...있어야 하는데...");
          }
          setConsumers((prev) => [...prev, consumer]);

          socket.emit("consumer-resume", { consumerId: consumer.id });
        }
      );
    } catch (error) {
      console.error("handle consume new producer error", error);
    }
  }

  function handleConsumeProducers(producersForConsume: ProducerForConsume[]) {
    producersForConsume.forEach(({ id, appData }) =>
      handleConsumeNewProducer(id, appData)
    );
  }

  function handleProducerClose(producerId: string) {
    setConsumers((prev) =>
      prev.filter((consumer) => {
        return consumer.appData.producerId !== producerId;
      })
    );
  }

  async function handleShare(stream: MediaStream, type: ShareType) {
    try {
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      const isVideoTrackEmpty = isEmptyTracks(videoTracks);

      const tracks = isVideoTrackEmpty ? audioTracks : videoTracks;
      const produceParams = isVideoTrackEmpty ? {} : { ...videoParams };

      const track = tracks[0];

      const producer = await sendTransport.current?.produce({
        track,
        ...produceParams,
        appData: {
          trackId: track.id,
          streamId: stream.id,
          userId: currentPlayerId,
          shareType: type,
        },
      });

      if (!producer) {
        throw new Error("no producer...");
      }

      setProducers((prev) => [...prev, producer]);
    } catch (error) {
      console.log("handle share error", error);
    }
  }

  async function handleStopShare(type: ShareType) {
    const producer = producers.find(
      (producer) => producer.appData.shareType === type
    );

    if (!producer) {
      console.error("no producer...");
      return;
    }

    try {
      const track = producer?.track;

      if (!track) {
        throw new Error("no track...");
      }

      track.enabled = false;
      socket.emit("producer-close", producer.id);
      producer.pause();
      producer.close();

      setProducers((prev) =>
        prev.filter((prevProducer) => prevProducer.id !== producer.id)
      );
    } catch (error) {
      console.error("handle stop share error", error);
    }
  }

  return (
    <>
      <StDockContainer>
        <ShareButton
          type="screen"
          onShare={handleShare}
          onStopShare={handleStopShare}
          shareButtonText="화면 공유"
          stopSharingButtonText="공유 종료"
        />
        <ShareButton
          type="webcam"
          onShare={handleShare}
          onStopShare={handleStopShare}
          shareButtonText="카메라 켜기"
          stopSharingButtonText="카메라 끄기"
        />
        <ShareButton
          type="audio"
          onShare={handleShare}
          onStopShare={handleStopShare}
          shareButtonText="마이크 켜기"
          stopSharingButtonText="마이크 끄기"
        />
      </StDockContainer>
      <StMediaItemWrapper>
        {playerList.length !== 0 && (
          <ShareMediaItemContainer
            consumers={consumers}
            producers={producers}
            playerList={playerList}
            currentPlayerId={currentPlayerId}
          />
        )}
      </StMediaItemWrapper>
    </>
  );
}

const videoParams = {
  // mediasoup params
  encodings: [
    {
      rid: "r0",
      maxBitrate: 100000,
      scalabilityMode: "S1T3",
    },
    {
      rid: "r1",
      maxBitrate: 300000,
      scalabilityMode: "S1T3",
    },
    {
      rid: "r2",
      maxBitrate: 900000,
      scalabilityMode: "S1T3",
    },
  ],
  codecOptions: {
    videoGoogleStartBitrate: 1000,
  },
};

const StWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  margin: 0;
  padding: 0;

  position: absolute;
  top: 0;
  left: 0;
`;

const StDockContainer = styled.div`
  position: absolute;

  left: 50%;
  transform: translateX(-50%);

  bottom: 500px;
  width: 300px;
  border: 1px solid black;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
`;
const StMediaItemWrapper = styled.div`
  position: absolute;

  right: 20px;
  top: 0px;

  display: flex;
  flex-direction: column;
`;

export const StVideo = styled.video`
  width: 175px;
  height: 130px;
  margin: 0;
  padding: 0;
  position: relative;
  object-fit: cover;
`;
export const StAudio = styled.audio`
  width: 0;
  height: 0;
`;
