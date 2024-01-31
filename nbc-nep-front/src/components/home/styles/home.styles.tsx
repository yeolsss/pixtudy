import { motion } from "framer-motion";
import styled from "styled-components";

export const StScrollSection = styled.section`
  width: 100vw;
  height: 500vh;

  display: flex;
  flex-direction: row;
  z-index: 1;
`;

export const StStickyWrapper = styled.div`
  position: sticky;
  width: 1350px;
  margin: 0 auto;
  top: ${(props) => props.theme.spacing[16]};
  height: 100vh;

  background: url("/assets/home/sticky-bg.png") no-repeat 0 35% / contain;
  padding: ${(props) =>
    `${props.theme.spacing[16]} ${props.theme.spacing[32]}`};
`;

export const StStickyItem = styled.div`
  position: relative;

  width: 29rem;

  top: 40%;
  transform: translateY(-50%);
  left: ${(props) => props.theme.spacing[32]};

  * {
    font-family: var(--default-font);
    word-break: keep-all;
  }
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[16]};

  h1 {
    font-size: ${(props) => props.theme.heading.desktop["3xl"].fontSize};
    letter-spacing: ${(props) =>
      props.theme.heading.desktop["3xl"].letterSpacing};
    line-height: ${(props) => props.theme.heading.desktop["3xl"].lineHeight};
  }

  p {
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
    letter-spacing: ${(props) => props.theme.body.md.medium.letterSpacing};
    line-height: ${(props) => props.theme.body.md.medium.lineHeight};
  }
`;

export const StScrollItemWrapper = styled(motion.div)<{
  $top: string;
  $left: string;
}>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};

  width: 30rem;
  height: 38rem;

  display: flex;
  padding: ${(props) => props.theme.spacing[32]};
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing[16]};

  background-color: #fff;
  border: 1px solid ${(props) => props.theme.color.bg.secondary};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow2};
  border-radius: ${(props) => props.theme.border.radius[16]};

  div {
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.theme.spacing[32]};

    h2 {
      max-width: 60%;
      font-size: ${(props) => props.theme.heading.desktop["sm"].fontSize};
      letter-spacing: ${(props) =>
        props.theme.heading.desktop["sm"].letterSpacing};
      line-height: ${(props) => props.theme.heading.desktop["sm"].lineHeight};
      font-family: ${(props) => props.theme.heading.desktop["sm"].fontFamily};
      text-align: center;
      word-break: keep-all;
    }
  }

  p {
    flex: 1;
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
    letter-spacing: ${(props) => props.theme.body.md.medium.letterSpacing};
    line-height: ${(props) => props.theme.body.md.medium.lineHeight};
    text-align: center;
    word-break: keep-all;
  }
`;
