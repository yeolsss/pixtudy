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
