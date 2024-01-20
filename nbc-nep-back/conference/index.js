const SEND_TRANSPORT_KEY = "sendTransport";
const RECV_TRANSPORT_KEY = "recvTransport";

const {
  createWebRtcTransport,
  createWorker,
  getRtcCapabilities,
  getTransportParams,
  isCanConsumeWithRouter,
  connectTransport,
} = require("./mediaSoupManager");

(async function () {
  await createWorker();
})();

let clients = {};

module.exports = function (io) {
  io.on("connection", (socket) => {
    // socket이 연결이 된다면, 그 socket에 대한 정보를 여기서 초기화를 애초에 해줘야겠다.fc
    socket.on("disconnect", () => {
      try {
        const playerId = socket.playerId;
        const client = clients[playerId];

        if (!client) return;
        console.log("disconnect", playerId);
        socket.to(client.spaceId).emit("client-disconnected", playerId);

        if (client[SEND_TRANSPORT_KEY]) client[SEND_TRANSPORT_KEY].close();
        if (client[RECV_TRANSPORT_KEY]) client[RECV_TRANSPORT_KEY].close();

        if (client.producers)
          client.producers.forEach((producer) => producer.close());
        if (client.consumers)
          client.consumers.forEach((consumer) => consumer.close());

        delete clients[playerId];
      } catch (error) {
        console.error("while disconnect error:", error);
      }
    });

    // 클라이언트가 room에 들어왔을 경우, 초기 설정들을 해준다
    // socketId, roomName이라던가 ,transport들... 이미 있느
    socket.on("join-room", (spaceId, playerId) => {
      console.log(`player ${playerId} joined ${spaceId}`);
      socket.playerId = playerId;

      clients[playerId] = {
        spaceId: spaceId,
        [SEND_TRANSPORT_KEY]: null,
        [RECV_TRANSPORT_KEY]: null,
        producers: [],
        consumers: [],
      };

      clients[playerId].spaceId = spaceId;
      socket.join(spaceId);
    });

    socket.on("create-transport", async (playerId, onTransportCreated) => {
      const client = clients[playerId];

      try {
        const rtpCapabilities = getRtcCapabilities();
        const sendTransport = await createWebRtcTransport();
        const recvTransport = await createWebRtcTransport();

        setTransport(client, sendTransport, SEND_TRANSPORT_KEY);
        setTransport(client, recvTransport, RECV_TRANSPORT_KEY);

        onTransportCreated(
          rtpCapabilities,
          getTransportParams(sendTransport),
          getTransportParams(recvTransport)
        );
      } catch (error) {
        console.error("while creating transport error:", error);
      }
    });

    socket.on(
      "transport-send-connect",
      async ({ dtlsParameters, playerId }) => {
        handleConnectTransport(
          clients[playerId],
          SEND_TRANSPORT_KEY,
          dtlsParameters
        );
      }
    );

    socket.on(
      "transport-send-produce",
      async ({ parameter, playerId }, callback) => {
        const client = clients[playerId];
        try {
          const producer = await client[SEND_TRANSPORT_KEY].produce(parameter);

          producer.on("transportclose", () => {
            producer.close();
            client.producers = client.producers.filter(
              (p) => p.id !== producer.id
            );
          });

          socket
            .to(client.spaceId)
            .emit("new-producer", producer.id, producer.appData);
          client.producers.push(producer);

          callback({ id: producer.id });
        } catch (error) {
          console.error("while produce send transport error:", error);
        }
      }
    );

    socket.on("transport-recv-connect", ({ dtlsParameters, playerId }) => {
      handleConnectTransport(
        clients[playerId],
        RECV_TRANSPORT_KEY,
        dtlsParameters
      );
    });

    // transport-recv-consume
    socket.on(
      "transport-recv-consume",
      async ({ rtpCapabilities, producerId, appData, playerId }, callback) => {
        const client = clients[playerId];

        try {
          const recvTransport = client[RECV_TRANSPORT_KEY];

          if (!isCanConsumeWithRouter(producerId, rtpCapabilities)) {
            console.error("can not consume");
            return;
          }

          const consumer = await recvTransport.consume({
            producerId,
            rtpCapabilities,
            paused: true,
            appData,
          });

          consumer.on("transportclose", () => {
            recvTransport.close();
          });

          consumer.on("producerclose", () => {
            client.consumers = client.consumers.filter(
              (c) => c.id !== consumer.id
            );

            consumer.close();
          });

          const params = {
            id: consumer.id,
            producerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
          };

          client.consumers = [...client.consumers, consumer];

          callback(params);
        } catch (error) {
          console.error("while consume recv transport error:", error);
        }
      }
    );

    socket.on("transport-close", (playerId) => {
      const client = clients[playerId];
      if (!client) return;
      try {
        if (client[SEND_TRANSPORT_KEY]) client[SEND_TRANSPORT_KEY].close();
        if (client[RECV_TRANSPORT_KEY]) client[RECV_TRANSPORT_KEY].close();

        if (client.producers)
          client.producers.forEach((producer) => producer.close());
        if (client.consumers)
          client.consumers.forEach((consumer) => consumer.close());

        delete clients[playerId];
      } catch (error) {
        console.error("while close transport error:", error);
      }
    });

    socket.on("producer-close", (playerId, streamId) => {
      try {
        const client = clients[playerId];

        client.producers = client.producers.filter(
          (p) => p.appData.streamId !== streamId
        );

        // 다른 클라이언트에게 프로듀서가 닫혔다고 알림
        socket.to(client.spaceId).emit("producer-closed", streamId);
      } catch (error) {
        console.log("producer close error", error);
      }
    });

    socket.on("get-producers", (spaceId, playerId, callback) => {
      const producers = [];

      for (const clientId in clients) {
        const client = clients[clientId];
        if (clientId === playerId || client.spaceId !== spaceId) continue;

        client.producers.forEach((producer) => {
          try {
            if (producer.closed) {
              producer.close();
              return;
            }

            producers.push({ id: producer.id, appData: producer.appData });
          } catch (error) {
            console.log(error);
          }
        });
      }
      callback(producers);
    });

    socket.on("consumer-resume", ({ consumerId, playerId }) => {
      try {
        const client = clients[playerId];
        const consumer = client.consumers.find(
          (consumer) => consumer.id === consumerId
        );
        consumer.resume();
      } catch (error) {
        console.error(error);
      }
    });
  });
};

function setTransport(client, transport, type) {
  client[type] = transport;
}

function handleConnectTransport(client, transportKey, dtlsParameters) {
  try {
    if (!client || !client[transportKey])
      throw new Error("client or transport is null");

    const transport = client[transportKey];
    connectTransport(transport, dtlsParameters);
  } catch (error) {
    console.error("while connect transport error:", error);
  }
}
