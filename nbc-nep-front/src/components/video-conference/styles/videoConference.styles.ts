import styled from "styled-components";

export const StShareMediaItem = styled.div<{ $spread?: number }>`
  position: relative;
  width: 175px;
  height: 130px;
  background-color: #27262e;

  ${(props) =>
    props.$spread && `top: ${props.$spread}px; left: ${props.$spread}px;`};
  ${(props) => props.$spread && "position : absolute"};

  :hover {
    ${(props) =>
      props.$spread &&
      `top: ${props.$spread * 0.5}px; left: ${props.$spread * 0.5}px;`};
    transition: all 1s ease;
  }
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
