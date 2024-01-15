const mediasoup = require("mediasoup");
let worker;
let router;

async function createWorker() {
  worker = await mediasoup.createWorker({
    rtcMinPort: 2000,
    rtcMaxPort: 2100,
  });
  router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: "audio",
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: "video",
        mimeType: "video/VP8",
        clockRate: 90000,
        parameters: {
          "x-google-start-bitrate": 1000,
        },
      },
    ],
  });

  return worker;
}

async function createWebRtcTransport() {
  const transport = await router.createWebRtcTransport({
    listenIps: [{ ip: "127.0.0.1", announcedIp: null }],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  });

  //

  transport.on("dtlsstatechange", (dtlsState) => {
    if (dtlsState === "closed") {
      transport.close();
    }
  });

  transport.on("close", () => {
    console.log("transport closed");
  });

  return transport;
}

function getRtcCapabilities() {
  return router.rtpCapabilities;
}

function getIsCanConsumeWithRouter(data) {
  return router.canConsume(data);
}

function getTransportParams(transport) {
  return {
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
}

module.exports = {
  createWorker,
  createWebRtcTransport,
  getRtcCapabilities,
  getIsCanConsumeWithRouter,
  getTransportParams,
};
