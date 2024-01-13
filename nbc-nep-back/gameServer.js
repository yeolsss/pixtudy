module.exports = function (io) {
  let players = {};
  let player;

  io.on("connection", function (socket) {
    console.log("player [" + socket.id + "] connected");

    socket.on("userData", (playerInfo) => {
      players[socket.id] = {
        rotation: 0,
        x: 100,
        y: 100,
        socketId: socket.id,
        playerId: playerInfo.playerId,
        nickname: playerInfo.nickname,
        character: playerInfo.character,
        frame: 0,
      };
      socket.emit("currentPlayers", players);
      socket.broadcast.emit("newPlayer", players[socket.id]);
	    io.emit("metaversePlayerList", players);
    });

    socket.on("disconnect", function () {
      console.log("player [" + socket.id + "] disconnected");
      delete players[socket.id];
      io.emit("playerDisconnected", socket.id);
      io.emit("metaversePlayerList", players);
    });

    socket.on("playerMovement", function (movementData) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].frame = movementData.frame;

      socket.broadcast.emit("playerMoved", players[socket.id]);
    });
  });
};
