import useVideoShare from "@/hooks/useVideoShare";
import { CSSProperties, useState } from "react";
export default function ShareScreen() {
  const [myVideos, setMyVideos] = useState<MediaStream[]>([]);
  const [otherVideos, setOtherVideos] = useState<MediaStream[]>([]);
  function handleTrack(event: RTCTrackEvent) {
    const { streams } = event;
    setOtherVideos((prev) => [
      ...prev.filter((item) => item.active),
      ...streams,
    ]);
  }

  const { peerConnection, makeCall } = useVideoShare({ handleTrack });

  const handleStartCapture = async () => {
    const displayMediaOptions = {
      video: {
        displaySurface: "window",
      },
      audio: false,
    };

    try {
      const mediaStream: MediaStream =
        await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      const nextMyVideos = [...myVideos, mediaStream];
      setMyVideos(nextMyVideos);
      makeCall(nextMyVideos);
    } catch (err) {
      console.error("on error when start capture", err);
    }
  };

  return (
    <div>
      <button onClick={handleStartCapture}>Start Capture</button>
      <section style={sectionStyle}>
        <h1>my videos</h1>
        {myVideos.map((stream) => (
          <video
            key={stream.id}
            style={videoStyle}
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            autoPlay
          />
        ))}
      </section>
      <section style={sectionStyle}>
        <h2>other videos</h2>
        {otherVideos.map((stream) => (
          <video
            key={stream.id}
            style={videoStyle}
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            autoPlay
          />
        ))}
      </section>
    </div>
  );
}

const videoStyle: CSSProperties = {
  border: "1px solid black",
  width: 400,
  height: 300,
};
const sectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};
