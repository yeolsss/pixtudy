import styled from "styled-components";

export const StAuthDivider = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.unit["13"]};
  margin: ${(props) => props.theme.spacing["32"]} 0;
  white-space: nowrap;
  width: 100%;
  &::before {
    content: "";
    height: 1px;
    background-color: ${(props) => props.theme.color.border["sub-line"]};
    width: 50%;
    margin-right: ${(props) => props.theme.spacing["12"]};
  }
  &::after {
    content: "";
    height: 1px;
    background-color: ${(props) => props.theme.color.border["sub-line"]};
    width: 50%;
    margin-left: ${(props) => props.theme.spacing["12"]};
  }
`;
