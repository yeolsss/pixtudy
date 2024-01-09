/*
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const { handleJoinRoom, handleReceiveOffer } = require("./conference");

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

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// 일단 들어오면 소켓을 연결을 해야 한다.
io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("join-room", handleJoinRoom(io));
  socket.on("send-offer", handleReceiveOffer(io, socket));
  socket.on("send-candidate-info");

  /!* socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });
  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });
  socket.on("ice", (ice) => {
    socket.broadcast.emit("ice", ice);
  }); *!/
});

server.listen(3001, () => {
  console.log("Server listening on port 3000");
});
*/

const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
let server = http.Server(app);
let io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.set("port", 3003);
app.use("/static", express.static(__dirname + "/static"));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "index.html"));
});

server.listen(3003, function () {
  console.log("Starting server on port 3003");
});

let players = {};

io.on("connection", function (socket) {
  console.log("player [" + socket.id + "] connected");

  players[socket.id] = {
    rotation: 0,
    x: 100,
    y: 100,
    playerId: socket.id,
    movingLeft: false,
    movingRight: false,
    movingUp: false,
    movingDown: false,
    lastDirection: false,
  };
  socket.emit("currentPlayers", players);
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", function () {
    console.log("player [" + socket.id + "] disconnected");
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });

  socket.on("playerMovement", function (movementData) {
    const player = players[socket.id];
    player.x = movementData.x;
    player.y = movementData.y;
    player.movingLeft = movementData.movingLeft;
    player.movingRight = movementData.movingRight;
    player.movingUp = movementData.movingUp;
    player.movingDown = movementData.movingDown;
    player.lastDirection = movementData.lastDirection;
    console.log("playerMovement", player);
    socket.broadcast.emit("playerMoved", player);
  });
});

function getRandomColor() {
  return "0x" + Math.floor(Math.random() * 16777215).toString(16);
}
