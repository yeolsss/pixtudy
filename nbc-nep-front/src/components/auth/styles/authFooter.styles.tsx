import styled from "styled-components";

export const StAuthFooter = styled.footer`
  width: 93%;
  margin-top: ${(props) => props.theme.spacing["16"]};
  font-size: ${(props) => props.theme.unit["12"]};
  line-height: ${(props) => props.theme.spacing["19-5"]};
  color: #5a5a5a;
  word-break: keep-all;
  text-align: center;

  & a {
    color: inherit;
    text-decoration: underline;
  }
`;
