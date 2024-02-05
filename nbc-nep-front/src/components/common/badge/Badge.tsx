import styled from 'styled-components'

interface StBadgeProps {
  color?: string
  x?: number | string
  y?: number | string
  width?: number
  height?: number
}

const StBadge = styled.div<StBadgeProps>`
  position: absolute;
  width: ${(props) => toCssValue(props?.width) || '12px'};
  height: ${(props) => toCssValue(props?.height) || '12px'};
  border-radius: ${(props) => props.theme.border.radius.circle};
  background-color: ${(props) => props.color || 'var(--state-online)'};

  ${(props) => (props.y ? `top: ${toCssValue(props?.y)}` : '')};
  ${(props) => (props.x ? `left: ${toCssValue(props?.x)}` : '')};
`

function toCssValue(x: string | number | undefined) {
  if (!x) {return undefined}
  if (typeof x === 'string') {return x}
  return x + 'px'
}

export default StBadge
