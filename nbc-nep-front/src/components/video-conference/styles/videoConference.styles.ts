import { StPositionRelative } from "@/components/common/commonStyles.styles";
import styled from "styled-components";

export const StShareMediaItem = styled(StPositionRelative)`
  width: ${(props) => props.theme.video.width};
  height: ${(props) => props.theme.video.height};

  background-color: #27262e;
`;

export const StShareMediaNickname = styled.p`
  position: absolute;
  top: ${(props) => props.theme.spacing[4]};
  left: ${(props) => props.theme.spacing[4]};

  color: white;
  z-index: 1;
`;

export const StVideo = styled.video`
  width: ${(props) => props.theme.video.width};
  height: ${(props) => props.theme.video.height};

  margin: 0;
  padding: 0;

  position: relative;
  object-fit: cover;
`;

export const StAudio = styled.audio`
  width: 0;
  height: 0;
`;

export const StMediaItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[20]};

  padding-top: ${(props) => props.theme.spacing[8]};

  position: absolute;
  right: ${(props) => props.theme.spacing[8]};
`;

export const StMediaItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};

  position: relative;
`;

export const StMediaItemProducerContainer = styled(StMediaItemsWrapper)<{
  $isToggle?: boolean;
}>`
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.$isToggle &&
    `
    flex-direction: row-reverse;
  `}
`;

export const StVideoWrapper = styled(StPositionRelative)`
  width: ${(props) => props.theme.video.width};
  height: ${(props) => props.theme.video.height};
`;

export const StStackItem = styled.div<{
  $isSpread: boolean;
  $x: number;
  $y: number;
}>`
  width: ${(props) => props.theme.video.width};
  height: ${(props) => props.theme.video.height};

  transition: 0.3s all ease-in-out;

  ${(props) => {
    if (props.$isSpread) {
      return `
        top: 0px;
        left: ${props.$x}px;    
      `;
    }
    return `
        top:${props.$y}px;
        left: ${props.$x}px;
      `;
  }}

  position:absolute;
`;

export const SPACING = 10;
export const VIDEO_SIZE = 175;
export const GAP = 20;
