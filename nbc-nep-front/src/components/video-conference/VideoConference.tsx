import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import useDevice from "@/hooks/share-screen/useDevice";
import useRecvTransport from "@/hooks/share-screen/useRecvTransport";
import useSendTransport from "@/hooks/share-screen/useSendTransport";
import useSocket from "@/hooks/socket/useSocket";
import { useAppSelector } from "@/hooks/useReduxTK";
import { RtpParameters } from "mediasoup-client/lib/RtpParameters";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CameraOff from "../../assets/dock-icons/camera-off.svg";
import CameraOn from "../../assets/dock-icons/camera-on.svg";
import MicOff from "../../assets/dock-icons/mic-off.svg";
import MicOn from "../../assets/dock-icons/mic-on.svg";
import ScreenOff from "../../assets/dock-icons/screen-off.svg";
import ScreenOn from "../../assets/dock-icons/screen-on.svg";
import BadgeNumber from "../common/badge/BadgeNumber";
import BadgeWrapper from "../common/badge/BadgeWrapper";
import DockPlayer from "./DockPlayer";
import ShareButton from "./ShareButton";
import {
  getProducersByShareType,
  isAlreadyConsume,
  isEmptyTracks,
} from "./lib/util";
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
    playerId: currentPlayerId,
  });

  const { recvTransport, createRecvTransport } = useRecvTransport({
    socket,
    createRecvTransportWithDevice,
    playerId: currentPlayerId,
  });

  const currentPlayer = playerList.find(
    (player) => player.playerId === currentPlayerId
  );

  useEffect(() => {
    console.log("socket connected");
    socket.emit("join-room", spaceId, currentPlayerId);

    socket.emit("create-transport", currentPlayerId, handleCreatedTransport);

    socket.on("new-producer", handleConsumeNewProducer);

    socket.on("producer-closed", handleProducerClose);

    return () => {
      socket.emit("transport-close", currentPlayerId);
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

    socket.emit(
      "get-producers",
      spaceId,
      currentPlayerId,
      handleConsumeProducers
    );
  }

  async function handleConsumeNewProducer(
    producerId: string,
    appData: AppData
  ) {
    if (isAlreadyConsume(consumers, producerId)) {
      console.log("이미 consume 중인 producerId");
      return;
    }

    try {
      const rtpCapabilities = getRtpCapabilitiesFromDevice();

      socket.emit(
        "transport-recv-consume",
        { rtpCapabilities, producerId, appData, playerId: currentPlayerId },
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

          consumer?.on("@close", () => {
            console.log("basic close consumer");
          });

          consumer?.observer.on("close", () => {
            console.log("close consumer");
          });

          if (!consumer) {
            throw new Error("consumer가 없다...있어야 하는데...");
          }

          setConsumers((prev) => [
            ...prev.filter((consumer) => !consumer.closed),
            consumer,
          ]);

          socket.emit("consumer-resume", {
            consumerId: consumer.id,
            playerId: currentPlayerId,
          });
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

  function handleProducerClose(streamId: string) {
    setConsumers((prev) =>
      prev.filter((consumer) => {
        if (consumer.appData.streamId === streamId) {
          consumer.close();
        }
        return consumer.appData.streamId !== streamId;
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
          playerId: currentPlayerId,
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
      socket.emit("producer-close", currentPlayerId, producer.appData.streamId);
      producer.pause();
      producer.close();

      setProducers((prev) =>
        prev.filter((prevProducer) => prevProducer.id !== producer.id)
      );
    } catch (error) {
      console.error("handle stop share error", error);
    }
  }

  async function handleShareStopProducer(producerId: string) {
    const producer = producers.find((producer) => producer.id === producerId);

    if (!producer) {
      console.error("no producer...");
      return;
    }

    try {
      const { track } = producer;
      if (!track) {
        throw new Error("no track..");
      }

      track.enabled = false;
      socket.emit("producer-close", currentPlayerId, producer.appData.streamId);

      producer.pause();
      producer.close();

      setProducers((prev) =>
        prev.filter((prevProducer) => prevProducer.id !== producer.id)
      );
    } catch (error) {
      console.error("handle stop share error", error);
    }
  }

  function isCanShare() {
    return (
      producers.filter((producer) => producer.appData.shareType === "screen")
        .length < 3
    );
  }

  const screenCount = getProducersByShareType(producers, "screen").length;

  return (
    <>
      <StDockContainer>
        <DockPlayer player={currentPlayer} />
        <ShareButton
          type="screen"
          onShare={handleShare}
          shareButtonText="화면 공유"
          stopSharingButtonText="공유 불가"
          isCanShare={isCanShare}
          shareSvg={ScreenOff}
          stopShareSvg={ScreenOn}
        >
          <BadgeWrapper>
            {screenCount ? <BadgeNumber count={screenCount} /> : null}
          </BadgeWrapper>
        </ShareButton>
        <ShareButton
          type="webcam"
          onShare={handleShare}
          onStopShare={handleStopShare}
          shareButtonText="카메라 켜기"
          stopSharingButtonText="카메라 끄기"
          shareSvg={CameraOn}
          stopShareSvg={CameraOff}
        />
        <ShareButton
          type="audio"
          onShare={handleShare}
          onStopShare={handleStopShare}
          shareButtonText="마이크 켜기"
          stopSharingButtonText="마이크 끄기"
          shareSvg={MicOn}
          stopShareSvg={MicOff}
        />
      </StDockContainer>
      <StMediaItemWrapper>
        {playerList.length !== 0 && (
          <ShareMediaItemContainer
            handleShareStopProducer={handleShareStopProducer}
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

const StDockContainer = styled.div`
  position: absolute;

  left: 50%;
  bottom: ${(props) => props.theme.spacing[64]};
  transform: translateX(-50%);

  background-color: ${(props) => props.theme.color.metaverse.primary};

  padding: ${(props) => props.theme.spacing[16]};

  border-radius: ${(props) => props.theme.border.radius.circle};

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  gap: 15px;
  width: 465px;
`;
const StMediaItemWrapper = styled.div`
  position: absolute;

  right: 20px;
  top: 0px;

  display: flex;
  flex-direction: column;
`;
