import React from "react";
import styled from "styled-components";
import { PropsWithChildren } from "react";

export default function AuthFormContainer({ children }: PropsWithChildren) {
  return (
    <StFormContainer>
      <div>{children}</div>
    </StFormContainer>
  );
}
export const StFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background: ${(props) => props.theme.color.bg.secondary};

  & > div {
    padding-top: ${(props) => props.theme.spacing[118]};
    width: ${(props) => props.theme.unit["412"]}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > h1 {
      font-weight: bold;
      font-size: ${(props) => props.theme.unit["36"]}px;
      line-height: ${(props) => props.theme.spacing[44]};
      font-family: var(--point-font);
      margin-bottom: ${(props) => props.theme.spacing[32]};
    }
  }
`;
