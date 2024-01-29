const express = require("express");
const http = require("http");
require("dotenv").config();
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
    origin: ["http://localhost:3000", "https://nbc-nep-one.vercel.app"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://nbc-nep-one.vercel.app"],
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

const PORT = process.env.NODE_ENV === "production" ? 8080 : 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
