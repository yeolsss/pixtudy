import useSpread from "@/hooks/conference/useSpread";
import useVideoSource from "@/hooks/conference/useVideoSource";
import useSocket from "@/hooks/socket/useSocket";
import { useAppSelector } from "@/hooks/useReduxTK";
import { useEffect } from "react";
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
}

export default function PlayerProducerContainer({
  producers,
  nickname,
}: Props) {
  const { toggleBoxRef, handleToggleOnSpreadMode, isSpreadMode } = useSpread();
  const { socket, disconnect } = useSocket({ namespace: "/conference" });

  const { id: currentPlayerId } = useAppSelector(
    (state) => state.authSlice.user
  );

  const { removeProducer } = useVideoSource();

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  function handleShareStop(producer: Producer) {
    removeProducer(producer);

    socket.emit("producer-close", currentPlayerId, producer.appData.streamId);
  }

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
            <StRemoveProducerButton onClick={() => handleShareStop(producer)} />
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

  outline: none;
  padding: 0;
  margin: 0;

  position: absolute;

  right: ${(props) => `calc(-1 * ${props.theme.spacing[4]})`};
  top: ${(props) => `calc(-1 * ${props.theme.spacing[4]})`};
`;
