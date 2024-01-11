import { useAppDispatch } from "@/hooks/useReduxTK";
import { supabase } from "@/libs/supabase";
import { login, logout } from "@/redux/modules/authSlice";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { createWrapper } from "next-redux-wrapper";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import GlobalStyle from "@/styles/Globalstyle";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();

  /* 로그인 상태를 tracking*/
  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      // 최초 랜더시 상태 확인
      if (session) {
        dispatch(login());
      }

      if (event === "INITIAL_SESSION") {
        // 구독을 시작할 때
      } else if (event === "SIGNED_IN") {
        // 로그인 시
        dispatch(login());
      } else if (event === "SIGNED_OUT") {
        // 로그아웃 시
        dispatch(logout());
      } else if (event === "PASSWORD_RECOVERY") {
        // 비밀번호 찾기 페이지 들어갈 시
      } else if (event === "TOKEN_REFRESHED") {
        console.log("넌뭐야");
      } else if (event === "USER_UPDATED") {
        // 유저 정보 업데이트 시
      }
    });
    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </QueryClientProvider>
  );
}
const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(App);
