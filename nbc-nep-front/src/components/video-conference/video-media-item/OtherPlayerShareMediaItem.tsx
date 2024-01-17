import useVideoSource from "@/hooks/conference/useVideoSource";
import { Player } from "@/types/metaverse";
import { useState } from "react";
import ShareMediaItem from "../ShareMediaItem";
import ShareScreenContainer from "../ShareScreenContainer";
import { isArrayEmpty, splitVideoSource } from "../lib/util";
import { StShareScreenStackContainer } from "../styles/videoConference.styles";
import DefaultShareMediaItem from "./DefaultShareMediaItem";

interface Props {
  currentPlayerId: string;
  player: Player;
}

export default function OtherPlayerShareMediaItem({
  player,
  currentPlayerId,
}: Props) {
  const { consumers } = useVideoSource();
  const [isOpenLayout, setIsOpenLayout] = useState<boolean>(false);

  if (currentPlayerId === player.playerId) return null;

  const filteredConsumers = consumers.filter(
    (consumer) => consumer.appData.playerId === player.playerId
  );

  const isEmptyConsumers = isArrayEmpty(filteredConsumers);
  const [camAndAudioConsumers, screenConsumers] =
    splitVideoSource(filteredConsumers);

  const handleToggleVideosLayout = () => {
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
          <StShareScreenStackContainer onClick={handleToggleVideosLayout}>
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
        <ShareScreenContainer
          handleToggleVideosLayout={handleToggleVideosLayout}
        >
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
