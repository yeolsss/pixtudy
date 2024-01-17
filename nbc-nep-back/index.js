const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { init: gameServer, getCurrentUser } = require("./gameServer");
const chatServer = require("./chatServer");
const conferenceServer = require("./conference/index");

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

app.use("/api", getCurrentUser());

const metaverseNamespace = io.of("/metaverse");
gameServer(metaverseNamespace);

// chat server Socket Handlers
const chatNamespace = io.of("/chat");
chatServer(chatNamespace);

const conferenceNamespace = io.of("/conference");
conferenceServer(conferenceNamespace);

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
