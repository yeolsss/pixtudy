import OnChangeUserSession from "@/components/layout/OnChangeUserSession";
import StoreProvider from "@/redux/StoreProvier";
import GlobalStyle, { theme } from "@/styles/Globalstyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <DndProvider backend={HTML5Backend}>
          <OnChangeUserSession />
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {getLayout(
              <>
                <Component {...pageProps} />
              </>
            )}
          </ThemeProvider>
        </DndProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}
