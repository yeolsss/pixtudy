import styled from "styled-components";

export const StFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: auto;
  min-height: 100%;
  background: ${(props) => props.theme.color.bg.secondary};
  position: relative;
  & > a {
    display: none;
    cursor: pointer;
    position: absolute;
    top: ${(props) => props.theme.spacing["36"]};
    left: ${(props) => props.theme.spacing["48"]};
    color: ${(props) => props.theme.color.text.interactive.primary};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.unit["16"]};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
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
  @media screen and (max-width: 1000px) {
    width: 100%;
    & > a {
      display: inline-block;
    }
  }
`;

export const StFormContainer = styled.form<{
  $isOpen: boolean;
}>`
  width: 100%;
  & > button {
    margin-top: ${(props) =>
      props.$isOpen ? props.theme.spacing["16"] : "0px"};
    width: 100%;
    font-family: var(--point-font);
    font-weight: bold;
    font-size: ${(props) => props.theme.unit["15"]};
    height: ${(props) => props.theme.unit["56"]};
    border: 1px solid
      ${(props) =>
        props.$isOpen
          ? props.theme.color.border.interactive["secondary-pressed"]
          : "transparent"};
    background: ${(props) =>
      props.$isOpen ? "transparent" : props.theme.color.bg.brand};
    color: ${(props) =>
      props.$isOpen
        ? props.theme.color.text.interactive["secondary-pressed"]
        : props.theme.color.text.interactive.inverse};
    transition:
      margin ease-in-out 0.3s,
      border ease-in-out 0.3s,
      background ease-in-out 0.3s,
      color ease-in-out 0.3s;

    &:hover {
      border-color: transparent;
      background: ${(props) => props.theme.color.bg.brand};
      color: ${(props) => props.theme.color.text.interactive.inverse};
    }
  }
`;

export const StInputContainer = styled.section<{ $isOpen: boolean }>`
  max-height: ${(props) => (props.$isOpen ? "100%" : "0px")};

  overflow-y: hidden;
  transform-origin: top;
  transform: ${(props) => (props.$isOpen ? "scaleY(1)" : "scaleY(0)")};
  transition:
    max-height ease-in-out 0.5s,
    transform ease-in-out 0.3s;

  & > div + div {
    margin-top: ${(props) => props.theme.spacing["16"]};
    font-family: inherit;
  }
`;

export const StSuccessChangePw = styled.span`
  display: flex;
  justify-content: center;
  margin: ${(props) => props.theme.spacing["16"]} 0;
  font-size: ${(props) => props.theme.unit["16"]};
  font-weight: bold;
  color: ${(props) => props.theme.color.text.brand};
`;

export const StAuthInputSection = styled.div<{ $isError: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div {
    position: relative;

    & input {
      width: 100%;
      height: ${(props) => props.theme.unit["48"]};
      font-size: ${(props) => props.theme.unit["14"]};
      font-family: inherit;
      outline-color: ${(props) =>
        props.$isError
          ? props.theme.color.danger[400]
          : props.theme.color.base.black};
    }

    & button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      padding: unset;
      border-radius: unset;
      border: unset;
      background: unset;
      padding: ${(props) =>
        `${props.theme.spacing[14]} ${props.theme.spacing[16]}`};
    }
  }
  & span {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.unit["12"]};
    margin-top: ${(props) => props.theme.spacing["8"]};
    & img {
      margin: 0 ${(props) => props.theme.spacing[8]};
    }
  }
`;
