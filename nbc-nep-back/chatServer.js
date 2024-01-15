module.exports = function (io) {
  let chat = {};
  io.on("connection", function (socket) {
    console.log("chat [" + socket.id + "] connected");

    const spaceId = socket.handshake.query.spaceId || "defaultSpace";

    chat[socket.id] = {
      userId: socket.id,
      playerDisplayName: socket.playerDisplayName || socket.id,
      message: socket.message,
      spaceId,
    };
    socket.join(spaceId);
    io.to(spaceId).emit("chat", chat);

    socket.on("disconnect", function () {
      console.log("chat [" + socket.id + "] disconnected");
      delete chat[socket.id];
      io.to(spaceId).emit("chatDisconnected", socket.id);
    });

    socket.on("sendMessage", function ({ playerDisplayName, message }) {
      chat[socket.id] = {
        userId: socket.id,
        playerDisplayName: playerDisplayName || socket.id,
        message,
        spaceId,
      };
      io.to(spaceId).emit("receiveMessage", chat[socket.id]);
    });
  });
};
