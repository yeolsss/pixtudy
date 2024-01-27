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
      try {
        const spaceId = chat[socket.id].spaceId;

        io.to(spaceId).emit("chatDisconnected", socket.id);
      } catch (error) {
        console.error("error disconnect chat", error);
      } finally {
        delete chat[socket.id];
      }
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

    socket.on("removeRoom", () => {
      const player = chat[socket.id];
      const spaceId = player.spaceId;

      io.to(spaceId).emit("removedRoom");

      // TODO : io room 제거...
    });
  });
};
