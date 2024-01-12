const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const {
  createWorker,
  createWebRtcTransport,
  getRtcCapabilities,
  getIsCanConsumeWithRouter,
} = require("./conference/mediaSoupManager");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

(async function () {
  await createWorker();
})();

let producers = []; // [ { socketId1, roomName,producer, }, ... ]
let consumers = []; // [ { socketId1, roomName,consumer, }, ... ]

// [ { socketId1, roomName,transport, consumer }, ... ]
let transports = [];

/*
? roomname은 꼭 필요한 정보는 아닌 것 같음
! peerDetails는 이전 사용자가 넣은 값으로 여기에 필요한 값을 넣든가 없애든가 해야함
  peers= {
    소켓아이디 : {
      socket: 소켓 정보,
      roomName: 조인한 룸 이름
      transport: [],
      producers: [],// 해당 소켓의 producer id들의 배열 : 이를 통해서
      consumers: [],// 해당 소켓의 consumer id들의 배열
      peerDetails: {
        name: 로컬 스토리지의 유저 이름,
        isAdmin: admin인지 아닌지 여부
      }
  }
*/
let peers = {};

io.on("connection", (socket) => {
  // 처음 클라이언트에서 start capture를 했을 경우에 발생하는 이벤트
  socket.on("join-room", ({ roomName }, setDevice) => {
    console.log("socket on join-room");
    // peers초기 세팅
    peers[socket.id] = {
      socket,
      roomName,
      transports: [],
      producers: [],
      consumers: [],
      peerDetails: {
        name: "",
        isAdmin: false,
      },
    };

    const rtpCapabilities = getRtcCapabilities();

    setDevice(rtpCapabilities);
  });

  // device rtp capabilities를 받아서 세팅을 완료 했고 remote producer 혹은 consumer를 만드는 이벤트
  socket.on("createWebRtcTransport", async ({ consumer }, callback) => {
    if (!consumer) {
      console.log(socket.id, " producer로서 createWebRtcTransport 호출");
    } else {
      console.log(socket.id, " consumer로서 createWebRtcTransport 호출");
    }

    const socketId = socket.id;
    const roomName = peers[socket.id].roomName;

    const { transport, params } = await createWebRtcTransport();

    // transport를 등록한다. 이 transport는 producer이거나 consumer일 수 있다.
    transports = [...transports, { socketId, roomName, transport, consumer }];

    // 사용자의 peer에 transport를 추가한다.
    setPeers(socketId, "transports", (prevTransports) => [
      ...prevTransports,
      transport.id,
    ]);

    console.log("create web rtc transport success");

    if (consumer) {
      // consumer일 경우에는 다른 로직을 작성해야 하기 때문에 분기 처리
      callback({ params });
    } else {
      console.log("socket emit created web-rtc-transport");
      socket.emit("createdWebRtcTransport", params);
    }
  });

  // 서버측 transport와 클라이언트 측 transport를 연결(핸드쉐이크)하는 이벤트
  socket.on("transport-connect", ({ dtlsParameters }) => {
    console.log("start - socket on 'transport connect' ");

    const transport = getTransportProduce(socket.id);

    if (!transport) {
      console.log("no transport found");
      return;
    }

    try {
      transport.connect({ dtlsParameters });
      console.log("end - 'transport connect' success");
    } catch (error) {
      console.log("oops, transport connect error", error);
    }
  });

  // 클라이언트에서 produce했을 때 서버에서 받는 이벤트 핸들러
  // 클1이 produce -> 서버(remote producer)
  socket.on(
    "transport-produce",
    async ({ kind, rtpParameters, appData, socketId }, callback) => {
      console.log("start - socket on 'transport produce'");
      //TODO : kind에 따른 처리를 해줘야 한다. (video 인지 audio 인지)
      console.log("app Data is : ", appData);
      const transport = getTransportProduce(socketId);

      try {
        const remoteProducer = await transport.produce({
          kind,
          rtpParameters,
          appData,
        });

        const { roomName } = peers[socket.id];

        addProducer(remoteProducer, roomName, socket.id, socket.name);

        setPeers(socket.id, "producers", (prevProducers) => [
          ...prevProducers,
          remoteProducer.id,
        ]);

        informToConsumers(roomName, socket.id, remoteProducer.id);

        remoteProducer.on("transportclose", () => {
          remoteProducer.close();
        });

        console.log("end - 'transport produce' success");

        callback({
          id: remoteProducer.id,
          producersExist: remoteProducer.length > 1,
        });
      } catch (error) {
        console.log("oops, transport produce error", error);
      }
    }
  );

  socket.on("get-producers", (callback) => {
    const { roomName } = peers[socket.id];
    // ? 이 값은 왜 필요한거지?
    const socketName = peers[socket.id].peerDetails.name;

    let producerList = producers
      .filter(
        (producer) =>
          producer.roomName === roomName && producer.socketId !== socket.id
      )
      .map((producer) => [
        producer.producer.id,
        peers[producer.socketId].peerDetails.name,
        producer.socketId,
        peers[producer.socketId].peerDetails.isAdmin,
      ]);

    callback(producerList);
  });

  socket.on(
    "consume",
    async (
      { rtpCapabilities, remoteProducerId, serverConsumerTransportId },
      callback
    ) => {
      const { roomName } = peers[socket.id];
      const userName = peers[socket.id].peerDetails.name;

      const consumerTransport = transports.find(
        (transport) =>
          transport.consumer &&
          transport.transport.id === serverConsumerTransportId
      ).transport;

      if (
        !getIsCanConsumeWithRouter({
          producerId: remoteProducerId,
          rtpCapabilities,
        })
      ) {
        console.log("can not consume");
        return;
      }

      try {
        console.log("start - consume");
        const consumer = await consumerTransport.consume({
          producerId: remoteProducerId,
          rtpCapabilities,
          paused: true,
        });

        consumer.on("transportclose", () => {
          console.log("transport close from consumer");
        });

        consumer.on("producerclose", () => {
          socket.emit("producer-closed", { remoteProducerId });

          consumerTransport.close();

          consumers = consumers.filter(
            (otherConsumer) => otherConsumer.consumer.id !== consumer.id
          );
        });

        addConsumer(consumer, roomName, socket.id);

        setPeers(socket.id, "consumers", (prevConsumers) => [
          ...prevConsumers,
          consumer.id,
        ]);

        const params = {
          id: consumer.id,
          producerId: remoteProducerId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
          serverConsumerId: consumer.id,
          userName,
        };

        console.log("end- consume");

        callback(params);
      } catch (error) {
        console.log("oops consume error", error);
      }
    }
  );

  socket.on(
    "transport-recv-connect",
    async ({ dtlsParameters, serverConsumerTransportId }) => {
      console.log('start - socket on "transport-recv-connect"');
      const consumerTransport = transports.find(
        (transport) =>
          transport.transport.id === serverConsumerTransportId &&
          transport.consumer
      )?.transport;

      console.log("consumer Transport is ", consumerTransport);

      if (!consumerTransport) {
        console.log("oops, no transport found");
        return;
      }

      try {
        await consumerTransport.connect({ dtlsParameters });
        console.log("end - socket on 'transport-recv-connect' success");
      } catch (error) {
        console.log("transport-recv-connect error", error);
      }
    }
  );

  socket.on("consumer-resume", async ({ serverConsumerId }) => {
    console.log("start - socket on 'consumer-resume'");
    const consumer = consumers.find(
      (consumer) => consumer.consumer.id === serverConsumerId
    )?.consumer;
    if (consumer) {
      await consumer.resume();
      console.log("end - socket on 'consumer-resume' success");
    }
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});

function getTransportProduce(socketId) {
  return transports.find(
    (transport) => transport.socketId === socketId && !transport.consumer
  ).transport;
}

function addProducer(producer, roomName, socketId, socketName) {
  producers = [
    ...producers,
    { socketId, producer, roomName, name: socketName, kind: producer.kind },
  ];
}

function informToConsumers(roomName, socketId, id) {
  producers.forEach((producer) => {
    if (producer.roomName === roomName && producer.socketId !== socketId) {
      const { socket, peerDetails } = peers[producer.socketId];
      // ! 이떄 name과 isAdmin은 사용안함 무시해도 되는 내용, 교체될 수 있는 내용임
      const { name, isAdmin } = peerDetails;

      socket.emit("new-producer", {
        producerId: id,
        socketName: name,
        socketId,
        isNewSocketHost: isAdmin,
      });
    }
  });
}

function addConsumer(consumer, roomName, socketId) {
  consumers = [...consumers, { socketId, consumer, roomName }];
}

function setPeers(socketId, key, callback) {
  peers[socketId] = {
    ...peers[socketId],
    [key]: callback(peers[socketId][key]),
  };
}
