import { keyframes } from "styled-components";

export const slideUp = keyframes`
  from {
    transform: translateY(20px);
  } 
  to {
    transform: translateY(0);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  } to {
    transform: translateY(20px);
    opacity: 0;
  }
`;

export const elasticPop = keyframes`
from , to{
  transform: translate(-50%, -50%) scale(1)
} 50% {
  transform: translate(-50%, -50%) scale(1.05)
}
`;

export const fadeInOut = ({ x, y }: { x?: number; y?: number } = {}) => {
  const options: { x?: number; y?: number } = {};
  if (x !== undefined) {
    options.x = x;
  }
  if (y !== undefined) {
    options.y = y;
  }

  return {
    initial: { opacity: 0.5, ...options },
    animate: { opacity: 1, y: 0, x: 0 },
    exit: {
      opacity: 0.5,
      ...options,
      ...(y !== undefined && { y: -y }),
      ...(x !== undefined && { x: -x }),
    },
    transition: { duration: 0.2 },
  };
};
