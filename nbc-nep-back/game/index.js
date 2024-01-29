const router = require("express").Router();
const players = {};

module.exports = {
  init: function (io) {
    console.log("player[" + socket.id + "] connected");
    io.on("connection", (socket) => {
      socket.on("user-data", (playerInfo) => {
        const { playerId, spaceId } = playerInfo;

        players[playerId] = {
          rotation: 0,
          x: 100,
          y: 100,
          frame: 0,
          playerState: 0,
          ...playerInfo,
        };

        socket.playerId = playerId;

        const player = players[playerId];
        const playersInSpace = getPlayersInSpace(spaceId);

        socket.join(spaceId);

        socket.emit("current-players", playersInSpace);
        socket.to(spaceId).emit("new-player", player);

        io.to(spaceId).emit("metaverse-players", playersInSpace);
      });

      socket.on("disconnect", () => {
        console.log("player [" + socket.id + "] disconnected");

        if (!socket.playerId) return;
        const player = players[socket.playerId];
        const { spaceId, playerId } = player;

        io.to(spaceId).emit("player-disconnected", playerId);

        delete players[playerId];

        const updatedPlayersInSpace = getPlayersInSpace(spaceId);

        io.to(spaceId).emit("metaverse-players", updatedPlayersInSpace);
      });

      socket.on("player-movement", (playerId, movementData) => {
        let player = players[playerId];

        if (!player) return;

        const { x, y, frame } = movementData;

        players[playerId] = setPlayerMovement(player, x, y, frame);
        player = players[playerId];

        io.to(player.spaceId).emit("player-moved", player);
      });
    });
  },
  getCurrentUser,
};

function getCurrentUser() {
  router.get("/spaces/:spaceid/users/count", (req, res) => {
    const spaceId = req.params.spaceid;
    const playersInSpace = Object.values(players).filter((player) => {
      return player.spaceId === spaceId;
    });
    res.status(200).json({ count: playersInSpace.length });
  });
  return router;
}

function getPlayersInSpace(spaceId) {
  return Object.values(players).filter((player) => player.spaceId === spaceId);
}

function setPlayerMovement(player, x, y, frame) {
  return {
    ...player,
    x,
    y,
    frame,
  };
}
