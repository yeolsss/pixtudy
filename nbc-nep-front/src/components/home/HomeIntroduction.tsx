import useScroll from "@/hooks/scroll/useScroll";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { forwardRef } from "react";
import {
  StSection,
  StSectionContents,
  StSectionWrapper,
} from "./styles/homeIntroduction.styles";

const HomeIntroduction = forwardRef<HTMLDivElement>(
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
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/assets/introduction/section1.png"
                alt="hero image"
                width={479}
                height={430}
              />
              <StSectionContents>
                <h1>새로운 회의를 위한 새로운 공간.</h1>
                <p>
                  <em>Pixtudy</em>는 혁신적인 가상 업무 및 스터디 공간으로
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

export default HomeIntroduction;
