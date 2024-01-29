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
  let listenIps;
  if (process.env.NODE_ENV === "production") {
    listenIps = [
      {
        ip: process.env.MEDIA_SOUP_PRIVATE_IP,
        announcedIp: process.env.MEDIA_SOUP_PUBLIC_IP,
      },
    ];
  } else if (process.env.NODE_ENV === "development") {
    listenIps = [{ ip: "127.0.0.1", announcedIp: null }];
  } else {
    console.error("process.env.NODE_ENV is not set");
  }

  const transport = await router.createWebRtcTransport({
    listenIps,
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

function isCanConsumeWithRouter(producerId, rtpCapabilities) {
  return router.canConsume({
    producerId,
    rtpCapabilities,
  });
}

function getTransportParams(transport) {
  return {
    id: transport.id,
    iceParameters: transport.iceParameters,
    iceCandidates: transport.iceCandidates,
    dtlsParameters: transport.dtlsParameters,
  };
}

async function getTransportStats(transport, key) {
  try {
    if (!transport || !key) throw new Error("transport or key is null");

    return await transport.getStats()[key];
  } catch (error) {
    console.error("getTransportStats error:", error);
  }
}

async function connectTransport(transport, dtlsParameters) {
  try {
    if (getTransportStats(transport, "dtlsState") === "connected") return;

    transport.connect({ dtlsParameters });
  } catch (error) {
    console.error(`while connect ${eventType} transport error:`, error);
  }
}

module.exports = {
  createWorker,
  createWebRtcTransport,
  getRtcCapabilities,
  getTransportParams,
  isCanConsumeWithRouter,
  getTransportStats,
  connectTransport,
};
