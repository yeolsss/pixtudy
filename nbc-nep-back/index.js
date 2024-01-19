const express = require("express");
const http = require("http");
require("dotenv").config();
const socketIO = require("socket.io");
const cors = require("cors");
const gameServer = require("./gameServer");
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
