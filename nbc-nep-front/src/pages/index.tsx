import CustomHead from "@/SEO/CustomHead";
import { StCTALink } from "@/components/common/button/button.styles";
import PixelBackground from "@/components/introduction/PixelBackground";
import Layout from "@/components/layout/Layout";
import { getCookie } from "@/utils/middlewareUtils";
import { pathValidation } from "@/utils/middlewareValidate";
import useAuth from "@/zustand/authStore";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "./_app";

const HEIGHT = 400;

const anim: (i: number) => Variants = (i: number) => {
  return {
    initial: {
      opacity: 0,
    },
    open: (i) => ({
      opacity: 0,
      transition: { duration: 0, delay: 0.03 * i },
    }),
    closed: (i) => ({
      opacity: 1,
      transition: { duration: 0, delay: 0.03 * i },
    }),
  };
};

const Home: NextPageWithLayout = () => {
  const [isInSection, setIsInSection] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { user } = useAuth();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);
    }
  }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", updateDimensions);
  //   return () => window.removeEventListener("resize", updateDimensions);
  // }, []);

  useEffect(() => {
    const { top, left, bottom } = wrapperRef.current?.getBoundingClientRect()!;
    setPosition({ top, left });
    const handleScroll = () => {
      const { scrollY } = window;
      console.log(scrollY);
      if (scrollY > top && scrollY < bottom) {
        setIsInSection(true);
      } else {
        setIsInSection(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const message = getCookie("message");
    if (message) {
      // 메시지로 이벤트 처리
      pathValidation(message);
      // 쿠키 삭제
      document.cookie =
        "message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);

  // const imagesPerSection = {'section1', 'section2', 'section3' };

  return (
    <>
      <CustomHead title={"Main"} description={"메인 페이지입니다."} />
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
            <StLink href={user.email ? "/dashboard" : "/signin"}>
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
        <StSectionWrapper ref={wrapperRef}>
          <StSection $isInSection={isInSection}>
            <Image
              src="/assets/introduction/section1.png"
              alt="hero image"
              width={479}
              height={430}
            />
            <StSectionContents>
              <p>
                <span>Pixtudy</span>는 혁신적인 가상 업무 및 스터디 공간으로
                뛰어난 협업 경험을 제공합니다. 단순한 업무 전달을 넘어,
                팀원들과의 화상 교류를 통해 새로운 아이디어를 탐색하고,
                프로젝트를 좀 더 생동감 있게 진행해 보세요.
              </p>
              <p>
                여러개의 화면을 공유하고, 공유한 화면을 입맛에 맞게 배치해
                화면을 구성하고, 스크럼 보드에서 프로젝트 완성을 위한 업무를
                계획하고 분배하는 등 가상환경 내에서 자유롭게 소통하고
                협업해보세요. 이 과정에서 생겨나는 아이디어는 팀의 창의력을
                자극하고, 업무의 효율성을 높여줄 겁니다.
              </p>
              <p>
                <span>Pixtudy</span>에서 아이디어가 살아 숨 쉬는 공간을
                경험해보세요!
              </p>
            </StSectionContents>
          </StSection>
          <StPixelBackground isInSection={isInSection} position={position} />
          <StSection $isInSection={isInSection}>
            <video src="/assets/introduction/walk.mp4" autoPlay muted loop />
            <StSectionContents>
              <h2>Pixtudy에서의 회의는 다릅니다.</h2>
              <p>
                화상/음성을 통한 유저간 실시간 소통과 최대 4개의 화면을 동시에
                공유할 수 있는 커스텀 레이아웃을 통해 완벽한 회의를 진행하세요
              </p>
            </StSectionContents>
          </StSection>
          <StSection $isInSection={isInSection}>
            <video
              src="/assets/introduction/mediashare.mp4"
              autoPlay
              muted
              loop
            />
          </StSection>
        </StSectionWrapper>
        <motion.div />
        <div style={{ height: "2000px" }}>mo?lu</div>
      </StWrapper>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

const StWrapper = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const StHeroBanner = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing[40]};
  z-index: 2;
  margin: 5vh auto;
  & > img {
    width: 658px;
    height: 563px;
    object-fit: cover;
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
  text-decoration: none;
  font-weight: ${(props) => props.theme.body.lg.medium.fontWeight};
  font-family: var(--default-font);

  border-radius: ${(props) => props.theme.border.radius[8]};

  display: inline-block;
  text-align: center;

  padding: ${(props) =>
    `${props.theme.spacing[16]} ${props.theme.spacing["32"]}`};

  font-size: ${(props) => props.theme.body.md.medium.fontSize};
`;

const StSectionWrapper = styled.div`
  position: relative;
  max-width: 1200px;
  width: 100%;
  height: 3200px;
  margin: 0 auto;
`;

const StSection = styled.div<{ $isInSection: boolean }>`
  /* position: relative; */
  position: sticky;
  top: -20vh;
  left: 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 1200px;
  padding: ${(props) => props.theme.spacing[40]};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  opacity: ${(props) => (props.$isInSection ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  gap: ${(props) => props.theme.spacing[24]};

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
  }

  & > h2 {
  }

  & > p {
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
    line-height: ${(props) => props.theme.body.lg.regular.lineHeight};
    letter-spacing: ${(props) => props.theme.body.lg.regular.letterSpacing};
    word-break: keep-all;
    & > span {
      font-family: var(--point-font);
      font-weight: bold;
    }
  }
`;

const StSectionOne = styled(StSection)`
  background-image: url("./assets/introduction/landing.png");
`;
const StSectionTwo = styled(StSection)``;
const StSectionThree = styled(StSection)``;

const StPixelBackground = styled(PixelBackground)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;
