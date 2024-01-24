module.exports = function (io) {
  let chat = {};
  io.on("connection", function (socket) {
    console.log("chat [" + socket.id + "] connected");

    socket.on("joinRoom", (spaceId) => {
      chat[socket.id] = {
        userId: socket.id,
        playerDisplayName: socket.playerDisplayName || socket.id,
        message: "",
        spaceId,
      };

      socket.join(spaceId);
    });

    socket.on("disconnect", function () {
      console.log("chat [" + socket.id + "] disconnected");
      const spaceId = chat[socket.id].spaceId;

      delete chat[socket.id];

      io.to(spaceId).emit("chatDisconnected", socket.id);
    });

    socket.on(
      "sendMessage",
      function ({ playerDisplayName, message, spaceId }) {
        chat[socket.id] = {
          userId: socket.id,
          playerDisplayName: playerDisplayName || socket.id,
          message: message,
          spaceId,
        };
        io.to(spaceId).emit("receiveMessage", chat[socket.id]);
      }
    );
  });
};
