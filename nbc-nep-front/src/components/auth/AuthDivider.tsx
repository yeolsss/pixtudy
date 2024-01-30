import styled from "styled-components";

export default function AuthDivider() {
  return <StAuthDivider>또는</StAuthDivider>;
}

const StAuthDivider = styled.span`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.unit["13"]};
  margin: ${(props) => props.theme.spacing["32"]} 0;
  width: 100%;
  &::before {
    content: "";
    height: 1px;
    background-color: ${(props) => props.theme.color.border["sub-line"]};
    width: ${(props) => props.theme.unit["181"]};
    margin-right: ${(props) => props.theme.spacing["12"]};
  }
  &::after {
    content: "";
    height: 1px;
    background-color: ${(props) => props.theme.color.border["sub-line"]};
    width: ${(props) => props.theme.unit["181"]};
    margin-left: ${(props) => props.theme.spacing["12"]};
  }
`;
