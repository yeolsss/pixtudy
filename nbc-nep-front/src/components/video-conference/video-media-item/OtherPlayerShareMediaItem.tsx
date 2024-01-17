import { Player } from "@/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty, splitVideoSource } from "../lib/util";
import { StShareScreenStackContainer } from "../styles/videoConference.styles";
import { Consumer } from "../types/ScreenShare.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import ShareScreenContainer from "../ShareScreenContainer";
import { useState } from "react";

interface Props {
  currentPlayerId: string;
  consumers: Consumer[];
  player: Player;
}

export default function OtherPlayerShareMediaItem({
  consumers,
  player,
  currentPlayerId,
}: Props) {
  const [isOpenLayout, setIsOpenLayout] = useState<boolean>(false);
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

  const handleOpenVideosLayout = () => {
    setIsOpenLayout((prev) => !prev);
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
          <StShareScreenStackContainer onClick={handleOpenVideosLayout}>
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
      {isOpenLayout && (
        <ShareScreenContainer>
          {screenConsumers.map((consumer, index) => (
            <ShareMediaItem
              key={consumer.id}
              nickname={player.nickname}
              videoSource={consumer}
            />
          ))}
        </ShareScreenContainer>
      )}
    </>
  );
}
