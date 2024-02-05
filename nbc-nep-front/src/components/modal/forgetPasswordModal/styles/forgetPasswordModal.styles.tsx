import styled from "styled-components";

export const StForgetPasswordModalForm = styled.form<{ $isPending: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.theme.unit["412"]};

  @media screen and (max-width: 500px) {
    width: 30rem;
  }

  & > input {
    font-family: inherit;
  }

  & > button {
    margin-top: ${(props) => props.theme.spacing["20"]};
    font-size: ${(props) => props.theme.unit["16"]};
    height: ${(props) => props.theme.unit["40"]};
    background: ${(props) =>
      props.$isPending
        ? props.theme.color.bg.disabled
        : props.theme.color.bg.brand};
    color: ${(props) => props.theme.color.text.interactive.inverse};
    border-color: ${(props) => props.theme.color.text.interactive.inverse};
    cursor: ${(props) => (props.$isPending ? "default" : "pointer")};
  }

  & > span {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.unit["12"]};
    margin-top: ${(props) => props.theme.spacing["8"]};
    line-height: ${(props) => props.theme.spacing["20"]};
    white-space: pre-line;
    & img {
      margin: 0 ${(props) => props.theme.spacing[8]};
    }
  }
`;

export const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2024;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing[36]};
  border-radius: ${(props) => props.theme.border.radius[8]};

  & > h2 {
    font-size: ${(props) => props.theme.unit["32"]};
    margin-bottom: ${(props) => props.theme.spacing["12"]};
    font-family: var(--point-font);
    font-weight: bold;
  }

  & > span {
    font-size: ${(props) => props.theme.unit["12"]};
    margin-bottom: ${(props) => props.theme.spacing["24"]};
  }

  @media screen and (max-width: 500px) {
    padding: ${(props) => props.theme.spacing["24"]};
    & > h2 {
      font-size: ${(props) => props.theme.unit["24"]};
    }
  }
`;
