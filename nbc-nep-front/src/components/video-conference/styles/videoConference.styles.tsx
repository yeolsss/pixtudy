import styled from 'styled-components';

import { StPositionRelative } from '@/components/common/button/button.styles';


export const StShareMediaItem = styled(StPositionRelative)<{$isAudio: boolean}>`
  width: ${(props) => (props.$isAudio ? 0 : props.theme.video.width)};
  height: ${(props) => (props.$isAudio ? 0 : props.theme.video.height)};

  background-color: #27262e;

  border-radius: ${(props) => props.theme.border.radius[8]};

  *:not(span) {
    border-radius: ${(props) => props.theme.border.radius[8]};
  }

  ${(props) => props.$isAudio && 'position: absolute'};
`

export const StShareMediaNickname = styled.p`
  position: absolute;
  top: ${(props) => props.theme.spacing[8]};
  left: ${(props) => props.theme.spacing[8]};

  color: white;
  z-index: 1;
`

export const StVideo = styled.video`
  width: ${(props) => props.theme.video.width};
  height: ${(props) => props.theme.video.height};

  margin: 0;
  padding: 0;

  position: relative;
  object-fit: cover;
`

export const StAudio = styled.audio`
  width: 0;
  height: 0;
`

export const StMediaItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[20]};

  padding-top: ${(props) => props.theme.spacing[8]};

  position: absolute;
  right: ${(props) => props.theme.spacing[8]};
`

export const StMediaItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};

  position: relative;
`

export const StMediaItemProducerContainer = styled(StMediaItemsWrapper)<{
  $isToggle?: boolean
}>`
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.$isToggle &&
    `
    flex-direction: row-reverse;
  `}
`

export const StVideoWrapper = styled(StPositionRelative)`
  width: ${(props) => props.theme.video.width};
  height: ${(props) => props.theme.video.height};
`

export const StStackItem = styled.div<{
  $isSpread: boolean
  $x: number
  $y: number
}>`
  width: ${(props) => props.theme.video.width};
  height: ${(props) => props.theme.video.height};

  transition: 0.3s all ease-in-out;

  ${(props) => {
    if (props.$isSpread) {
      return `
        top: 0px;
        left: ${props.$x}px;    
      `
    }
    return `
        top:${props.$y}px;
        left: ${props.$x}px;
      `
  }}

  position:absolute;
`

export const StDockContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;

  left: 50%;
  bottom: ${(props) => props.theme.spacing[32]};
  transform: translateX(-50%);
  z-index: 3;

  background-color: ${(props) => props.theme.color.metaverse.primary};

  padding: ${(props) => props.theme.spacing[16]};

  border-radius: ${(props) => props.theme.border.radius.circle};

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  gap: ${(props) => props.theme.unit[15]};
  width: 465px;

  transition: opacity 0.2s ease-in-out;

  ${(props) => props.$isOpen && 'opacity: 0.3'};
  &:hover {
    ${(props) => props.$isOpen && 'opacity: 1'};
  }
`
