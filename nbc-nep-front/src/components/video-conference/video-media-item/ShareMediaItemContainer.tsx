import { Player } from "@/types/metaverse";
import styled from "styled-components";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty } from "../lib/util";
import { Consumer, Producer } from "../types/ScreenShare.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import OtherPlayerShareMediaItem from "./OtherPlayerShareMediaItem";

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
    <StMediaItemContainer>
      <StMediaItemContainer>
        {isEmptyProducers ? (
          <DefaultShareMediaItem
            nickname={currentPlayer?.nickname}
            avatar={currentPlayer?.character}
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
      </StMediaItemContainer>
      <StMediaItemContainer>
        {playerList.map((player) => (
          <OtherPlayerShareMediaItem
            player={player}
            currentPlayerId={currentPlayerId}
            consumers={consumers}
            key={player.playerId}
          />
        ))}
      </StMediaItemContainer>
    </StMediaItemContainer>
  );
}

const StMediaItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
