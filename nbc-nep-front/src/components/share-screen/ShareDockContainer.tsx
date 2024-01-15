import useDevice from "@/hooks/share-screen/useDevice";
import useRecvTransport from "@/hooks/share-screen/useRecvTransport";
import useSendTransport from "@/hooks/share-screen/useSendTransport";
import useSocket from "@/hooks/socket/useSocket";
import { RtpParameters } from "mediasoup-client/lib/RtpParameters";
import { useEffect, useRef, useState } from "react";
import ShareButton from "./ShareButton";
import ShareMediaItem from "./ShareMediaItem";
import { isAlreadyConsume, isEmptyTracks } from "./lib/util";
import {
  Consumer,
  Producer,
  RtpCapabilities,
  ShareType,
  TrackKind,
  TransPortParams,
} from "./types/ScreenShare.types";

const roomName = "test";

export default function ShareDockContainer() {
  const { socket, disconnect } = useSocket({ namespace: "/conference" });
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localWebCamRef = useRef<HTMLVideoElement | null>(null);
  const localAudioRef = useRef<HTMLVideoElement | null>(null);

  const {
    loadDevice,
    getRtpCapabilitiesFromDevice,
    createSendTransportWithDevice,
    createRecvTransportWithDevice,
  } = useDevice();

  // const recvTransportRef = useRef<RecvTransportType | null>(null);
  const { sendTransport, createSendTransport } = useSendTransport({
    socket,
    createSendTransportWithDevice,
  });
  const { recvTransport, createRecvTransport } = useRecvTransport({
    socket,
    createRecvTransportWithDevice,
  });

  const [producers, setProducers] = useState<Producer[]>([]);
  const [consumers, setConsumers] = useState<Consumer[]>([]);

  // cursor 쓰세요 튜ㅜ터님 커서 쓰세요 두번 쓰세요 세번 쓰세요

  useEffect(() => {
    console.log("socket connected");
    socket.emit("join-room", roomName);

    socket.emit("create-transport", handleCreatedTransport);

    socket.on("new-producer", handleConsumeNewProducer);

    socket.on("producer-closed", handleProducerClose);

    return () => {
      disconnect();
      socket.off("new-producer", handleConsumeProducers);
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

  async function handleConsumeNewProducer(producerId: string) {
    if (isAlreadyConsume(consumers, producerId)) {
      return;
    }

    try {
      const rtpCapabilities = getRtpCapabilitiesFromDevice();
      console.log({ producerId });
      socket.emit(
        "transport-recv-consume",
        { rtpCapabilities, producerId },
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
            appData: { producerId },
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

  function handleConsumeProducers(producerIds: string[]) {
    producerIds.forEach((producerId) => handleConsumeNewProducer(producerId));
  }

  function handleProducerClose(producerId: string) {
    setConsumers((prev) =>
      prev.filter((consumer) => {
        return consumer.appData.producerId !== producerId;
      })
    );
  }

  async function handleShare(stream: MediaStream, type: ShareType) {
    const localMediaRef = {
      screen: localVideoRef,
      webcam: localWebCamRef,
      audio: localAudioRef,
    }[type];

    localMediaRef.current!.srcObject = stream;

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
        appData: { trackId: track.id, streamId: stream.id },
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
    const localMediaRef = {
      screen: localVideoRef,
      webcam: localWebCamRef,
      audio: localAudioRef,
    }[type];

    const stream = localMediaRef.current!.srcObject as MediaStream;

    if (!stream) {
      console.log("stream이 없다. 있어야 하는데...");
      return;
    }
    const findProducerByStreamId = (producer: Producer) =>
      producer.appData.streamId === stream.id;

    try {
      producers.forEach(async (producer) => {
        if (findProducerByStreamId(producer)) {
          console.log("find producer, and close");
          socket.emit("producer-close", producer.id);
          producer.pause();
          producer.close();
        }
      });

      setProducers((prev) =>
        prev.filter((producer) => !findProducerByStreamId(producer))
      );
      localMediaRef.current!.srcObject = null;
    } catch (error) {
      console.error("handle stop share error", error);
    }
  }

  return (
    <>
      <div>
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
      </div>
      <div>
        <video ref={localVideoRef} muted playsInline autoPlay></video>
        <video ref={localWebCamRef} muted playsInline autoPlay></video>
        <audio ref={localAudioRef} muted playsInline autoPlay></audio>
        {consumers.map((consumer) => {
          const { track } = consumer;
          const stream = new MediaStream([track]);

          return (
            <ShareMediaItem
              key={consumer.id}
              stream={stream}
              type={track.kind as TrackKind}
            />
          );
        })}
      </div>
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
