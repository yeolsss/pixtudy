import useVideoSource from "@/hooks/conference/useVideoSource";
import { Player } from "@/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty, splitVideoSource } from "../lib/util";
import { StMediaItemContainer } from "../styles/videoConference.styles";
import { Producer } from "../types/ScreenShare.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import OtherPlayerShareMediaItem from "./OtherPlayerShareMediaItem";
import PlayerProducerContainer from "./PlayerProducerContainer";

interface Props {
  playerList: Player[];
  currentPlayerId: string;
  handleShareStopProducer: (producerId: string) => void;
}

export default function ShareMediaItemContainer({
  playerList,
  currentPlayerId,
  handleShareStopProducer,
}: Props) {
  const { producers } = useVideoSource();

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
            <PlayerProducerContainer
              handleShareStopProducer={handleShareStopProducer}
              nickname={currentPlayer?.nickname || ""}
              producers={screenProducers as Producer[]}
            />
            {camAndAudioProducers.map((producer) => (
              <ShareMediaItem
                nickname={currentPlayer?.nickname || ""}
                key={producer.id}
                videoSource={producer}
              />
            ))}
          </>
        )}
      </StMediaItemContainer>
      <StMediaItemContainer>
        {playerList.map((player) => (
          <OtherPlayerShareMediaItem
            player={player}
            currentPlayerId={currentPlayerId}
            key={player.playerId}
          />
        ))}
      </StMediaItemContainer>
    </StMediaItemContainer>
  );
}
