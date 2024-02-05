import useScroll from "@/hooks/scroll/useScroll";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  StPixelBackground,
  StPixelBackgroundContainer,
} from "./styles/homePixelBackground.styles";

const anim = (i: number) => ({
  initial: {
    opacity: 0,
  },
  hide: {
    opacity: 0,
    transition: { duration: 0, delay: 0.03 * i },
  },
  show: {
    opacity: 1,
    transition: { duration: 0, delay: 0.03 * i },
  },
});

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
    const newArray = [...array];

    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getBlocks = () => {
    if (!innerHeight || !innerWidth) return null;

    const blockSize = innerWidth * 0.04;
    const numberOfBlocks = Math.ceil(innerHeight / blockSize);
    const shuffledArray = shuffle(
      [...Array(numberOfBlocks)].map((_, index) => index)
    );

    return shuffledArray.map((randomIndex) => (
      <motion.div
        key={`random Array randomIndex${randomIndex}`}
        variants={anim(randomIndex)}
        initial="initial"
        animate={section === "intro" ? "hide" : "show"}
        custom={randomIndex}
      />
    ));
  };

  return (
    <StPixelBackgroundContainer>
      <StPixelBackground>
        {[...Array(20)]
          .map((_, index) => index)
          .map((index) => {
            return <div key={index}>{getBlocks()}</div>;
          })}
      </StPixelBackground>
    </StPixelBackgroundContainer>
  );
}
