import MicOff from "@/assets/dock-icons/mic-off.svg";
import MicOn from "@/assets/dock-icons/mic-on.svg";
import { Player } from "@/components/metaverse/types/metaverse";
import Image from "next/image";
import ShareMediaItem from "../ShareMediaItem";
import {
  findVideoSourceByType,
  getVideoSourcesExcludeAudio,
} from "../libs/util";
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

  const audioVideoSource = findVideoSourceByType(
    camAndAudioVideoSources,
    "audio"
  );
  const webCamVideoSource = findVideoSourceByType(
    camAndAudioVideoSources,
    "webcam"
  );

  /* const isVideoOn = !isArrayEmpty(excludedAudioVideoSource);
  const isAudioOn =
    camAndAudioVideoSources.length &&
    camAndAudioVideoSources.length !== excludedAudioVideoSource.length; */
  const isVideoOn = !!webCamVideoSource;
  const isAudioOn = !!audioVideoSource;

  const AudioBadge = (
    <Image
      src={isAudioOn ? MicOn : MicOff}
      width={20}
      height={20}
      style={{ position: "absolute", left: 10, bottom: 10 }}
      alt={"mic image"}
    />
  );
  return (
    <>
      {!isVideoOn && (
        <DefaultShareMediaItem
          nickname={player.nickname}
          avatar={player.character}
        >
          {AudioBadge}
        </DefaultShareMediaItem>
      )}
      {isAudioOn && (
        <ShareMediaItem
          nickname={player.nickname}
          videoSource={audioVideoSource}
          isCurrentPlayer={isCurrentPlayer}
        ></ShareMediaItem>
      )}
      {isVideoOn && (
        <ShareMediaItem
          nickname={player.nickname}
          videoSource={webCamVideoSource}
          isCurrentPlayer={isCurrentPlayer}
        >
          {AudioBadge}
        </ShareMediaItem>
      )}
    </>
  );
}
