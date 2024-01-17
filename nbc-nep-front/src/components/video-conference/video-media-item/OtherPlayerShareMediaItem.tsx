import useVideoSource from "@/hooks/conference/useVideoSource";
import { Player } from "@/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty, splitVideoSource } from "../lib/util";
import { StShareScreenStackContainer } from "../styles/videoConference.styles";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import ShareScreenContainer from "../ShareScreenContainer";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { layoutOpen } from "@/redux/modules/layoutSlice";

interface Props {
  currentPlayerId: string;
  player: Player;
}

export default function OtherPlayerShareMediaItem({
  player,
  currentPlayerId,
}: Props) {
  const dispatch = useAppDispatch();
  const videosContainer = useRef<HTMLDivElement | null>(null);

  const { consumers } = useVideoSource();

  if (currentPlayerId === player.playerId) return null;

  const filteredConsumers = consumers.filter(
    (consumer) => consumer.appData.playerId === player.playerId
  );

  const isEmptyConsumers = isArrayEmpty(filteredConsumers);
  const [camAndAudioConsumers, screenConsumers] =
    splitVideoSource(filteredConsumers);

  console.log({
    consumers,
    filteredConsumers,
    camAndAudioConsumers,
    screenConsumers,
  });

  const handleToggleVideosLayout = () => {
    dispatch(
      layoutOpen({ playerId: player.playerId, playerNickName: player.nickname })
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
            />
          ))}
          <StShareScreenStackContainer
            onClick={handleToggleVideosLayout}
            ref={videosContainer}
          >
            {screenConsumers.map((consumer, index) => (
              <ShareMediaItem
                spread={-index * 10}
                key={consumer.id}
                nickname={player.nickname}
                videoSource={consumer}
              />
            ))}
          </StShareScreenStackContainer>
        </>
      )}
    </>
  );
}
