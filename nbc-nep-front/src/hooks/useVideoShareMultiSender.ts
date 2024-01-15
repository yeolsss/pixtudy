import { useEffect, useRef } from "react";
const peerConnectionConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
interface Props {
  handleIceCandidate: (event: RTCPeerConnectionIceEvent) => void;
}

export default function useVideoShareMultiSender({
  handleIceCandidate,
}: Props) {
  const senderPeerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    senderPeerConnectionRef.current = new RTCPeerConnection(
      peerConnectionConfig
    );
    const senderPeerConnection = senderPeerConnectionRef.current;
    senderPeerConnection.addEventListener("icecandidate", handleIceCandidate);
    return () => {
      senderPeerConnection.removeEventListener(
        "icecandidate",
        handleIceCandidate
      );
    };
  }, [senderPeerConnectionRef.current]);

  function addTracksToConnection(mediaStream: MediaStream) {
    const senderPeerConnection = senderPeerConnectionRef.current!;
    mediaStream.getTracks().forEach((track) => {
      senderPeerConnection.addTrack(track, mediaStream);
    });
  }
  async function createAndSetOffer() {
    const senderPeerConnection = senderPeerConnectionRef.current!;
    const offer = await senderPeerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await senderPeerConnection.setLocalDescription(
      new RTCSessionDescription(offer)
    );
    return offer;
  }
  async function getSenderAnswer(answer: RTCSessionDescription) {
    const senderPeerConnection = senderPeerConnectionRef.current!;
    await senderPeerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }
  async function getSenderCandidate(candidate: RTCIceCandidateInit) {
    const senderPeerConnection = senderPeerConnectionRef.current!;
    await senderPeerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  return {
    addTracksToConnection,
    createAndSetOffer,
    getSenderAnswer,
    getSenderCandidate,
  };
}
