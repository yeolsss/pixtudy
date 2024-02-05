import { Interactive, Interactive2 } from '@/types/theme.types'
import styled from 'styled-components'

interface StBadgeProps {
  color?: string
  x?: number | string
  y?: number | string
  width?: number
  height?: number
}

export const StBadge = styled.div<StBadgeProps>`
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

export const StBadgeNumber = styled(StBadge)<{$bg: keyof Interactive, $color: keyof Interactive2}>`
  top: ${(props) => `calc(-1 * ${props.theme.spacing[48]})`};
  left: ${(props) => props.theme.spacing[4]};

  width: 20px;
  height: 20px;
  font-size: ${(props) => props.theme.body.md.medium.fontSize};
  border-radius: ${(props) => props.theme.border.radius.circle};

  display: flex;
  justify-content: center;
  align-items: end;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.bg.interactive[props.$bg]};
  color: ${(props) => props.theme.color.text.interactive[props.$color]};
  > * {
    color: ${(props) => props.theme.color.text.interactive[props.$color]};
  }
`

export const StBadgeWrapper = styled.div`
  position: relative;
  width: 0;
  height: 0;
`
