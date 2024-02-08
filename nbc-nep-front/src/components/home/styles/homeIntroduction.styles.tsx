import { motion } from "framer-motion";
import styled from "styled-components";

export const StSectionWrapper = styled.div`
  display: flex;
  justify-content: end;
  max-width: 1300px;
  width: 100%;
  height: 200vh;
  margin: 0 auto;
  z-index: 1;

  @media screen and (max-width: 768px) {
    padding: ${(props) => props.theme.spacing[16]};
    img {
      width: 350px;
      height: 250px;
    }
  }
`;

export const StSection = styled(motion.section)`
  position: sticky;
  top: 0;
  left: 0;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  padding: ${(props) => props.theme.spacing[40]} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[56]};

  & > video {
    width: var(--size-460);
    height: 345px;
    object-fit: cover;
    border-radius: var(--border-radius-36);
    box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  }
`;

export const StSectionContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[24]};
  & > h1 {
    font-family: var(--point-font);
    font-weight: ${(props) => props.theme.heading.desktop["3xl"].fontWeight};
    font-size: ${(props) => props.theme.heading.desktop["3xl"].fontSize};
    letter-spacing: ${(props) =>
      props.theme.heading.desktop["3xl"].letterSpacing};
    line-height: ${(props) => props.theme.heading.desktop["4xl"].lineHeight};

    word-break: keep-all;
  }

  & > h2 {
  }

  & > p {
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.lg.medium.fontSize};
    letter-spacing: ${(props) => props.theme.body.lg.medium.letterSpacing};
    line-height: ${(props) => props.theme.heading.desktop.lg.lineHeight};
    font-weight: normal;
    word-break: keep-all;
    & > em {
      font-family: var(--point-font);
      font-weight: bold;
    }
  }
`;
