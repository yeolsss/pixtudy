const router = require("express").Router();
const players = {};

module.exports = {
  init: function (io) {
    io.on("connection", (socket) => {
      console.log("player[" + socket.id + "] connected");
      socket.on("user-data", (playerInfo) => {
        if (!playerInfo) return;

        const { playerId, spaceId } = playerInfo;

        players[playerId] = {
          rotation: 0,
          x: 1200,
          y: 700,
          frame: 0,
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
        if (!player) return;
        const { spaceId, playerId } = player;

        io.to(spaceId).emit("player-disconnected", playerId);

        delete players[playerId];

        const updatedPlayersInSpace = getPlayersInSpace(spaceId);
        console.log("updatedPlayersInspace", updatedPlayersInSpace);
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

      socket.on("change-player-state", (playerId, state) => {
        const player = players[playerId];
        if (!player) return;
        console.log(player.state, state, player);
        if (player.state === state) return;
        players[playerId] = setPlayer(player, "state", state);
        socket
          .to(player.spaceId)
          .emit("change-player-state", players[playerId]);
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

function setPlayer(player, key, value) {
  return { ...player, [key]: value };
}
