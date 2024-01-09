module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("player-move", (data) => {});
  });
};
