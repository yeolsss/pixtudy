import { StCTALink } from "@/components/common/button/button.styles";
import Layout from "@/components/layout/Layout";
import { ReactElement } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <StWrapper>
      <StHeroBanner>
        <StHeroBannerWrapper>
          <StHeroBannerTitle>
            모여서 <br /> 같이 <br /> 공부하자!
          </StHeroBannerTitle>
          <StHeroBannerDescription>
            원하는 대로 여러 화면을 쉽게 선택하여 배치하고, 보고 싶은 대로
            레이아웃을 변경해보세요.
          </StHeroBannerDescription>
          <StLink href="/dashboard">인기 랜선스터디 모아보기 {">"}</StLink>
        </StHeroBannerWrapper>
      </StHeroBanner>
    </StWrapper>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

const StWrapper = styled.div`
  width: 100vw;
  height: 670px;
  position: relative;
`;

const StHeroBanner = styled.div`
  position: relative;
  width: 1200px;
  height: 100%;
  padding: ${(props) => props.theme.spacing[40]};

  margin: 0 auto;

  background-image: url("./assets/home_bg_layer.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 ${(props) => props.theme.spacing[48]};
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
  color: ${(props) => props.theme.color.text.interactive.primary};
  font-family: var(--point-font);
  font-size: ${(props) => props.theme.heading.desktop["4xl"].fontSize};
  font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  line-height: ${(props) => props.theme.spacing["80"]};
`;

const StHeroBannerDescription = styled.p`
  color: ${(props) => props.theme.color.text.secondary};
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.lg.medium.fontSize};

  line-height: ${(props) => props.theme.spacing["24"]};
`;

const StLink = styled(StCTALink)`
  text-decoration: none;
  font-weight: ${(props) => props.theme.body.lg.medium.fontWeight};
  font-family: ${(props) => props.theme.body.lg.medium.fontFamily};

  border-radius: ${(props) => props.theme.border.radius[8]};

  display: inline-block;
  text-align: center;

  padding: ${(props) =>
    `${props.theme.spacing[16]} ${props.theme.spacing["32"]}`};

  font-size: ${(props) => props.theme.body.md.medium.fontSize};
`;
