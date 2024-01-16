module.exports = function (io) {
  const players = {};

  io.on("connection", function (socket) {
    console.log("player [" + socket.id + "] connected");

    socket.on("userData", (playerInfo) => {
      console.log("playerInfo.spaceId - ", playerInfo.spaceId);
      players[socket.id] = {
        rotation: 0,
        x: 100,
        y: 100,
        socketId: socket.id,
        playerId: playerInfo.playerId,
        nickname: playerInfo.nickname,
        character: playerInfo.character,
        frame: 0,
        spaceId: playerInfo.spaceId,
      };
      socket.emit("currentPlayers", players);
      socket.broadcast.emit("newPlayer", players[socket.id]);
      io.emit("metaversePlayerList", players);
    });

    socket.on("disconnect", function () {
      io.emit("playerDisconnected", players[socket.id].socketId);
      delete players[socket.id]; // 플레이어 삭제한 후에 players 리스트를 다시 클라이언트로 보낸다
      io.emit("metaversePlayerList", players);
    });

    // characterScenes의 emitPlayerMovement 함수에서 받은 데이터를 다시 클라이언트로 보낸다
    socket.on("playerMovement", function (movementData) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[socket.id].frame = movementData.frame;

      socket.broadcast.emit("playerMoved", players[socket.id]);
    });
  });
};
