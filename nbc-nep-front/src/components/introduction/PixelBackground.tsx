import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  isInSection: boolean;
  position: { top: number; left: number };
}

const anim: (i: number) => Variants = (i: number) => {
  return {
    initial: {
      opacity: 0,
    },
    open: (i) => ({
      opacity: 1,
      transition: { duration: 0, delay: 0.02 * i },
    }),
    closed: (i) => ({
      opacity: 0,
      transition: { duration: 0, delay: 0.02 * i },
    }),
  };
};

export default function PixelBackground({ isInSection, position }: Props) {
  const [windowDimensions, setWindowDimensions] = useState({
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const { innerHeight, innerWidth } = window;
    setWindowDimensions({ innerHeight, innerWidth });
  }, []);
  const { innerWidth, innerHeight } = windowDimensions;

  console.log(position.top, position.left);

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getBlocks = () => {
    if (!innerHeight || !innerWidth) return;
    const blockSize = innerWidth * 0.02;
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
          animate={isInSection ? "open" : "closed"}
          custom={randomIndex}
        />
      );
    });
  };

  return (
    <StPixelBackground $position={position}>
      {[...Array(20)].map((_, index) => {
        return <div key={index}>{getBlocks()}</div>;
      })}
    </StPixelBackground>
  );
}

const StPixelBackground = styled.div<{
  $position: { top: number; left: number };
}>`
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
      /* background-color: #ff6a00; */
      background-color: ${(props) => props.theme.color.bg.brand};
    }
  }
`;
