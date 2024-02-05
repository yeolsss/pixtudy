import Image from "next/image";
import { forwardRef } from "react";
import styled from "styled-components";
import { StCTALink } from "../common/button/button.styles";

interface Props {
  isLoggedIn: boolean;
}

const HomeBanner = forwardRef<HTMLDivElement, Props>(function HomeHeroBanner(
  { isLoggedIn }: Props,
  ref
) {
  return (
    <StHeroBanner ref={ref}>
      <StHeroBannerWrapper>
        <StHeroBannerTitle>
          모여서 <br /> 같이 <br /> 공부하자!
        </StHeroBannerTitle>
        <StHeroBannerDescription>
          원하는 대로 여러 화면을 쉽게 선택하여 배치하고, 보고 싶은 대로
          레이아웃을 변경해보세요.
        </StHeroBannerDescription>
        <StLink href={isLoggedIn ? "/dashboard" : "/signin"}>
          인기 랜선스터디 모아보기 {">"}
        </StLink>
      </StHeroBannerWrapper>
      <Image
        src={"/assets/introduction/landing.png"}
        width={658}
        height={563}
        alt="come and study together!"
      />
    </StHeroBanner>
  );
});

const StHeroBanner = styled.div`
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

const StHeroBannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: ${(props) => props.theme.spacing[40]};

  width: 395px;

  margin-top: ${(props) => props.theme.spacing["48"]};
`;

const StHeroBannerTitle = styled.h1`
  color: ${(props) => props.theme.color.text.primary};
  font-family: var(--point-font);
  font-size: ${(props) => props.theme.heading.desktop["4xl"].fontSize};
  font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  line-height: ${(props) => props.theme.spacing["80"]};
`;

const StHeroBannerDescription = styled.p`
  color: ${(props) => props.theme.color.text.secondary};
  font-family: var(--default-font);
  font-size: ${(props) => props.theme.body.lg.medium.fontSize};

  line-height: ${(props) => props.theme.spacing["24"]};
`;

const StLink = styled(StCTALink)`
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

export default HomeBanner;
