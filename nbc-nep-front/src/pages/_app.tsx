import CheckUserSession from "@/components/layout/CheckUserSession";
import ConfirmModalModal from "@/components/modal/confirmModal/ConfirmModal";
import useConfirm from "@/hooks/confirm/useConfirm";
import GlobalStyle, { theme } from "@/styles/Globalstyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);
  const { isOpen } = useConfirm();

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <CheckUserSession />
          {getLayout(
            <>
              <Component {...pageProps} />
            </>
          )}
          {isOpen && <ConfirmModalModal />}
          <ToastContainer position="top-left" autoClose={2000} />
        </ThemeProvider>
      </DndProvider>
    </QueryClientProvider>
  );
}
