import styled from "styled-components";

export const StShareMediaItem = styled.div<{ $spread?: number }>`
  position: relative;
  width: 175px;
  height: 130px;
  background-color: #27262e;

  ${(props) =>
    props.$spread && `top: ${props.$spread}px; left: ${props.$spread}px;`};
  ${(props) => props.$spread && "position : absolute"};
`;

export const StShareMediaNickname = styled.p`
  position: absolute;
  top: 8px;
  left: 10px;
  color: white;
`;

export const StVideo = styled.video`
  width: 175px;
  height: 130px;
  margin: 0;
  padding: 0;
  position: relative;
  object-fit: cover;
`;

export const StAudio = styled.audio`
  width: 0;
  height: 0;
`;

export const StShareScreenStackContainer = styled.div`
  position: relative;
  width: 175px;
  height: 130px;
`;

export const StMediaItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 0;
  position: relative;
`;

export const StMediaItemProducerContainer = styled(StMediaItemContainer)<{
  isToggle?: boolean;
}>`
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.isToggle &&
    `
    flex-direction: row-reverse;
  `}
`;
