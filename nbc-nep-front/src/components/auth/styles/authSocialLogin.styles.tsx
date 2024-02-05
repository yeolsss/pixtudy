import styled from "styled-components";

export const StSocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > h2 {
    font-size: ${(props) => props.theme.unit[13]};
    line-height: ${(props) => props.theme.spacing["19-5"]};
    margin-bottom: ${(props) => props.theme.spacing[12]};
  }

  & > div {
    display: flex;

    & > button {
      width: ${(props) => props.theme.unit["130"]};
      height: ${(props) => props.theme.unit["48"]};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${(props) => props.theme.unit["12"]};
      border: 1px solid ${(props) => props.theme.color.border["sub-line"]};
      @media screen and (max-width: 1000px) {
        width: ${(props) => props.theme.spacing["112"]};
        font-size: ${(props) => props.theme.unit["12"]};
      }

      & > img {
        margin-right: ${(props) => props.theme.spacing["6"]};
        @media screen and (max-width: 1000px) {
          margin-right: ${(props) => props.theme.spacing["2"]};
        }
      }
    }
    & > button + button {
      margin-left: ${(props) => props.theme.spacing["12"]};
    }
  }
`;
