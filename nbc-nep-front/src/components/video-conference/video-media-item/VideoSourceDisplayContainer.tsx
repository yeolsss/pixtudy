import { Player } from "@/components/metaverse/types/metaverse";
import {
  isArrayEmpty,
  splitVideoSource,
} from "@/components/video-conference/libs/util";
import useVideoSource from "@/hooks/conference/useVideoSource";
import { useAppSelector } from "@/hooks/useReduxTK";
import styled from "styled-components";
import ShareScreenContainer from "../ShareScreenContainer";
import { Producer } from "../types/ScreenShare.types";
import OtherPlayerShareMediaItem from "./OtherPlayerShareMediaItem";
import PlayerMediaDisplay from "./PlayerMediaDisplay";
import PlayerProducerContainer from "./PlayerProducerContainer";

interface Props {
  playerList: Player[];
  currentPlayer: Player;
}

export default function VideoSourceDisplayContainer({
  playerList,
  currentPlayer,
}: Props) {
  const layoutInfo = useAppSelector((state) => state.layoutSlice);

  const { producers } = useVideoSource();

  const [camAndAudioProducers, screenProducers] = splitVideoSource(producers);
  const isEmptyScreenProducers = isArrayEmpty(screenProducers);

  return (
    <StContainer>
      <PlayerMediaDisplay
        camAndAudioVideoSources={camAndAudioProducers}
        player={currentPlayer}
        isCurrentPlayer={true}
      />
      {!isEmptyScreenProducers && (
        <PlayerProducerContainer
          nickname={currentPlayer?.nickname || ""}
          producers={screenProducers as Producer[]}
        />
      )}
      {playerList.map((player) => (
        <OtherPlayerShareMediaItem
          player={player}
          currentPlayerId={currentPlayer.playerId}
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
