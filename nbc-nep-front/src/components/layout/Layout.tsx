import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
