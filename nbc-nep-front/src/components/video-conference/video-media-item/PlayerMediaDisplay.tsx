import MicOff from "@/assets/dock-icons/mic-off.svg";
import MicOn from "@/assets/dock-icons/mic-on.svg";
import Image from "next/image";
import ShareMediaItem from "../ShareMediaItem";
import { findVideoSourcesByType } from "../libs/util";
import { VideoSource } from "../../../types/conference.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import { Player } from "@/types/metaverse.types";

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
  const audioVideoSource = findVideoSourcesByType(
    camAndAudioVideoSources,
    "audio"
  );
  const webCamVideoSource = findVideoSourcesByType(
    camAndAudioVideoSources,
    "webcam"
  );

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
