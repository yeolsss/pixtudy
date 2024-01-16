import { Player } from "@/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty } from "../lib/util";
import { Consumer, Producer } from "../types/ScreenShare.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import OtherPlayerMediaShareItem from "./OtherPlayerMediaShareItem";

interface Props {
  producers: Producer[];
  consumers: Consumer[];
  playerList: Player[];
  currentPlayerId: string;
}

export default function ShareMediaItemContainer({
  producers,
  consumers,
  playerList,
  currentPlayerId,
}: Props) {
  const isEmptyProducers = isArrayEmpty(producers);
  const findPlayer = (playerId: string) =>
    playerList.find((player) => player.playerId === playerId);
  const currentPlayer = findPlayer(currentPlayerId);

  return (
    <>
      <div>
        {isEmptyProducers ? (
          <DefaultShareMediaItem
            nickname={currentPlayer!.nickname}
            avatar={currentPlayer!.character}
          />
        ) : (
          producers.map((producer) => (
            <ShareMediaItem
              nickname={currentPlayerId}
              key={producer.id}
              videoSource={producer}
            />
          ))
        )}
      </div>
      <div>
        {playerList.map((player) => (
          <OtherPlayerMediaShareItem
            player={player}
            currentPlayerId={currentPlayerId}
            consumers={consumers}
            key={player.playerId}
          />
        ))}
      </div>
    </>
  );
}
