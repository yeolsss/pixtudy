import useScroll from "@/hooks/scroll/useScroll";
import { AnimatePresence } from "framer-motion";
import { forwardRef } from "react";
import ScrollItem from "./ScrollItem";
import {
  StScrollSection,
  StStickyItem,
  StStickyWrapper,
} from "./styles/home.styles";

const HomeFeatures = forwardRef<HTMLDivElement>(
  function HomeScrollContainer(_, ref) {
    const { scrollIndex } = useScroll();

    return (
      <StScrollSection ref={ref}>
        <StStickyWrapper>
          <StStickyItem>
            <h1>Pixtudy에서의 회의는 다릅니다.</h1>
            <p>
              화상/음성을 통한 유저간 실시간 소통과 최대 4개의 화면을 동시에
              공유할 수 있는 커스텀 레이아웃을 통해 완벽한 회의를 진행하세요
            </p>
          </StStickyItem>
          <AnimatePresence>
            {Array.from({ length: scrollIndex + 1 })
              .map((props, i) => i)
              .map((index) => (
                <ScrollItem key={`scroll-item${index}`} index={index} />
              ))}
          </AnimatePresence>
        </StStickyWrapper>
      </StScrollSection>
    );
  }
);

export default HomeFeatures;
