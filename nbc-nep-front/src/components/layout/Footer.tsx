import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  return (
    <StFooter>
      <Heading>픽터디</Heading>
      <ContentWrapper>
        <CopyRight>
          spartacodingclub © 2024. All rights reserved. <br />
        </CopyRight>
        <Nav>
          <ul>
            <li>Privacy Policy</li>
            <li>Cookies</li>
            <li>LegalAdvice</li>
            <li>FAQ</li>
          </ul>
        </Nav>
        <Author href="https://github.com/yeolsss/nbc-nep">
          Made by 창립멤버
        </Author>
      </ContentWrapper>
    </StFooter>
  );
}

const StFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing[40]};

  padding: ${(props) =>
    `${props.theme.spacing[20]} ${props.theme.spacing[20]}`};
  margin: 0 auto;

  border-top: 1px solid ${(props) => props.theme.color.grey[200]};

  *:not(h2) {
    color: ${(props) => props.theme.color.grey["400"]};
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
    font-weight: ${(props) => props.theme.body.sm.regular.fontWeight};
    line-height: ${(props) => props.theme.body.sm.regular.lineHeight};
    letter-spacing: ${(props) => props.theme.body.sm.regular.letterSpacing};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  flex-grow: 1;
`;

const Heading = styled.h2`
  font-family: ${(props) => props.theme.body.lg.semibold.fontFamily};
  font-size: ${(props) => props.theme.body.lg.semibold.fontSize};
  font-weight: ${(props) => props.theme.body.lg.semibold.fontWeight};
  color: ${(props) => props.theme.color.text.interactive.primary};
`;

const CopyRight = styled.p``;

const Nav = styled.nav`
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

const Author = styled(Link)`
  text-decoration: underline;

  &:visited {
    color: inherit;
  }
`;
