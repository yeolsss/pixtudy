import { useState } from "react";
import styled from "styled-components";
import AuthLoginMode from "./AuthLoginMode";
import AuthSignUpMode from "./AuthSignUpMode";

type AuthModeType = "login" | "signUp";

export default function AuthModalMainContainer() {
  const [authMode, setAuthMode] = useState<AuthModeType>("login");

  const changeAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "signUp" : "login"));
  };

  switch (authMode) {
    case "login":
      return (
        <StModalContainer>
          <AuthLoginMode changeAuthMode={changeAuthMode} />
        </StModalContainer>
      );
    case "signUp":
      return (
        <StModalContainer>
          <AuthSignUpMode changeAuthMode={changeAuthMode} />
        </StModalContainer>
      );
    default:
      return <></>;
  }
}

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
