import { Player } from "@/components/metaverse/types/metaverse";
import {
  getVideoSourcesExcludeAudio,
  isArrayEmpty,
  splitVideoSource,
} from "@/components/video-conference/libs/util";
import useVideoSource from "@/hooks/conference/useVideoSource";
import { useAppSelector } from "@/hooks/useReduxTK";
import styled from "styled-components";
import ShareMediaItem from "../ShareMediaItem";
import ShareScreenContainer from "../ShareScreenContainer";
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
  const layoutInfo = useAppSelector((state) => state.layoutSlice);

  const { producers } = useVideoSource();
  const isEmptyProducers = isArrayEmpty(getVideoSourcesExcludeAudio(producers));

  const findPlayer = (playerId: string) =>
    playerList.find((player) => player.playerId === playerId);

  const currentPlayer = findPlayer(currentPlayerId);

  const [camAndAudioProducers, screenProducers] = splitVideoSource(producers);
  const isEmptyScreenProducers = isArrayEmpty(screenProducers);

  return (
    <StContainer>
      {isEmptyProducers ? (
        <DefaultShareMediaItem
          nickname={currentPlayer?.nickname}
          avatar={currentPlayer?.character}
        />
      ) : (
        <>
          {camAndAudioProducers.map((producer) => (
            <ShareMediaItem
              nickname={currentPlayer?.nickname || ""}
              key={producer.id}
              videoSource={producer}
              isCurrentPlayer={true}
            />
          ))}
          {!isEmptyScreenProducers && (
            <PlayerProducerContainer
              handleShareStopProducer={handleShareStopProducer}
              nickname={currentPlayer?.nickname || ""}
              producers={screenProducers as Producer[]}
            />
          )}
        </>
      )}
      {playerList.map((player) => (
        <OtherPlayerShareMediaItem
          player={player}
          currentPlayerId={currentPlayerId}
          key={player.playerId}
        />
      ))}
      {layoutInfo.isOpen && <ShareScreenContainer />}
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[32]};

  position: absolute;
  right: ${(props) => props.theme.spacing[16]};
  top: ${(props) => props.theme.spacing[32]};
`;
