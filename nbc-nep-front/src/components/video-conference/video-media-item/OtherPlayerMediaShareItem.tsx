import { Player } from "@/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty } from "../lib/util";
import { Consumer } from "../types/ScreenShare.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";

interface Props {
  currentPlayerId: string;
  consumers: Consumer[];
  player: Player;
}

export default function OtherPlayerMediaShareItem({
  consumers,
  player,
  currentPlayerId,
}: Props) {
  if (currentPlayerId === player.playerId) return null;

  const filteredConsumers = consumers.filter(
    (consumer) => consumer.appData.playerId === player.playerId
  );

  const isEmptyConsumers = isArrayEmpty(filteredConsumers);

  return (
    <div>
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
  );
}
