import { Interactive, Interactive2 } from '@/types/theme.types';
import { StBadgeNumber } from './badge.styles';

interface Props {
  count: number;
  maxCount?: number;
  backgroundColor?: keyof Interactive;
  color?: keyof Interactive2;
}



export default function BadgeNumber({
  count,
  maxCount = 10,
  backgroundColor = "primary",
  color = "inverse",
}: Props) {
  let displayCount = Math.min(count, maxCount);

  return (
    <StBadgeNumber $bg={backgroundColor} $color={color}>
      <span>{displayCount}</span>
    </StBadgeNumber>
  )
}


