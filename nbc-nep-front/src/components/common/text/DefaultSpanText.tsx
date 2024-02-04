import styled from 'styled-components'

const DefaultSpanText = styled.span`
  position: absolute;
  top: -${(props) => props.theme.unit[4]};
  right: 0;
  font-family: var(--default-font);
  font-size: ${(props) => props.theme.body.sm.medium.fontSize};
  line-height: ${(props) => props.theme.unit[24]};
  color: var(--color-red-500);
`

export default DefaultSpanText
