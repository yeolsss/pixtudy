import OnChangeUserSession from "@/components/layout/OnChangeUserSession";
import StoreProvider from "@/libs/StoreProvier";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        {getLayout(
          <>
            <OnChangeUserSession />
            <Component {...pageProps} />
          </>
        )}
      </StoreProvider>
    </QueryClientProvider>
  );
}
export default App;
