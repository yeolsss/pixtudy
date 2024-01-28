import Link from "next/link";
import styled from "styled-components";

export const StPositionRelative = styled.div`
  position: relative;
`;

export const StCTAButton = styled.button`
  display: block;
  background-color: ${(props) => props.theme.color.bg.interactive.primary};
  padding-top: ${(props) => props.theme.spacing[12]};
  padding-bottom: ${(props) => props.theme.spacing[12]};
  letter-spacing: var(--unit-2);
  font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
  color: ${(props) => props.theme.color.text.interactive.inverse};
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-hovered"]};
  }
`;

export const StDangerButton = styled.button`
  display: block;
  background-color: ${(props) => props.theme.color.bg.interactive.danger};
  padding-top: ${(props) => props.theme.spacing[12]};
  padding-bottom: ${(props) => props.theme.spacing[12]};
  letter-spacing: var(--unit-2);
  font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
  color: ${(props) => props.theme.color.text.interactive.inverse};
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["danger-hovered"]};
  }
`;

export const StCTALink = styled(Link)`
  display: block;
  background-color: ${(props) => props.theme.color.bg.interactive.primary};
  padding-top: ${(props) => props.theme.spacing[12]};
  padding-bottom: ${(props) => props.theme.spacing[12]};
  letter-spacing: var(--unit-2);
  font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
  color: ${(props) => props.theme.color.text.interactive.inverse};
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-hovered"]};
  }
`;
