import { CSSProperties, useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export default function ShareScreen() {
  const socketRef = useRef<Socket | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const otherVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      withCredentials: true,
    });
    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("connected");
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
      myVideoRef.current.srcObject =
        await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (err) {
      console.error("handle start capture", err);
    }
  };

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
