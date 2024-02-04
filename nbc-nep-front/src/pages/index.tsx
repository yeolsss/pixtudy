import CustomHead from "@/SEO/CustomHead";
import HomeBanner from "@/components/home/HomeBanner";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeIntroduction from "@/components/home/HomeIntroduction";
import PixelBackground from "@/components/home/PixelBackground";
import Layout from "@/components/layout/Layout";
import useHandleScroll from "@/hooks/scroll/useHandleScroll";
import { getCookie } from "@/utils/middlewareCookie";
import { pathValidation } from "@/utils/middlewareValidate";
import useAuthStore from "@/zustand/authStore";
import { ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@/types/app.types";

const Home: NextPageWithLayout = () => {
  const user = useAuthStore.use.user();
  const bannerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  useHandleScroll([bannerRef, introRef, featuresRef]);

  useEffect(() => {
    const message = getCookie("message");
    const localMessage = localStorage.getItem("message");

    if (message || localMessage) {
      pathValidation(message || localMessage!);
      document.cookie =
        "message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);

  return (
    <>
      <CustomHead title={"Main"} description={"메인 페이지입니다."} />
      <StWrapper>
        <HomeBanner isLoggedIn={!!user.email} ref={bannerRef} />
        <HomeIntroduction ref={introRef} />
        <HomeFeatures ref={featuresRef} />
        <PixelBackground />
      </StWrapper>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

const StWrapper = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 1;
`;
