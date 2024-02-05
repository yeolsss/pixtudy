import { PropsWithChildren } from "react";
import styled from "styled-components";

const StBadgeWrapper = styled.div`
  position: relative;
  width: 0;
  height: 0;
`;

export default function BadgeWrapper({ children }: PropsWithChildren) {
  return <StBadgeWrapper>{children}</StBadgeWrapper>;
}
