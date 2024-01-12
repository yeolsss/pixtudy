module.exports = function (io) {
  let chat = {};
  io.on("connection", function (socket) {
    console.log("chat [" + socket.id + "] connected");

    chat[socket.id] = {
      userId: socket.id,
      message: socket.message,
    };
    socket.emit("chat", chat);

    socket.on("disconnect", function () {
      console.log("chat [" + socket.id + "] disconnected");
      delete chat[socket.id];
      io.emit("chatDisconnected", socket.id);
    });

    socket.on("sendMessage", function ({ message }) {
      chat[socket.id].message = message;
      socket.emit("receiveMessage", chat[socket.id]);
      socket.broadcast.emit("receiveMessage", chat[socket.id]);
    });
  });
};
