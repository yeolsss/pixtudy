import { Player } from "@/components/metaverse/types/metaverse";
import {
  isArrayEmpty,
  splitVideoSource,
} from "@/components/video-conference/libs/util";
import useVideoSource from "@/hooks/conference/useVideoSource";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { layoutOpen } from "@/redux/modules/layoutSlice";
import { useRef } from "react";
import ShareMediaItem from "../ShareMediaItem";
import {
  SPACING,
  StStackItem,
  StVideoWrapper,
} from "../styles/videoConference.styles";
import PlayerMediaDisplay from "./PlayerMediaDisplay";

interface Props {
  currentPlayerId: string;
  player: Player;
}

export default function OtherPlayerShareMediaItem({
  player,
  currentPlayerId,
}: Props) {
  const dispatch = useAppDispatch();
  const videosContainerRef = useRef<HTMLDivElement | null>(null);
  const { filterConsumersById } = useVideoSource();

  if (currentPlayerId === player.playerId) return null;

  const filteredConsumers = filterConsumersById(player.playerId);

  const [camAndAudioConsumers, screenConsumers] =
    splitVideoSource(filteredConsumers);
  const isEmptyScreenConsumers = isArrayEmpty(screenConsumers);

  const handleToggleVideosLayout = () => {
    dispatch(
      layoutOpen({
        playerId: player.playerId,
        playerNickName: player.nickname,
      })
    );
  };

  return (
    <>
      <PlayerMediaDisplay
        camAndAudioVideoSources={camAndAudioConsumers}
        player={player}
        isCurrentPlayer={false}
      />
      {!isEmptyScreenConsumers && (
        <StVideoWrapper
          ref={videosContainerRef}
          onClick={handleToggleVideosLayout}
        >
          {screenConsumers.map((consumer, index) => (
            <StStackItem
              key={consumer.id}
              $isSpread={false}
              $x={index * SPACING}
              $y={index * SPACING}
            >
              <ShareMediaItem
                nickname={player.nickname}
                videoSource={consumer}
              />
            </StStackItem>
          ))}
        </StVideoWrapper>
      )}
    </>
  );
}
