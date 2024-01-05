import { CSSProperties, useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
export default function ShareScreen() {
  const socketRef = useRef<Socket | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const otherVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnectionRef.current = peerConnection;

    const handleTrack = async (event: RTCTrackEvent) => {
      const [remoteStream] = event.streams;
      otherVideoRef.current!.srcObject = remoteStream;
    };
    const handleIceCandidate = (data: RTCPeerConnectionIceEvent) => {
      socketRef.current!.emit("ice", data.candidate);
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
    socketRef.current = io("http://localhost:3001", {
      withCredentials: true,
    });
    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("connected");
    });
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
      socket.disconnect();
    };
  }, []);

  const handleStartCapture = async () => {
    const displayMediaOptions = {
      video: {
        displaySurface: "window",
      },
      audio: false,
    };
    if (!myVideoRef.current) return;

    try {
      const mediaStream: MediaStream =
        await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      myVideoRef.current.srcObject = mediaStream;
      makeCall(mediaStream, peerConnectionRef.current!);
    } catch (err) {
      console.error("handle start capture", err);
    }
  };

  async function makeCall(
    mediaStream: MediaStream,
    peerConnection: RTCPeerConnection
  ) {
    addTracksToConnection(mediaStream, peerConnection);
    const offer = await createAndSetOffer(peerConnection);
    socketRef.current!.emit("offer", offer);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={handleStartCapture}>Start Capture</button>
      <video ref={myVideoRef} style={videoStyle} autoPlay></video>
      <video ref={otherVideoRef} style={videoStyle} autoPlay></video>
    </div>
  );
}

const videoStyle: CSSProperties = {
  border: "1px solid black",
};
function addTracksToConnection(
  mediaStream: MediaStream,
  peerConnection: RTCPeerConnection
) {
  mediaStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, mediaStream);
  });
}
async function createAndSetOffer(peerConnection: RTCPeerConnection) {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  return offer;
}
