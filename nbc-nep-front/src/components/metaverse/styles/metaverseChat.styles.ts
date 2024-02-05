import styled from "styled-components";

export const StMetaverseChatCard = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  flex-direction: column;

  > section {
    display: flex;
    align-items: center;
    > span {
      zoom: 0.8;
      margin-right: ${(props) => props.theme.spacing["6"]};
    }
    > div {
      display: flex;
      flex-direction: column;
      > span {
        font-size: ${(props) => props.theme.unit["12"]};
      }
      > span:first-child {
        color: ${(props) =>
          props.$isCurrentUser ? props.theme.color.text.brand : "inherit"};
        font-weight: bold;
        margin-bottom: ${(props) => props.theme.spacing["2"]};
      }
      > span:last-child {
        font-family: var(--default-font);
      }
    }
    margin-bottom: ${(props) => props.theme.spacing["8"]};
  }
  > span:last-child {
    word-break: break-all;
    line-height: ${(props) => props.theme.spacing["20"]};
    letter-spacing: -0.32px;
    font-family: var(--default-font);
    font-size: ${(props) => props.theme.unit["16"]};
    margin-bottom: ${(props) => props.theme.spacing["12"]};
  }
`;
