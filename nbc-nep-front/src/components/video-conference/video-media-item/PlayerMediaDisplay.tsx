import { Player } from "@/components/metaverse/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { getVideoSourcesExcludeAudio, isArrayEmpty } from "../libs/util";
import { VideoSource } from "../types/ScreenShare.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";

interface Props {
  camAndAudioVideoSources: VideoSource[];
  player: Player;
  isCurrentPlayer: boolean;
}

export default function PlayerMediaDisplay({
  camAndAudioVideoSources,
  player,
  isCurrentPlayer,
}: Props) {
  const excludedAudioVideoSource = getVideoSourcesExcludeAudio(
    camAndAudioVideoSources
  );

  const isVideoOn = !isArrayEmpty(excludedAudioVideoSource);
  const isAudioOn =
    camAndAudioVideoSources.length &&
    camAndAudioVideoSources.length !== excludedAudioVideoSource.length;

  const AudioBadge = isAudioOn ? <p>공유 중</p> : <p>공유 중 아님</p>;

  return (
    <>
      {!isVideoOn ? (
        <DefaultShareMediaItem
          nickname={player.nickname}
          avatar={player.character}
        >
          {AudioBadge}
        </DefaultShareMediaItem>
      ) : (
        <>
          {camAndAudioVideoSources.map((videoSource) => (
            <ShareMediaItem
              key={videoSource.id}
              nickname={player.nickname}
              videoSource={videoSource}
              isCurrentPlayer={isCurrentPlayer}
            >
              {AudioBadge}
            </ShareMediaItem>
          ))}
        </>
      )}
    </>
  );
}
