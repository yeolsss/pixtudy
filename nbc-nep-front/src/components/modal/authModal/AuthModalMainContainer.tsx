import { useState } from "react";
import styled from "styled-components";

type authModeType = "login" | "signUp";

const AuthModalMainContainer = () => {
  const [authMode, setAuthMode] = useState<authModeType>("login");
  const changeAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "signUp" : "login"));
  };

  switch (authMode) {
    case "login":
      return (
        <StModalContainer>
          <span>
            아직 회원이 아니신가요?{" "}
            <span onClick={changeAuthMode}>회원가입</span>
          </span>
        </StModalContainer>
      );
    case "signUp":
      return (
        <StModalContainer>
          <span>
            이미 회원이신가요? <span onClick={changeAuthMode}>로그인</span>
          </span>
        </StModalContainer>
      );
    default:
      return <></>;
  }
};

const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: white;
  width: 50rem;
  height: 50rem;
`;

export default AuthModalMainContainer;
