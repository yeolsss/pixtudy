import useScroll from "@/hooks/scroll/useScroll";
import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {}

const anim: (i: number) => Variants = (i: number) => {
  return {
    initial: {
      opacity: 0,
    },
    hide: (i) => ({
      opacity: 0,
      transition: { duration: 0, delay: 0.03 * i },
    }),
    show: (i) => ({
      opacity: 1,
      transition: { duration: 0, delay: 0.03 * i },
    }),
  };
};

export default function PixelBackground() {
  const { section } = useScroll();
  const [windowDimensions, setWindowDimensions] = useState({
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const { innerHeight, innerWidth } = window;
    setWindowDimensions({ innerHeight, innerWidth });
  }, []);

  const { innerWidth, innerHeight } = windowDimensions;

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getBlocks = () => {
    if (!innerHeight || !innerWidth) return;
    const blockSize = innerWidth * 0.04;
    const numberOfBlocks = Math.ceil(innerHeight / blockSize);
    const shuffledArray = shuffle(
      [...Array(numberOfBlocks)].map((_, index) => index)
    );
    return shuffledArray.map((randomIndex, index) => {
      return (
        <motion.div
          key={index}
          variants={anim(index)}
          initial="initial"
          animate={section === "intro" ? "hide" : "show"}
          custom={randomIndex}
        />
      );
    });
  };

  return (
    <StPixelBackgroundContainer>
      <StPixelBackground>
        {[...Array(20)].map((_, index) => {
          return <div key={index}>{getBlocks()}</div>;
        })}
      </StPixelBackground>
    </StPixelBackgroundContainer>
  );
}

const StPixelBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const StPixelBackground = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  z-index: 0;
  pointer-events: none;

  & > div {
    display: flex;
    width: 100%;
    height: 10vh;

    & > div {
      width: 10vw;
      height: 100%;
      background-color: ${(props) => props.theme.color.bg.interactive.selected};
    }
  }
`;
