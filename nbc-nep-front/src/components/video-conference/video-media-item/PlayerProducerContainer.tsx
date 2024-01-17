import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ShareMediaItem from "../ShareMediaItem";
import { StMediaItemProducerContainer } from "../styles/videoConference.styles";
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
  const [isToggle, setToggle] = useState<boolean>(false);
  const toggleBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (
        toggleBoxRef.current &&
        e.target instanceof Node &&
        toggleBoxRef.current.contains(e.target)
      )
        return;

      if (isToggle) setToggle(false);
      e.stopPropagation();
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isToggle]);

  const handleToggle = () => {
    setToggle(true);
  };

  return (
    <StMediaItemProducerContainer
      ref={toggleBoxRef}
      onClick={handleToggle}
      isToggle={isToggle}
    >
      {producers.map((producer, index) => (
        <StProducerMediaItemWrapper key={producer.id}>
          <ShareMediaItem
            nickname={nickname}
            videoSource={producer}
            spread={!isToggle ? index * -10 : 0}
          />
          {isToggle && (
            <StRemoveProducerButton
              onClick={() => handleShareStopProducer(producer.id)}
            >
              x
            </StRemoveProducerButton>
          )}
        </StProducerMediaItemWrapper>
      ))}
    </StMediaItemProducerContainer>
  );
}

export const StProducerMediaItemWrapper = styled.div`
  position: relative;
`;

export const StRemoveProducerButton = styled.button`
  background-color: ${(props) => props.theme.color.bg["danger-bold"]};
  width: 20px;
  height: 20px;

  position: absolute;
  right: -10px;
  top: -10px;
`;
