import useSocket from "@/hooks/useSocket";
import { Device, types } from "mediasoup-client";
import { useEffect, useRef, useState } from "react";

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

export default function ScreenShare() {
  const { socket } = useSocket();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  // 각 클라이언트는 Device 객체를 생성하고, 라우터로부터 rtpCapabilities를 받아 load 메서드를 실행한다.
  const deviceRef = useRef<Device>();
  const consumerTransportsRef = useRef<ConsumerTransportType[]>([]);
  const [videos, setVideos] = useState<MediaStream[]>([]);
  const [consumingTransports, setConsumingTransports] = useState<string[]>([]);

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
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    localVideoRef.current!.srcObject = stream;

    console.log("handle start capture socket is : ", socket.id);
    console.log("socket emit join-room");
    socket.emit("join-room", { roomId: "test" }, setDevice);
  }

  function handleCreateSendTransport(device: Device) {
    return async function (params: TransPortType) {
      const videoStream = localVideoRef.current!.srcObject as MediaStream;

      try {
        if (videoStream.getVideoTracks().length === 0)
          throw new Error("video track is not exist");

        console.log("video Stream is : ", videoStream.id);
        console.log(
          "video readyState is : ",
          videoStream.getVideoTracks()[0].readyState
        );
        console.log(
          "video enabled is:",
          videoStream.getVideoTracks()[0].enabled
        );

        const track = videoStream.getVideoTracks()[0];
        const producerTransport = createSendTransport(device, params);

        if (!producerTransport) return;
        // produce track at send transport
        await producerTransport.produce({
          track: track,
          ...videoParams,
          appData: { trackId: track.id },
        });
        console.log("send producer track id : ", track.id);
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
        (data: { id: string; producerExist: boolean }) => {
          const { id, producerExist } = data;
          callback({ id });

          if (producerExist) {
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
    // 이미 consuming하고 있다면 무시하기
    if (consumingTransports.includes(remoteProducerId)) return;

    setConsumingTransports((prev) => [...prev, remoteProducerId]);
    console.log(
      "Cl2 is creating a consumer for Cl1's track, Producer ID:",
      remoteProducerId
    );
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
            console.log("consumer trasnport connect start");
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
            setVideos((prev) => [...prev, new MediaStream([track])]);
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
  async function setDevice(rtpCapabilities: RtpCapabilities) {
    const device = deviceRef.current;
    try {
      await device?.load({ routerRtpCapabilities: rtpCapabilities });
    } catch (error) {
      console.error("set device rtpCapabilities error : ", error);
    }

    console.log("device load rtpCapabilities success");
    console.log("socket emit create-web-rtc-transport");
    // TODO : 이름 바꿔야함 create-web-rtc-transport로
    socket.emit("createWebRtcTransport", { consumer: false });
  }

  console.log({ videos, socketId: socket.id });
  return (
    <div>
      <button onClick={handleStartCapture}>share screen</button>
      <video ref={localVideoRef} playsInline autoPlay />
      <div id="remote-media-div">
        {videos.map((video) => (
          <video
            key={video.id}
            playsInline
            autoPlay
            muted
            onError={(e) => console.error(e)}
            onLoad={(e) => {
              console.log("loaded video ", e.currentTarget);
            }}
            onLoadedMetadata={(e) => {
              console.log("Video metadata loaded", e);
              e.currentTarget
                .play()
                .catch((err) => console.error("Play error:", err));
            }}
            onCanPlay={(e) => console.log("Video can play", e)}
            ref={(videoRef) => {
              if (videoRef) {
                videoRef.srcObject = video;
                videoRef.play();
              }
            }}
          ></video>
        ))}
      </div>
    </div>
  );
}
