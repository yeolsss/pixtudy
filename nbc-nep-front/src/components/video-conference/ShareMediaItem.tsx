import { StAudio, StVideo } from "./VideoConference";

interface Props {
  stream: MediaStream;
  type: "video" | "audio";
}

export default function ShareMediaItem({ stream, type }: Props) {
  return type === "video" ? (
    <StVideo
      playsInline
      autoPlay
      ref={(videoRef) => {
        if (!videoRef) {
          return;
        }
        videoRef.srcObject = stream;
      }}
    />
  ) : (
    <StAudio
      playsInline
      autoPlay
      ref={(audioRef) => {
        if (!audioRef) {
          return;
        }
        audioRef.srcObject = stream;
      }}
    />
  );
}
