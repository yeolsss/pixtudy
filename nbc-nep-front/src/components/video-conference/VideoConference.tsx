import {
  isAlreadyConsume,
  isEmptyTracks,
} from "@/components/video-conference/libs/util";
import useDevice from "@/hooks/conference/useDevice";
import useLayout from "@/hooks/conference/useLayout";
import useRecvTransport from "@/hooks/conference/useRecvTransport";
import useSendTransport from "@/hooks/conference/useSendTransport";
import useVideoSource from "@/hooks/conference/useVideoSource";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import useSocket from "@/hooks/socket/useSocket";
import useAuth from "@/zustand/authStore";
import { useEffect } from "react";
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
import { videoParams } from "./constants/constants";
import {
  AppData,
  MediaConsumeParams,
  ProducerForConsume,
  RtpCapabilities,
  ShareType,
  TransPortParams,
} from "./types/ScreenShare.types";
import VideoSourceDisplayContainer from "./video-media-item/VideoSourceDisplayContainer";

export default function VideoConference() {
  const { playerList, spaceId, findPlayerById } = useMetaversePlayer();

  const socketResult = useSocket({
    namespace: "/conference",
  });

  const {
    user: { id: currentPlayerId },
  } = useAuth();
  const { isOpen } = useLayout();

  const {
    consumers,
    addConsumer,
    addProducer,
    removeConsumer,
    removeProducer,
    isCanShare,
    findProducerByShareType,
    filterProducersByShareType,
  } = useVideoSource();

  const {
    loadDevice,
    getRtpCapabilitiesFromDevice,
    createSendTransportWithDevice,
    createRecvTransportWithDevice,
  } = useDevice();

  const { sendTransport, createSendTransport } = useSendTransport({
    socket: socketResult?.socket!,
    createSendTransportWithDevice,
    playerId: currentPlayerId,
  });

  const { consume, createRecvTransport } = useRecvTransport({
    socket: socketResult?.socket!,
    createRecvTransportWithDevice,
    playerId: currentPlayerId,
  });

  const currentPlayer = findPlayerById(currentPlayerId);

  useEffect(() => {
    socketResult?.socket?.emit("join-room", spaceId, currentPlayerId);

    socketResult?.socket?.emit(
      "create-transport",
      currentPlayerId,
      handleCreatedTransport
    );

    socketResult?.socket?.on("new-producer", handleConsumeNewProducer);

    socketResult?.socket?.on("producer-closed", handleProducerClose);

    socketResult?.socket?.on("closed-consumer", removeConsumer);

    return () => {
      socketResult?.socket?.emit("transport-close", currentPlayerId);
      socketResult?.disconnect();
      socketResult?.socket?.off("new-producer", handleConsumeProducers);
      socketResult?.socket?.off("producer-closed", handleProducerClose);
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

    socketResult?.socket?.emit(
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

      socketResult?.socket?.emit(
        "transport-recv-consume",
        { rtpCapabilities, producerId, appData, playerId: currentPlayerId },
        async (params: MediaConsumeParams) => {
          const consumer = await consume({ ...params, appData });

          if (!consumer) {
            throw new Error("no consumer");
          }

          addConsumer(consumer);

          socketResult?.socket?.emit("consumer-resume", {
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
    removeConsumer(streamId);
  }

  async function handleShare(stream: MediaStream, type: ShareType) {
    try {
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      const isVideoTrackEmpty = isEmptyTracks(videoTracks);

      const tracks = isVideoTrackEmpty ? audioTracks : videoTracks;
      const produceParams = isVideoTrackEmpty ? {} : { ...videoParams };

      const track = tracks[0];

      console.log(sendTransport.current);

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

      track.addEventListener("ended", () => {
        removeProducer(producer);
      });

      addProducer(producer);
    } catch (error) {
      console.log("handle share error", error);
    }
  }

  async function handleStopShare(type: ShareType) {
    const producer = findProducerByShareType(type);

    if (!producer) {
      console.error("no producer...");
      return;
    }

    removeProducer(producer);

    socketResult?.socket?.emit(
      "producer-close",
      currentPlayerId,
      producer.appData.streamId
    );
  }
  const screenCount = filterProducersByShareType("screen").length;
  return (
    <>
      {currentPlayer && (
        <>
          <StDockContainer $isOpen={isOpen}>
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
          {playerList.length !== 0 && (
            <VideoSourceDisplayContainer
              playerList={playerList}
              currentPlayer={currentPlayer}
            />
          )}
        </>
      )}
    </>
  );
}

const StDockContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;

  left: 50%;
  bottom: ${(props) => props.theme.spacing[32]};
  transform: translateX(-50%);
  z-index: 3;

  background-color: ${(props) => props.theme.color.metaverse.primary};

  padding: ${(props) => props.theme.spacing[16]};

  border-radius: ${(props) => props.theme.border.radius.circle};

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  gap: ${(props) => props.theme.unit[15]};
  width: 465px;

  transition: opacity 0.2s ease-in-out;

  ${(props) => props.$isOpen && "opacity: 0.3"};
  &:hover {
    ${(props) => props.$isOpen && "opacity: 1"};
  }
`;
