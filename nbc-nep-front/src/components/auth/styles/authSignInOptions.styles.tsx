import styled from "styled-components";

export const StSignInOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: ${(props) => props.theme.spacing["32"]} 0
    ${(props) => props.theme.spacing["16"]} 0;
  & > section {
    display: flex;
    margin: unset;
    align-items: center;
    & label {
      font-size: ${(props) => props.theme.unit["12"]};
    }
  }
  & > button {
    background: none;
    border: none;
    font-weight: normal;
    padding: 0;
    font-size: ${(props) => props.theme.unit["14"]};
    cursor: pointer;
    color: #d93f21;
    &:hover {
      text-decoration: underline;
      color: #d93f21;
      background: none;
    }
  }
  & input {
    display: none;
  }
`;

export const StSaveLoginInfoToggleCheckBox = styled.label<{
  $isCheck: boolean;
}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  & > div {
    position: relative;
    margin-right: ${(props) => props.theme.spacing["8"]};
    width: ${(props) => props.theme.unit["40"]};
    height: ${(props) => props.theme.unit["20"]};
    border-radius: ${(props) => props.theme.border.radius["36"]};
    background: ${(props) =>
      props.$isCheck ? props.theme.color.success["400"] : "#ececec"};
    border: 0.5px solid #c9c9c9;
    & > div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: ${(props) => (props.$isCheck ? "unset" : props.theme.spacing["2"])};
      right: ${(props) =>
        props.$isCheck ? props.theme.spacing["2"] : "unset"};
      width: ${(props) => props.theme.unit["16"]};
      height: ${(props) => props.theme.unit["16"]};
      border-radius: ${(props) => props.theme.border.radius.circle};
      background: var(--color-base-white);
    }
  }
`;
