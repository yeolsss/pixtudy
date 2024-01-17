import { PropsWithChildren } from "react";
import styled from "styled-components";

export default function BadgeWrapper({ children }: PropsWithChildren) {
  return <StBadgeWrapper>{children}</StBadgeWrapper>;
}

const StBadgeWrapper = styled.div`
  position: relative;
`;
