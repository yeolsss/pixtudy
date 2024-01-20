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
  isCurrentPlayer?: boolean;
}

export default function ShareMediaItem({
  videoSource,
  nickname,
  isCurrentPlayer,
}: Props) {
  const { track } = videoSource;

  if (!track) return null;

  const stream = new MediaStream([track]);
  const type = track.kind;

  const isAudio = type === "audio";

  return (
    <StShareMediaItem $isAudio={isAudio}>
      {!isAudio && <StShareMediaNickname>{nickname}</StShareMediaNickname>}
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
          muted={isCurrentPlayer}
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
