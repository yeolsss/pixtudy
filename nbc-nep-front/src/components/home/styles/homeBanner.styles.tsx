import { StCTALink } from "@/components/common/button/button.styles";
import styled from "styled-components";

export const StHeroBanner = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  max-width: 1200px;
  width: 100%;
  height: 70vh;

  padding: ${(props) => props.theme.spacing[40]};
  margin: 5vh auto;

  z-index: 2;

  & > img {
    width: 658px;
    height: 563px;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    align-items: center;
    & > img {
      width: 350px;
      height: 298px;
    }
  }
`;

export const StHeroBannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: ${(props) => props.theme.spacing[40]};

  width: 395px;

  margin-top: ${(props) => props.theme.spacing["48"]};
`;

export const StHeroBannerTitle = styled.h1`
  color: ${(props) => props.theme.color.text.primary};
  font-family: var(--point-font);
  font-size: ${(props) => props.theme.heading.desktop["4xl"].fontSize};
  font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  line-height: ${(props) => props.theme.spacing["80"]};
`;

export const StHeroBannerDescription = styled.p`
  color: ${(props) => props.theme.color.text.secondary};
  font-family: var(--default-font);
  font-size: ${(props) => props.theme.body.lg.medium.fontSize};

  line-height: ${(props) => props.theme.spacing["24"]};
`;

export const StLink = styled(StCTALink)`
  display: inline-block;

  padding: ${(props) =>
    `${props.theme.spacing[16]} ${props.theme.spacing[32]}`};

  font-size: ${(props) => props.theme.body.md.regular.fontSize};
  font-weight: ${(props) => props.theme.body.lg.medium.fontWeight};
  font-family: var(--default-font);

  text-decoration: none;
  text-align: center;

  border-radius: ${(props) => props.theme.border.radius[8]};

  @media screen and (max-width: 768px) {
    padding: ${(props) =>
      `${props.theme.spacing[16]} ${props.theme.spacing[24]}`};
  }
`;
