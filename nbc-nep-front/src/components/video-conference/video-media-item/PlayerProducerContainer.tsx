import useSpread from "@/hooks/conference/useSpread";
import styled from "styled-components";
import ShareMediaItem from "../ShareMediaItem";
import {
  GAP,
  SPACING,
  StStackItem,
  StVideoWrapper,
  VIDEO_SIZE,
} from "../styles/videoConference.styles";
import { Producer } from "../types/ScreenShare.types";

interface Props {
  producers: Producer[];
  nickname: string;
  handleShareStopProducer: (producerId: string) => void;
}

export default function PlayerProducerContainer({
  producers,
  nickname,
  handleShareStopProducer,
}: Props) {
  const { toggleBoxRef, handleToggleOnSpreadMode, isSpreadMode } = useSpread();

  return (
    <StVideoWrapper ref={toggleBoxRef} onClick={handleToggleOnSpreadMode}>
      {producers.map((producer, index) => (
        <StStackItem
          key={producer.id}
          $isSpread={isSpreadMode}
          $y={isSpreadMode ? 0 : -index * SPACING}
          $x={isSpreadMode ? -index * (VIDEO_SIZE + GAP) : -index * SPACING}
        >
          <ShareMediaItem nickname={nickname} videoSource={producer} />
          {isSpreadMode && (
            <StRemoveProducerButton
              onClick={() => handleShareStopProducer(producer.id)}
            >
              x
            </StRemoveProducerButton>
          )}
        </StStackItem>
      ))}
    </StVideoWrapper>
  );
}

const StRemoveProducerButton = styled.button`
  background-color: ${(props) => props.theme.color.bg["danger-bold"]};
  width: 20px;
  height: 20px;

  position: absolute;

  right: ${(props) => `calc(-1 * ${props.theme.spacing[4]})`};
  top: ${(props) => `calc(-1 * ${props.theme.spacing[4]})`};
`;
