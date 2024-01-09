const { RTCPeerConnection, RTCIceCandidate } = require("werift");
const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
let users = {};
let peerConnectionReceiver = {};

function handleJoinRoom(io) {
  return ({ socketId, roomId }) => {
    console.log(`join room roomId : ${roomId}, socketID: ${socketId}`);
    io.to(socketId).emit("join-room", joinRoom(socketId, roomId));
  };
}

function createPeerConnection(socketId) {
  const peerConnection = new RTCPeerConnection(configuration);

  peerConnectionReceiver = {
    ...peerConnectionReceiver,
    [socketId]: peerConnection,
  };
  return peerConnection;
}
function handleReceiveOffer(io, socket) {
  return async ({ offer, socketId, roomId }) => {
    const peerConnection = createPeerConnection(socketId);

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer({
      offerToReceiveVideo: true,
      offerToReceiveAudio: true,
    });
    await peerConnection.setLocalDescription(answer);

    peerConnection.on("icecandidate", (ice) => {
      socket
        .to(socketId)
        .emit("send-candidate-info", { candidate: ice.candidate });
    });

    io.to(socketId).emit("send-answer", answer);
  };
}
async function handleReceiveCandidateInfo({ candidate, socketId }) {
  const peerConnection = peerConnectionReceiver[socketId];
  await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

function getUsers(roomId) {
  return (users[roomId] = users[roomId] || []);
}
function joinRoom(socketId, roomId) {
  users[roomId] = [...new Set([...getUsers(roomId), socketId])];
  return users[roomId];
}
function isInclude(array, value) {
  return array.indexOf(value) > -1;
}
module.exports = {
  handleJoinRoom,
  handleReceiveOffer,
};
