import styled from "styled-components";

export const AuthOuterContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const ChangeAuthPage = styled.span`
  position: absolute;
  top: ${(props) => props.theme.spacing["40"]};
  right: ${(props) => props.theme.spacing["48"]};
  font-size: ${(props) => props.theme.unit["14"]}px;
  font-family: var(--sub-font);
  & > a {
    font-family: inherit;
    margin-left: ${(props) => props.theme.spacing["12"]};
    text-decoration: none;
    color: ${(props) => props.theme.color.text.interactive.primary};
  }
`;
