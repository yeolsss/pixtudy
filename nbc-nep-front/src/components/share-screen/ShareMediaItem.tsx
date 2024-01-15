interface Props {
  stream: MediaStream;
  type: "video" | "audio";
}

export default function ShareMediaItem({ stream, type }: Props) {
  return type === "video" ? (
    <video
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
    <audio
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
