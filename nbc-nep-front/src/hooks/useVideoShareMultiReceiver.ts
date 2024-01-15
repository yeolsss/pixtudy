import { useRef } from "react";
import { Socket } from "socket.io-client";
const peerConnectionConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
type ReceiverPeerConnections = {
  [socketId: string]: RTCPeerConnection;
};
interface Props {
  socket: Socket;
  onTrack: (senderUserId: string) => (event: RTCTrackEvent) => void;
  onIceCandidate: (
    senderUserId: string
  ) => (event: RTCPeerConnectionIceEvent) => void;
}
export default function useVideoShareMultiReceiver({
  socket,
  onTrack,
  onIceCandidate,
}: Props) {
  const receiverPeerConnectionRef = useRef<ReceiverPeerConnections>({});
  // senderUserId는 서버에서 보내는 sender user id
  async function createReceiverPeerConnection(senderUserId: string) {
    const receiverPeerConnection = new RTCPeerConnection(peerConnectionConfig);
    receiverPeerConnectionRef.current[senderUserId] = receiverPeerConnection;

    const offer = await createAndSetOffer(senderUserId);
    socket.emit("receiverOffer", {
      offer,
      receiverUserId: socket.id,
      senderUserId,
    });

    receiverPeerConnection.addEventListener("track", onTrack(senderUserId));
    receiverPeerConnection.addEventListener(
      "icecandidate",
      onIceCandidate(senderUserId)
    );
  }

  async function createAndSetOffer(senderUserId: string) {
    const peerConnection = receiverPeerConnectionRef.current[senderUserId];
    if (!peerConnection) return;

    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }

  async function getReceiverAnswer(
    senderUserId: string,
    answer: RTCSessionDescription
  ) {
    const peerConnection = receiverPeerConnectionRef.current[senderUserId];
    if (!peerConnection) return;

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }

  async function getReceiverCandidate(
    senderUserId: string,
    candidate: RTCIceCandidateInit
  ) {
    const peerConnection = receiverPeerConnectionRef.current[senderUserId];
    if (!peerConnection) return;

    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  return {
    createReceiverPeerConnection,
    receiverPeerConnections: receiverPeerConnectionRef.current,
    getReceiverAnswer,
    getReceiverCandidate,
  };
}
