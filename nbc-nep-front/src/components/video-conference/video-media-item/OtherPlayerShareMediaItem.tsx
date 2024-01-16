import { Player } from "@/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty } from "../lib/util";
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

  const handleOpenVideosLayout = () => {
    setIsOpenLayout((prev) => !prev);
  };

  return (
    <>
      <div onClick={handleOpenVideosLayout}>
        {isEmptyConsumers ? (
          <DefaultShareMediaItem
            nickname={player.nickname}
            avatar={player.character}
          />
        ) : (
          filteredConsumers.map((consumer) => (
            <ShareMediaItem
              key={consumer.id}
              nickname={player.nickname}
              videoSource={consumer}
            />
          ))
        )}
      </div>
      {isOpenLayout && (
        <ShareScreenContainer>
          {filteredConsumers.map((consumer) => (
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
