import CustomHead from "@/SEO/CustomHead";
import HomeBanner from "@/components/home/HomeBanner";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeIntroduction from "@/components/home/HomeIntroduction";
import PixelBackground from "@/components/home/PixelBackground";
import Layout from "@/components/layout/Layout";
import useHandleScroll from "@/hooks/scroll/useHandleScroll";
import { getCookie } from "@/utils/middlewareUtils";
import { pathValidation } from "@/utils/middlewareValidate";
import useAuth from "@/zustand/authStore";
import { ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { user } = useAuth();
  const bannerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  useHandleScroll([bannerRef, introRef, featuresRef]);

  useEffect(() => {
    const message = getCookie("message");
    if (message) {
      // 메시지로 이벤트 처리
      pathValidation(message);
      // 쿠키 삭제
      document.cookie =
        "message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);

  // const imagesPerSection = {'section1', 'section2', 'section3' };

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
