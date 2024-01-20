import { Player } from "@/components/metaverse/types/metaverse";
import {
  getVideoSourcesExcludeAudio,
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
import DefaultShareMediaItem from "./DefaultShareMediaItem";

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

  const { consumers } = useVideoSource();

  if (currentPlayerId === player.playerId) return null;

  const filteredConsumers = consumers.filter(
    (consumer) => consumer.appData.playerId === player.playerId
  );

  const isEmptyConsumers = isArrayEmpty(
    getVideoSourcesExcludeAudio(filteredConsumers)
  );
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
      {isEmptyConsumers ? (
        <DefaultShareMediaItem
          nickname={player.nickname}
          avatar={player.character}
        />
      ) : (
        <>
          {camAndAudioConsumers.map((consumer) => (
            <ShareMediaItem
              key={consumer.id}
              nickname={player.nickname}
              videoSource={consumer}
              isCurrentPlayer={false}
            />
          ))}
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
      )}
    </>
  );
}
