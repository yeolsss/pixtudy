import MicOff from "@/assets/dock-icons/mic-off.svg";
import MicOn from "@/assets/dock-icons/mic-on.svg";
import { Player } from "@/components/metaverse/types/metaverse";
import Image from "next/image";
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

  const AudioBadge = (
    <Image
      src={isAudioOn ? MicOn : MicOff}
      width={24}
      height={24}
      style={{ position: "absolute", left: 10, bottom: 10 }}
      alt={"mic image"}
    />
  );
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
              {videoSource.appData.shareType === "webcam" && AudioBadge}
            </ShareMediaItem>
          ))}
        </>
      )}
    </>
  );
}
