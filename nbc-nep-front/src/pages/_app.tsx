import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

import CheckUserSession from "@/components/layout/CheckUserSession";
import GlobalStyle, { theme } from "@/styles/Globalstyle";
import { NextPageWithLayout } from "@/types/app.types";

import localFont from "next/font/local";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const localFonts = localFont({
  src: [
    {
      path: "../assets/fonts/Galmuri11-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Galmuri11.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Galmuri14.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/NeoDunggeunmoPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <CheckUserSession />
          <div className={localFonts.className}>
            {getLayout(<Component {...pageProps} />)}
          </div>
          <ToastContainer position="top-left" autoClose={2000} />
        </ThemeProvider>
      </DndProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
