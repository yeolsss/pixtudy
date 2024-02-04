import { Interactive, Interactive2 } from "@/types/theme.types";
import styled from "styled-components";
import StBadge from "./Badge";

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
  );
}

const StBadgeNumber = styled(StBadge)<{
  $bg: keyof Interactive;
  $color: keyof Interactive2;
}>`
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
`;
