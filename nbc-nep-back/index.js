const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { handleJoinRoom, handleReceiveOffer } = require("./conference");

const app = express();
let server = http.Server(app);
let io = socketIO(server, {
  pingTimeout: 60000,
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
  console.log("socket connected");

  socket.on("join-room", handleJoinRoom(io));
  socket.on("send-offer", handleReceiveOffer(io, socket));
  socket.on("send-candidate-info");

  /* socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });
  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });
  socket.on("ice", (ice) => {
    socket.broadcast.emit("ice", ice);
  }); */
});

server.listen(3001, () => {
  console.log("Server listening on port 3000");
});

function getTransportProduce(socketId) {
  return transports
    .filter(
      (transport) => transport.socketId === socketId && !transport.consumer
    )
    .at(-1).transport;
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

function getExistsProducers(roomName, socketId) {
  return producers
    .filter(
      (producer) =>
        producer.roomName === roomName && producer.socketId !== socketId
    )
    .map(convertProducerToParams);
}

function convertProducerToParams(producer) {
  return {
    producerId: producer.producer.id,
    socketName: peers[producer.socketId].peerDetails.name,
    socketId: producer.socketId,
    isNewSocketHost: peers[producer.socketId].peerDetails.isAdmin,
  };
}
