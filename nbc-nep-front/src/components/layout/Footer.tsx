import {
  Author,
  ContentWrapper,
  CopyRight,
  Heading,
  Nav,
  StFooter,
  StWrapper,
} from "./styles/footer.styles";

export default function Footer() {
  return (
    <StFooter>
      <StWrapper>
        <Heading>픽스터디</Heading>
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
      </StWrapper>
    </StFooter>
  );
}
