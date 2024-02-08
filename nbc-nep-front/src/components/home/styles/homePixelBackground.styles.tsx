import styled from "styled-components";

export const StPixelBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const StPixelBackground = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  z-index: 0;
  pointer-events: none;

  transition: height 0.2s ease-in;

  & > div {
    display: flex;
    width: 100%;
    height: 10vh;

    & > div {
      width: 10vw;
      height: 100%;
      background-color: ${(props) => props.theme.color.bg.interactive.selected};
    }
  }
`;
