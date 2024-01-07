import useVideoShare from "@/hooks/useVideoShare";
import { CSSProperties, useState } from "react";
import ShareScreenButton from "./ShareScreenButton";
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

  const handleStartCapture = (stream: MediaStream) => {
    const nextMyVideos = [...myVideos, stream];
    setMyVideos(nextMyVideos);
    makeCall(nextMyVideos);
  };

  return (
    <div>
      <ShareScreenButton onShareScreen={handleStartCapture} />
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
