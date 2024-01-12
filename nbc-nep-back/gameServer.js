module.exports = function (io) {
  let players = {};

  io.on("connection", function (socket) {
    console.log("player [" + socket.id + "] connected");

    // 클라이언트에서 보낸 쿼리 매개변수로부터 userId를 가져옵니다.
    const userId = socket.handshake.query.userId;

    players[socket.id] = {
      userId,
      rotation: 0,
      x: 100,
      y: 100,
      playerId: socket.id,
      movingLeft: false,
      movingRight: false,
      movingUp: false,
      movingDown: false,
      frame: 0,
    };

    socket.emit("currentPlayers", players);
    //123
    socket.broadcast.emit("newPlayer", players[socket.id]);

    socket.on("disconnect", function () {
      console.log("player [" + socket.id + "] disconnected");
      delete players[socket.id];
      io.emit("playerDisconnected", socket.id);
    });

    socket.on("playerMovement", function (movementData) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].frame = movementData.frame;

      socket.broadcast.emit("playerMoved", players[socket.id]);
    });
  });
};
