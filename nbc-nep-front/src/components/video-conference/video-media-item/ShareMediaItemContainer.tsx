import { Player } from "@/types/metaverse";
import styled from "styled-components";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty, splitVideoSource } from "../lib/util";
import { StShareScreenStackContainer } from "../styles/videoConference.styles";
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

  const [camAndAudioProducers, screenProducers] = splitVideoSource(producers);

  return (
    <StMediaItemContainer>
      <StMediaItemContainer>
        {isEmptyProducers ? (
          <DefaultShareMediaItem
            nickname={currentPlayer?.nickname}
            avatar={currentPlayer?.character}
          />
        ) : (
          <>
            {camAndAudioProducers.map((producer) => (
              <ShareMediaItem
                nickname={currentPlayerId}
                key={producer.id}
                videoSource={producer}
              />
            ))}
            <StShareScreenStackContainer>
              {screenProducers.map((producer, index) => (
                <ShareMediaItem
                  nickname={currentPlayerId}
                  key={producer.id}
                  videoSource={producer}
                  spread={-index * 10}
                />
              ))}
            </StShareScreenStackContainer>
          </>
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
  gap: 40px;
  padding: 40px 0;
`;
