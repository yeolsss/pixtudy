import { AnimatePresence } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import ScrollItem from "./ScrollItem";
import {
  StScrollSection,
  StStickyItem,
  StStickyWrapper,
} from "./styles/home.styles";

const SCROLL_THRESHOLDS = [2160, 3160, 4160, 5160];

const HomeScrollContainer = forwardRef<HTMLDivElement>(
  function HomeScrollContainer(props, ref) {
    const [index, setIndex] = useState(-1);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY < SCROLL_THRESHOLDS[0]) {
          setIndex(-1);
          return;
        }
        SCROLL_THRESHOLDS.forEach((v, i) => {
          if (window.scrollY > v) setIndex(i);
        });
      };
      // throttling needed
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

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
            {Array.from({ length: index + 1 }).map((_, i) => (
              <ScrollItem key={`scroll-item${i}`} index={i} />
            ))}
          </AnimatePresence>
        </StStickyWrapper>
      </StScrollSection>
    );
  }
);

export default HomeScrollContainer;
