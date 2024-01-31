import useScroll from "@/hooks/scroll/useScroll";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { forwardRef } from "react";
import styled from "styled-components";

interface Props {}

const HomeSection = forwardRef<HTMLDivElement>(
  function HomeSection(props, ref) {
    const { section } = useScroll();
    return (
      <StSectionWrapper ref={ref}>
        <AnimatePresence>
          {section === "intro" && (
            <StSection
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
              </StSectionContents>
            </StSection>
          )}
        </AnimatePresence>
      </StSectionWrapper>
    );
  }
);

const StSectionWrapper = styled.div`
  display: flex;
  justify-content: end;
  max-width: 1200px;
  width: 100%;
  height: 250vh;
  margin: 0 auto;
  z-index: 1;
`;

const StSection = styled(motion.div)`
  /* position: relative; */
  position: sticky;
  top: 0;
  left: 0;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  padding: ${(props) => props.theme.spacing[40]};
  display: flex;
  align-items: center;
  justify-content: center;
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

export default HomeSection;
