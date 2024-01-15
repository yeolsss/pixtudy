const SEND_TRANSPORT = "sendTransport";
const RECV_TRANSPORT = "recvTransport";

const {
  createWebRtcTransport,
  createWorker,
  getRtcCapabilities,
  getTransportParams,
  isCanConsumeWithRouter,
} = require("./mediaSoupManager");

(async function () {
  await createWorker();
})();

let clients = {};

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log("socket disconnect");
      clients[socket.id] = null;
    });
    // socket이 연결이 된다면, 그 socket에 대한 정보를 여기서 초기화를 애초에 해줘야겠다.fc
    clients[socket.id] = {
      socketId: socket.id,
      roomName: null,
      [SEND_TRANSPORT]: null,
      [RECV_TRANSPORT]: null,
      producers: [],
      consumers: [],
    };
    // 클라이언트가 room에 들어왔을 경우, 초기 설정들을 해준다
    // socketId, roomName이라던가 ,transport들... 이미 있느
    socket.on("join-room", (roomName) => {
      clients[socket.id].roomName = roomName;
      socket.join(roomName);
    });

    socket.on("create-transport", async (onTransportCreated) => {
      const socketId = socket.id;
      const client = clients[socketId];

      try {
        const rtpCapabilities = getRtcCapabilities();
        const sendTransport = await createWebRtcTransport();
        const recvTransport = await createWebRtcTransport();

        setTransport(client, sendTransport, SEND_TRANSPORT);
        setTransport(client, recvTransport, RECV_TRANSPORT);

        onTransportCreated(
          rtpCapabilities,
          getTransportParams(sendTransport),
          getTransportParams(recvTransport)
        );
      } catch (error) {
        console.error("while creating transport error:", error);
      }
    });

    socket.on("transport-send-connect", ({ dtlsParameters }) => {
      const client = clients[socket.id];
      try {
        client[SEND_TRANSPORT].connect({ dtlsParameters });
      } catch (error) {
        console.error("while connect send transport error:", error);
      }
    });

    socket.on("transport-send-produce", async (parameter, callback) => {
      const client = clients[socket.id];
      try {
        const producer = await client[SEND_TRANSPORT].produce(parameter);

        producer.on("transportclose", () => {
          producer.close();
          client.producers = client.producers.filter(
            (p) => p.id !== producer.id
          );
        });

        socket.to(client.roomName).emit("new-producer", producer.id);
        client.producers.push(producer);

        callback({ id: producer.id });
      } catch (error) {
        console.error("while produce send transport error:", error);
      }
    });

    socket.on("transport-recv-connect", ({ dtlsParameters }) => {
      const client = clients[socket.id];
      try {
        client[RECV_TRANSPORT].connect({ dtlsParameters });
      } catch (error) {
        console.error("while connect recv transport error:", error);
      }
    });

    // transport-recv-consume
    socket.on(
      "transport-recv-consume",
      async ({ rtpCapabilities, producerId }, callback) => {
        const client = clients[socket.id];
        try {
          const recvTransport = client[RECV_TRANSPORT];
          if (!isCanConsumeWithRouter(producerId, rtpCapabilities)) {
            console.error("can not consume");
            return;
          }

          const consumer = await recvTransport.consume({
            producerId,
            rtpCapabilities,
            paused: true,
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

          client.consumers.push(consumer);

          callback(params);
        } catch (error) {
          console.error("while consume recv transport error:", error);
        }
      }
    );

    socket.on("transport-close", () => {});

    socket.on("producer-close", (producerId) => {
      try {
        const client = clients[socket.id];
        if (!client) return;

        client.producers = client.producers.filter((p) => p.id !== producerId);

        // 다른 클라이언트에게 프로듀서가 닫혔다고 알림
        socket.to(client.roomName).emit("producer-closed", producerId);
      } catch (error) {
        console.log("producer close error", error);
      }
    });

    socket.on("get-producers", (callback) => {
      const producers = [];
      for (const clientId in clients) {
        const client = clients[clientId];

        if (!client || client.roomName !== clients[socket.id].roomName)
          continue;

        client.producers.forEach((producer) => {
          producers.push(producer.id);
        });
      }
      callback(producers);
    });

    socket.on("consumer-resume", ({ consumerId }) => {
      try {
        const client = clients[socket.id];
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
