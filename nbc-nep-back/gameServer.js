const express = require("express");
const router = express.Router();
const players = {};
const PlayerState = {
  ONLINE: 0,
  EATING: 1,
  LEFT_SEAT: 2,
  DISTURB: 3,
};

module.exports = {
  init: function (io) {
    io.on("connection", function (socket) {
      console.log("player [" + socket.id + "] connected");

      socket.on("userData", (playerInfo) => {
        socket.join(playerInfo.spaceId);
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

        const playersInSpace = Object.values(players).filter(
          (player) => player.spaceId === playerInfo.spaceId
        );

        const playerSpaceId = players[socket.id] ? playerInfo.spaceId : null;
        socket.emit("currentPlayers", playersInSpace);
        socket.to(playerSpaceId).emit("newPlayer", players[socket.id]);

        io.to(playerSpaceId).emit("metaversePlayerList", playersInSpace);
      });

      socket.on("disconnect", function () {
        console.log("player [" + socket.id + "] disconnected");
        const playerSpaceId = players[socket.id]
          ? players[socket.id].spaceId
          : null;
        io.to(playerSpaceId).emit("playerDisconnected", socket.id);

        delete players[socket.id]; // 플레이어 삭제한 후에 players 리스트를 다시 클라이언트로 보낸다
        const updatedPlayersInSpace = Object.values(players).filter(
          (player) => player.spaceId === playerSpaceId
        );

        io.to(playerSpaceId).emit("metaversePlayerList", updatedPlayersInSpace);
      });

      // characterScenes의 emitPlayerMovement 함수에서 받은 데이터를 다시 클라이언트로 보낸다
      socket.on("playerMovement", function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].frame = movementData.frame;

        io.to(players[socket.id].spaceId).emit(
          "playerMoved",
          players[socket.id]
        );
        // socket.broadcast.emit("playerMoved", players[socket.id]);
      });
    });
  },
  getCurrentUser: () => {
    router.get("/spaces/:spaceid/users/count", (req, res) => {
      const spaceId = req.params.spaceid;
      const playersInSpace = Object.values(players).filter((player) => {
        return player.spaceId === spaceId;
      });
      res.status(200).json({ count: playersInSpace.length });
    });
    return router;
  },
};
