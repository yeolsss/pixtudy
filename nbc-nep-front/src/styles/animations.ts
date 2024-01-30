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
