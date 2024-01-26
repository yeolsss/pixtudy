import styled from "styled-components";

const DefaultSpanText = styled.span`
  font-family: var(--default-font);
  font-size: ${(props) => props.theme.body.sm.medium.fontSize};
  line-height: ${(props) => props.theme.unit[24]}px;
`;

export default DefaultSpanText;
