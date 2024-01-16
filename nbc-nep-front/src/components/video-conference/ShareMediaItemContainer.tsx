import { Player } from "@/types/metaverse";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import ShareMediaItem from "./ShareMediaItem";
import { isArrayEmpty } from "./lib/util";
import { Consumer, Producer } from "./types/ScreenShare.types";

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
        {playerList.map((player) => {
          if (player.playerId === currentPlayerId) return null;

          const findedConsumers = consumers.filter(
            (consumer) => consumer.appData.playerId === player.playerId
          );
          const isEmptyConsumers = isArrayEmpty(findedConsumers);

          return (
            <div key={player.playerId}>
              {isEmptyConsumers ? (
                <DefaultShareMediaItem
                  nickname={player.nickname}
                  avatar={player.character}
                />
              ) : (
                findedConsumers.map((consumer) => (
                  <ShareMediaItem
                    nickname={player.nickname}
                    key={consumer.id}
                    videoSource={consumer}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
