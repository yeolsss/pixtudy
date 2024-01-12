import { useAppDispatch } from "@/hooks/useReduxTK";
import { supabase } from "@/libs/supabase";
import { login, logout } from "@/redux/modules/authSlice";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { createWrapper } from "next-redux-wrapper";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();

  const router = useRouter();

  /* 로그인 상태를 tracking*/
  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        // 최초 랜더링 시
        if (session) {
          console.log(session);
          dispatch(login());
          router.push("/dashboard");
        }
      } else if (event === "SIGNED_IN") {
        // 로그인 시
        // dispatch(login());
        // router.push("/dashboard");
      } else if (event === "SIGNED_OUT") {
        // 로그아웃 시
        dispatch(logout());
      } else if (event === "PASSWORD_RECOVERY") {
        // 비밀번호 찾기 페이지 들어갈 시
      } else if (event === "TOKEN_REFRESHED") {
        // 리프레시 토큰 작동시
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
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </QueryClientProvider>
  );
}
const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(App);
