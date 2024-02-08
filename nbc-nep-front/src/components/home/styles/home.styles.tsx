import { motion } from "framer-motion";
import styled from "styled-components";

export const StScrollSection = styled.section`
  width: 100%;
  height: 5000px;

  display: flex;
  flex-direction: row;
  z-index: 1;

  position: relative;
`;

export const StStickyWrapper = styled.div`
  position: sticky;
  top: ${(props) => props.theme.spacing[16]};

  max-width: 1300px;
  width: 100%;
  height: 100vh;

  margin: 0 auto;
  padding: ${(props) =>
    `${props.theme.spacing[16]} ${props.theme.spacing[32]}`};

  background: url("/assets/home/sticky-bg.png") no-repeat 0 35% / contain;

  @media screen and (max-width: 768px) {
    padding: ${(props) =>
      `${props.theme.spacing[8]} ${props.theme.spacing[16]}`};
  }
`;

export const StStickyItem = styled.div`
  position: relative;

  width: 29rem;
  max-width: 50%;

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
    font-family: var(--point-font);
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
    font-size: ${(props) => props.theme.heading.desktop["3xl"].fontSize};
    letter-spacing: ${(props) =>
      props.theme.heading.desktop["3xl"].letterSpacing};
    line-height: ${(props) => props.theme.heading.desktop["4xl"].lineHeight};
  }

  p {
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.lg.medium.fontSize};
    letter-spacing: ${(props) => props.theme.body.lg.medium.letterSpacing};
    line-height: ${(props) => props.theme.heading.desktop.lg.lineHeight};
  }

  @media screen and (max-width: 768px) {
    top: 20%;

    width: calc(100% - ${(props) => props.theme.spacing[64]});
    max-width: initial;

    h1 {
      font-weight: ${(props) => props.theme.heading.desktop["2xl"].fontWeight};
      font-size: ${(props) => props.theme.heading.desktop["2xl"].fontSize};
      letter-spacing: ${(props) =>
        props.theme.heading.desktop["2xl"].letterSpacing};
      line-height: ${(props) => props.theme.heading.desktop["2xl"].lineHeight};
    }
    p {
      font-size: ${(props) => props.theme.body.md.medium.fontSize};
      letter-spacing: ${(props) => props.theme.body.md.medium.letterSpacing};
      line-height: ${(props) => props.theme.heading.desktop.md.lineHeight};
    }
  }
`;

export const StScrollItemWrapper = styled(motion.div)<{
  $top: string;
  $left: string;
}>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};

  width: 34rem;
  height: 30rem;

  padding: ${(props) => props.theme.spacing[24]};

  display: flex;
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
    gap: ${(props) => props.theme.spacing[16]};

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: ${(props) => props.theme.border.radius[16]};
    }

    h2 {
      max-width: 100%;
      font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
      letter-spacing: ${(props) =>
        props.theme.heading.desktop.sm.letterSpacing};
      line-height: ${(props) => props.theme.heading.desktop.sm.lineHeight};
      font-family: var(--sub-font);
      font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};
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

  @media screen and (max-width: 786px) {
    margin: auto;
    top: calc(50% - 23rem);
    left: calc(50% - 25rem);

    width: 50rem;
    height: 46rem;
    gap: ${(props) => props.theme.spacing[64]};
  }
`;
