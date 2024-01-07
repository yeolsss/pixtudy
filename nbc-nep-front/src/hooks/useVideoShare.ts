import { useEffect, useRef } from "react";
import useSocket from "./useSocket";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

interface Props {
  handleTrack: (event: RTCTrackEvent) => void;
}

export default function useVideoShare({ handleTrack }: Props) {
  const { socket } = useSocket();
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (peerConnectionRef.current) return;
    peerConnectionRef.current = new RTCPeerConnection(configuration);
    const peerConnection = peerConnectionRef.current;
    const handleIceCandidate = (data: RTCPeerConnectionIceEvent) => {
      socket.emit("ice", data.candidate);
    };
    const handleConnectionChange = () => {
      const peerConnection = peerConnectionRef.current!;
      if (peerConnection.connectionState === "connected") {
        console.log("connected");
      }
    };

    peerConnection.addEventListener("track", handleTrack);

    peerConnection.addEventListener("icecandidate", handleIceCandidate);
    peerConnection.addEventListener(
      "connectionstatechange",
      handleConnectionChange
    );
    return () => {
      peerConnection.removeEventListener("track", handleTrack);
      peerConnection.removeEventListener("icecandidate", handleIceCandidate);
      peerConnection.removeEventListener(
        "connectionstatechange",
        handleConnectionChange
      );
    };
  }, []);

  useEffect(() => {
    socket.on("offer", async (offer: RTCSessionDescription) => {
      const peerConnection = peerConnectionRef.current!;
      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(new RTCSessionDescription(answer));
      socket.emit("answer", answer);
    });
    socket.on("answer", async (answer: RTCSessionDescription) => {
      const peerConnection = peerConnectionRef.current!;
      await peerConnection.setRemoteDescription(answer);
    });
    socket.on("ice", async (iceCandidate: RTCIceCandidate) => {
      const peerConnection = peerConnectionRef.current!;
      await peerConnection.addIceCandidate(iceCandidate);
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice");
    };
  }, []);

  async function makeCall(mediaStreams: MediaStream[]) {
    const peerConnection = peerConnectionRef.current!;
    const senders = peerConnection.getSenders();
    if (senders) {
      senders.forEach((sender) => peerConnection.removeTrack(sender));
    }
    mediaStreams.forEach((mediaStream) =>
      addTracksToConnection(mediaStream, peerConnection)
    );
    socket.emit("offer", await createAndSetOffer(peerConnection));
  }

  return { peerConnection: peerConnectionRef.current, makeCall };
}
function addTracksToConnection(
  mediaStream: MediaStream,
  peerConnection: RTCPeerConnection
) {
  mediaStream.getTracks().forEach((track) => {
    console.log(track, mediaStream);
    peerConnection.addTrack(track, mediaStream);
  });
}
async function createAndSetOffer(peerConnection: RTCPeerConnection) {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  return offer;
}
