import Link from "next/link";
import styled from "styled-components";

export const StFooter = styled.footer`
  width: 100%;
  bottom: 0;
  left: 0%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.base.white};
  gap: ${(props) => props.theme.spacing[40]};

  margin: 0 auto;
  padding: ${(props) =>
    `${props.theme.spacing[20]} ${props.theme.spacing[20]}`};

  border-top: 1px solid ${(props) => props.theme.color.grey[200]};

  *:not(h2) {
    color: ${(props) => props.theme.color.grey["400"]};
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
    font-weight: ${(props) => props.theme.body.sm.regular.fontWeight};
    line-height: ${(props) => props.theme.body.sm.regular.lineHeight};
    letter-spacing: ${(props) => props.theme.body.sm.regular.letterSpacing};
  }
  & > div {
    max-width: 1200px;
    width: 100%;
  }
`;

export const StWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  gap: ${(props) => props.theme.spacing[40]};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  flex-grow: 1;
`;

export const Heading = styled.h2`
  font-family: ${(props) => props.theme.body.lg.semibold.fontFamily};
  font-size: ${(props) => props.theme.body.lg.semibold.fontSize};
  font-weight: ${(props) => props.theme.body.lg.semibold.fontWeight};
  color: ${(props) => props.theme.color.text.interactive.primary};
`;

export const CopyRight = styled.p``;

export const Nav = styled.nav`
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing[16]};
  }
  li {
    font-family: var(--default-font);
  }
`;

export const Author = styled(Link)`
  text-decoration: underline;

  &:visited {
    color: inherit;
  }
`;
