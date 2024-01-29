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
  border: 0;
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-hovered"]};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-pressed"]};
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

export const StToPreviousButton = styled.button`
  display: block;
  padding-top: ${(props) => props.theme.spacing[12]};
  padding-bottom: ${(props) => props.theme.spacing[12]};
  letter-spacing: var(--unit-2);
  font-size: ${(props) => props.theme.body.md.medium.fontSize};
  font-family: var(--point-font);
  font-weight: ${(props) => props.theme.heading.desktop["4xl"].fontWeight};
  width: 100%;
  transition: 0.1s all;
  background-color: ${(props) => props.theme.color.bg.secondary};
  color: ${(props) => props.theme.color.text.secondary};
  border: 1px solid ${(props) => props.theme.color.border.interactive.secondary};
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["secondary-hovered"]};
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-hovered"]};
    border: 1px solid
      ${(props) => props.theme.color.border.interactive["secondary-hovered"]};
  }
`;

export const StFormCTAButton = styled.button`
  display: block;
  background-color: ${(props) => props.theme.color.bg.interactive.primary};
  padding-top: ${(props) => props.theme.spacing[12]};
  padding-bottom: ${(props) => props.theme.spacing[12]};
  letter-spacing: var(--unit-2);
  color: ${(props) => props.theme.color.text.interactive.inverse};
  font-size: ${(props) => props.theme.body.md.medium.fontSize};
  font-family: var(--point-font);
  font-weight: ${(props) => props.theme.heading.desktop["4xl"].fontWeight};
  width: 100%;
  transition: 0.1s all;
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-hovered"]};
  }
  &:disabled {
    background-color: ${(props) => props.theme.color.bg.disabled};
    border: 1px solid ${(props) => props.theme.color.border.disabled};
    color: ${(props) => props.theme.color.text.disabled};
    cursor: not-allowed;
  }
`;
