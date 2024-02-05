import Link from "next/link";
import styled from "styled-components";

export const StNavWrapper = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme.color.bg.primary};
  position: relative;
  z-index: 2;
`;

export const StNavContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;

  margin: 0 auto;
  height: ${(props) => props.theme.unit[96]};
  padding: ${(props) => props.theme.spacing[24]};

  justify-content: space-between;
  align-items: center;
  font-family: var(--sub-font);
  position: relative;
  z-index: 100;

  div {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[32]};

    @media screen and (max-width: 768px) {
      gap: ${(props) => props.theme.spacing[16]};
    }
  }

  p {
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
    font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
    color: ${(props) => props.theme.color.text.primary};
    font-family: var(--sub-font);
    letter-spacing: ${(props) => props.theme.body.lg.regular.letterSpacing};
  }
`;

export const StLogo = styled(Link)`
  display: block;
  h1 {
    color: ${(props) => props.theme.color.text.interactive.primary};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  }
`;

export const StNavLink = styled(Link)`
  display: block;

  border: none;
  padding: 0;
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
  color: ${(props) => props.theme.color.text.disabled};

  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-pressed"]};
  }
  @media screen and (max-width: 768px) {
    font-size: ${(props) => props.theme.body.md.regular.fontSize};
    font-weight: ${(props) => props.theme.body.md.regular.fontWeight};
    color: ${(props) => props.theme.color.text.disabled};
  }
`;
export const StNavButton = styled.button`
  border: none;
  padding: 0;
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
  color: ${(props) => props.theme.color.text.disabled};

  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-pressed"]};
  }

  @media screen and (max-width: 768px) {
    font-size: ${(props) => props.theme.body.md.regular.fontSize};
    font-weight: ${(props) => props.theme.body.md.regular.fontWeight};
    color: ${(props) => props.theme.color.text.disabled};
  }
`;
