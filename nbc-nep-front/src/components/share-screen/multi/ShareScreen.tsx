import useSocket from "@/hooks/useSocket";
import { Device, types } from "mediasoup-client";
import { useEffect, useRef, useState } from "react";
import ShareScreenButton from "./ShareScreenButton";

export default function ScreenShare() {
  const { socket } = useSocket();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  // 각 클라이언트는 Device 객체를 생성하고, 라우터로부터 rtpCapabilities를 받아 load 메서드를 실행한다.
  const deviceRef = useRef<Device>();
  const consumerTransportsRef = useRef<ConsumerTransportType[]>([]);
  const [videos, setVideos] = useState<MediaStream[]>([]);
  const webCamRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const device = new Device();
    deviceRef.current = device;

    // 클라이언트에서 device를 로드를 완료한 이후에 서버 측에 receiver transport 만든 다음
    // sender transport를 만드는 이벤트
    socket.on("createdWebRtcTransport", handleCreateSendTransport(device));

    socket.on("new-producer", (data: NewProducerParameter) => {
      const { producerId, socketName, socketId, isNewSocketHost } = data;

      signalNewConsumerTransport(
        producerId,
        socketName,
        socketId,
        isNewSocketHost
      );
    });

    return () => {
      socket.off("createdWebRtcTransport", handleCreateSendTransport);
    };
  }, []);

  async function handleStartCapture() {
    const videoStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    localVideoRef.current!.srcObject = videoStream;

    console.log("handle start capture socket is : ", socket.id);
    console.log("socket emit join-room");
    socket.emit(
      "join-room",
      { roomId: "test", type: "screen" },
      setDeviceAndCreateTransport
    );
  }
  async function handleWebCamCapture() {
    const webCamStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    webCamRef.current!.srcObject = webCamStream;

    socket.emit(
      "join-room",
      { roomId: "test", type: "webcam" },
      setDeviceAndCreateTransport
    );
  }

  function handleCreateSendTransport(device: Device) {
    return async function (params: TransPortType, type: string) {
      const stream =
        type === "screen"
          ? (localVideoRef.current!.srcObject as MediaStream)
          : (webCamRef.current!.srcObject as MediaStream);

      try {
        if (
          stream.getVideoTracks().length === 0 &&
          stream.getAudioTracks().length === 0
        )
          throw new Error("video and audio tracks are not exist");

        console.log("stream is for producer transport : ", stream.id);

        const videoTracks = stream.getVideoTracks();
        const audioTracks = stream.getAudioTracks();

        if (videoTracks.length !== 0) {
          const videoTransport = createSendTransport(device, params);
          const videoTrack = videoTracks[0];
          if (!videoTransport) return;

          const videoProducer = await videoTransport.produce({
            track: videoTrack,
            ...videoParams,
            appData: { trackId: videoTrack.id },
          });

          console.log(
            "video send producer track id : ",
            videoTrack.id,
            "send video producer id : ",
            videoProducer.id
          );
        } else if (audioTracks.length !== 0) {
          const audioTransport = createSendTransport(device, params);
          const audioTrack = audioTracks[0];
          if (!audioTransport) return;

          const audioProducer = await audioTransport.produce({
            track: audioTrack,
            appData: { trackId: audioTrack.id },
          });
          console.log(
            "audio send producer track id : ",
            audioTrack.id,
            audioTrack,
            "send audio producer id : ",
            audioProducer.id
          );
        }
      } catch (error) {
        console.error("handle create send transport error : ", error);
      }
    };
  }

  function createSendTransport(device: Device, params: TransPortType) {
    try {
      const sendTransport = device.createSendTransport(params);

      sendTransport.on("connect", handleSendProducerTransportConnect);
      sendTransport.on("produce", handleSendProducerTransportProduce);

      console.log(`send transport ${sendTransport.id} create success`);

      return sendTransport;
    } catch (error) {
      console.error("create local producer transport error: ", error);
    }
  }

  // sender transport가 서버측과 연결을 시도할 때 발생하는 이벤트 핸들러
  // socket.emit('transport-connect',{dtlsParameters});
  async function handleSendProducerTransportConnect(
    { dtlsParameters }: DtlsParameters,
    callback: Function,
    errorBack: Function
  ) {
    console.log("handle send producer transport connect start");
    try {
      // 미디어 데이터를 안전하게 전송하기 위하여 dtlsParameters를 서버측으로 전송하여 핸드쉐이크를 한다.
      socket.emit("transport-connect", { dtlsParameters });
      // transport에 parameters들이 전송되었다는 것을 알려주는 역할
      callback();
    } catch (error) {
      errorBack(error);
    }
  }

  // 미디어 트랙을 프로듀서로 전송하려고 할 때 발생하는 이벤트 핸들러
  async function handleSendProducerTransportProduce(
    parameter: ProduceParameter,
    callback: Function,
    errorBack: Function
  ) {
    console.log("handle send producer transport produce start");

    try {
      socket.emit(
        "transport-produce",
        { ...parameter, socketId: socket.id },
        (data: { id: string; producersExist: boolean }) => {
          const { id, producersExist } = data;
          callback({ id });
          console.log("😀producerExist is :", producersExist);
          if (producersExist) {
            // 이미 프로듀서가 존재한다면 join room을 한다
            socket.emit("get-producers", (producerList: ConsumerType[]) => {
              producerList.forEach((id) => signalNewConsumerTransport(...id));
            });
          }
        }
      );
    } catch (error) {
      errorBack(error);
      console.error("handle local producer Transport Produce error:", error);
    }
  }

  function signalNewConsumerTransport(
    remoteProducerId: string,
    socketName: string,
    newSocketId: string,
    isNewSocketHost: boolean
  ) {
    console.log("call signalNewConsumerTransport with id :", remoteProducerId);
    // 이미 consuming하고 있다면 무시하기
    // if (consumingTransports.includes(remoteProducerId)) return;
    // setConsumingTransports((prev) => [...prev, remoteProducerId]);

    if (
      consumerTransportsRef.current.some(
        (consumerTransport) => consumerTransport.producerId === remoteProducerId
      )
    )
      return;

    socket.emit(
      "createWebRtcTransport",
      { consumer: true },
      (data: { params: TransPortType }) => {
        // 서버에서 transport를 만들고 나서 정보를 콜백받음
        const { params } = data;
        const device = deviceRef.current!;
        const consumerTransport = device.createRecvTransport(params);

        consumerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errorBack: Function) => {
            console.log(
              `server consumer transport : ${params.id} and client consumer transport : ${consumerTransport.id} connect start`
            );
            try {
              socket.emit("transport-recv-connect", {
                dtlsParameters,
                serverConsumerTransportId: params.id,
              });

              callback();
            } catch (error) {
              errorBack(error);
              console.error("consumer transport connect error : ", error);
            }
          }
        );

        connectRecvTransport(
          consumerTransport,
          remoteProducerId,
          params.id,
          socketName,
          newSocketId,
          isNewSocketHost
        );
      }
    );
  }

  function connectRecvTransport(
    consumerTransport: types.Transport,
    remoteProducerId: string,
    serverConsumerTransportId: string,
    socketName: string,
    newSocketId: string,
    isNewSocketHost: boolean
  ) {
    const device = deviceRef.current!;

    socket.emit(
      "consume",
      {
        rtpCapabilities: device.rtpCapabilities,
        remoteProducerId, //클라이언트1의 producer Id
        serverConsumerTransportId,
      },
      async (data: {
        id: string;
        producerId: string;
        kind: "audio" | "video";
        rtpParameters: types.RtpParameters;
        serverConsumerId: string;
        userName: string;
      }) => {
        const {
          id,
          producerId,
          kind,
          rtpParameters,
          serverConsumerId,
          userName,
        } = data;

        try {
          console.log("start - consumer");
          const consumer = await consumerTransport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
          });
          console.log(
            "consumer consume success consumerTransport is ",
            consumerTransport,
            consumer
          );

          consumerTransportsRef.current = [
            ...consumerTransportsRef.current,
            {
              consumerTransport,
              serverConsumerTransportId,
              producerId: remoteProducerId,
              consumer,
            },
          ];

          const { track } = consumer;
          console.log("consumer track is : ", track.id);
          console.log("track is : ", track);

          if (track.kind === "video") {
            const newVideoStream = new MediaStream([track]);
            setVideos((prev) => [...prev, newVideoStream]);
          }
          socket.emit("consumer-resume", { serverConsumerId });

          return;
        } catch (error) {
          console.error("connect recv transport error : ", error);
        }
      }
    );
  }

  // setDevice -> socket.emit('createWebRtcTransport',{consumer: false});
  async function setDeviceAndCreateTransport(
    rtpCapabilities: RtpCapabilities,
    type: string
  ) {
    const device = deviceRef.current;

    try {
      await device?.load({ routerRtpCapabilities: rtpCapabilities });
    } catch (error) {
      console.error("set device rtpCapabilities error : ", error);
    }

    console.log("device load rtpCapabilities success");
    console.log("socket emit create-web-rtc-transport");
    // TODO : 이름 바꿔야함 create-web-rtc-transport로
    socket.emit("createWebRtcTransport", { consumer: false, type });
  }

  return (
    <div>
      <ShareScreenButton onShare={handleStartCapture} mode="screen">
        Share Screen
      </ShareScreenButton>
      <ShareScreenButton onShare={handleWebCamCapture} mode="webcam">
        Share Web Cam
      </ShareScreenButton>

      <video ref={localVideoRef} playsInline autoPlay />
      <video ref={webCamRef} playsInline autoPlay muted />

      <div id="remote-media-div">
        {videos.map((video) => (
          <video
            key={video.id}
            playsInline
            autoPlay
            muted
            onError={(e) => console.error("Video error: ", e)}
            onLoadStart={() => console.log("Video loading started")}
            onLoadedMetadata={() => console.log("Video metadata loaded")}
            onLoad={(e) => {
              console.log("loaded video ", e.currentTarget);
            }}
            onCanPlay={(e) => console.log("Video can play", e)}
            ref={(videoRef) => {
              if (videoRef) {
                videoRef.srcObject = video;
                // videoRef.play();
              }
            }}
          ></video>
        ))}
      </div>
    </div>
  );
}

type RtpCapabilities = types.RtpCapabilities;

type DtlsParameters = {
  dtlsParameters: types.DtlsParameters;
};

type ProduceParameter = {
  kind: types.MediaKind;
  rtpParameters: types.RtpParameters;
  appData: types.AppData;
};

type TransPortType = {
  id: string;
  iceParameters: types.IceParameters;
  iceCandidates: types.IceCandidate[];
  dtlsParameters: types.DtlsParameters;
};

type ConsumerTransportType = {
  consumerTransport: types.Transport;
  serverConsumerTransportId: string;
  producerId: string;
  consumer: types.Consumer;
};

type NewProducerParameter = {
  producerId: string;
  socketId: string;
  socketName: string;
  isNewSocketHost: boolean;
};

type ConsumerType = [string, string, string, boolean];

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
