import {
  StAudio,
  StShareMediaItem,
  StShareMediaNickname,
  StVideo,
} from "./styles/videoConference.styles";
import { VideoSource } from "./types/ScreenShare.types";

interface Props {
  videoSource: VideoSource;
  nickname: string;
}

export default function ShareMediaItem({ videoSource, nickname }: Props) {
  const { track, appData } = videoSource;

  if (!track) return null;

  const stream = new MediaStream([track]);
  const type = track.kind;

  return (
    <StShareMediaItem>
      <StShareMediaNickname>{nickname}</StShareMediaNickname>
      {type === "video" ? (
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
      )}
    </StShareMediaItem>
  );
}
