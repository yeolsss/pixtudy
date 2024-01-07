import useVideoShare from "@/hooks/useVideoShare";
import { CSSProperties, useRef } from "react";
const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
export default function ShareScreen() {
  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const otherVideoRef = useRef<HTMLVideoElement | null>(null);

  function handleTrack(event: RTCTrackEvent) {
    const { streams, track } = event;
    console.log("handle track", streams);
    if (streams.length > 0) {
      const [stream] = streams;
      if (otherVideoRef.current) {
        otherVideoRef.current.srcObject = stream;
      }
    }
  }

  const { peerConnection, makeCall } = useVideoShare({ handleTrack });

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
      makeCall(mediaStream);
    } catch (err) {
      console.error("handle start capture", err);
    }
  };
  // A가 여러 화면을 공유한다
  // B는 A가 공유한 여러 화면을 볼 수 있어야 한다
  // 그럼 우선, A만 공유할 수 있다고 가정을 한다?
  // 아니면 동적으로 추가될 수 있도록 한다.
  // 근데 리액트에서 동적으로 한다고....?
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={handleStartCapture}>Start Capture</button>
      <video ref={myVideoRef} style={videoStyle} autoPlay></video>
      <video ref={otherVideoRef} style={videoStyle} autoPlay></video>
      {/* <ShareScreenViewer peerConnection={peerConnectionRef.current!} /> */}
    </div>
  );
}

const videoStyle: CSSProperties = {
  border: "1px solid black",
};
