const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const cors = require("cors");
const { handleJoinRoom, handleReceiveOffer } = require("./conference");
const gameServer = require("./gameServer");

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

// Game Server Routes
app.use("/static", express.static(__dirname + "/static"));

// Conference Socket Handlers
io.of("/conference").on("connection", (socket) => {
  console.log("Conference socket connected");

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });
  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });
  socket.on("ice", (ice) => {
    socket.broadcast.emit("ice", ice);
  });
  // 추가적인 이벤트 핸들러를 여기에 구현할 수 있습니다.
});
io.on("connection", (socket) => {
  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });
  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });
  socket.on("ice", (ice) => {
    socket.broadcast.emit("ice", ice);
  });
});

// Game Server Socket Handlers
const metaverseNamespace = io.of("/metaverse");

gameServer(metaverseNamespace);

server.listen(3001, function () {
  console.log("Starting server on port 3001");
});
