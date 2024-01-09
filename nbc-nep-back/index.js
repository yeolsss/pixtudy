const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
} = require("werift");

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
const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
// Records<senderUserId,peerConnection>
let receiverPCs = {};
let senderPCs = {};
let users = {};
let socketToRoom = {};
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

function createReceiverPeerConnection(senderUserId, socket) {
  const peerConnection = new RTCPeerConnection(pc_config);

  receiverPCs[senderUserId] = peerConnection;

  peerConnection.on("icecandidate", (e) => {
    // 받은 ice candidate를 다시 sender에게 전달한다.
    socket.emit("getSenderCandidate", { candidate: e.candidate });
  });

  peerConnection.on("track", (e) => {
    const [stream] = e.streams;
    console.log(
      "server 기준 receiver peer connection에는 클1가 전달한 stream이 있어야 한다",
      !!stream
    );
    users["roomName"] = [
      ...(users["roomName"] || []),
      { id: socket.id, stream },
    ];

    socket.broadcast.emit("userEnter", { userId: socket.id });
  });
  return peerConnection;
}
function createSenderPeerConnection(senderUserId, receiverUserId, socket) {
  const peerConnection = new RTCPeerConnection(pc_config);
  //여기에서 sender는 서버 입장 sender, receiver는 클라이언트 입장
  senderPCs[senderUserId] = peerConnection;

  peerConnection.on("icecandidate", (e) => {
    socket.emit("getReceiverCandidate", {
      candidate: e.candidate,
      id: senderUserId,
    });
  });

  // 여기까지의 시나리오는 기존에 있던 사람 말고 다른 사람이 새롭게 화면공유를 실시한다면
  // 그러면 어떤 사람들의 media stream을 가져와야 하냐면
  // 새롭게 추가된 사람의 mediaStream을 서버에서 만들고
  // 그 새롭게 생긴 pc들을 다시 다른 사람들하고 연결을 해야 한다
  //
  const sendUser = users["roomName"].find((user) => user.id === senderUserId);
  if (sendUser) {
    console.log("sendUser is : ", sendUser);
    sendUser.stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, sendUser.stream);
    });
  }
  return peerConnection;
}

io.sockets.on("connection", (socket) => {
  socket.on(
    "receiverOffer",
    async ({ offer, receiverUserId, senderUserId }) => {
      // client 입장에서 receiver offer를 제공했으니 서버에서 sender를 만들어야 한다
      // sender는
      const peerConnection = createSenderPeerConnection(
        senderUserId,
        receiverUserId,
        socket
      );

      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      await peerConnection.setLocalDescription(answer);
      socket.emit("getReceiverAnswer", {
        id: senderUserId,
        answer,
      });
    }
  );

  socket.on(
    "receiverCandidate",
    async ({ candidate, receiverUserId, senderUserId }) => {
      const senderPeerConnection = senderPCs[senderUserId];
      console.log("senderPeerConnections is : ", !!senderPeerConnection);
      await senderPeerConnection.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    }
  );

  socket.on("senderOffer", async ({ offer, senderUserId }) => {
    // 클라이언트 측에서 sender offer를 제공했으니 receiver를 서버에서 만들어야 한다
    const peerConnection = createReceiverPeerConnection(senderUserId, socket);
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(answer);
    console.log(
      "서버 측에서 sender offer를 제공했으니 receiver를 서버에서 만들고 answer를 다시 클라이언트에게 전달"
    );
    socket.emit("getSenderAnswer", { answer });
  });

  socket.on("senderCandidate", async ({ candidate, senderUserId }) => {
    // sender의 candidate를 receiver에게 전달
    try {
      const receiverPeerConnection = receiverPCs[senderUserId];
      if (receiverPeerConnection) {
        await receiverPeerConnection.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    } catch (err) {
      console.log("sender Candidate error: ", err);
    }
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3000");
});
