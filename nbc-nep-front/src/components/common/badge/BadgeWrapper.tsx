import { PropsWithChildren } from "react";
import { StBadgeWrapper } from "./badge.styles";

export default function BadgeWrapper({ children }: PropsWithChildren) {
  return <StBadgeWrapper>{children}</StBadgeWrapper>;
}
