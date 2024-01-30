import styled, { keyframes } from "styled-components";

export default function LoadingProgress() {
  return (
    <StModalBackground>
      <StLoadingSpinner />
    </StModalBackground>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 예시 배경 색상
  backdrop-filter: blur(5px);
  opacity: 1;
  z-index: 1000;
`;

// 로딩 스피너 스타일 정의
export const StLoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
`;
