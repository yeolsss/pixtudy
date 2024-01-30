import { PropsWithChildren } from "react";
import styled from "styled-components";

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
  height: auto;
  min-height: 100%;
  background: ${(props) => props.theme.color.bg.secondary};
  position: relative;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  & > div {
    padding-top: ${(props) => props.theme.spacing["118"]};
    width: ${(props) => props.theme.unit["412"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    & > h1 {
      font-weight: bold;
      font-size: ${(props) => props.theme.unit["36"]};
      line-height: ${(props) => props.theme.spacing[44]};
      font-family: var(--point-font);
      margin-bottom: ${(props) => props.theme.spacing[32]};
    }
    & > h2 {
      font-size: ${(props) => props.theme.unit["16"]};
      margin-bottom: ${(props) => props.theme.spacing[32]};

      & > span {
        font-weight: bold;
        font-family: var(--point-font);
        color: ${(props) => props.theme.color.text.interactive.primary};
      }
    }

    @media screen and (max-width: 1000px) {
      padding: ${(props) => props.theme.spacing["32"]};
      padding-top: ${(props) => props.theme.spacing["118"]};
      width: 80%;
      height: 100%;
    }
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
`;
