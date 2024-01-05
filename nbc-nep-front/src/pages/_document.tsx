import { Head, Html, Main, NextScript } from "next/document";
import GlobalStyle from "../styles/Globalstyle";

export default function Document() {
  return (
    <Html lang="ko">
      <GlobalStyle />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
