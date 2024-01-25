import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import Spaces from "@/components/spaces/Spaces";
import { theme } from "@/styles/Globalstyle";
import { Database, Tables } from "@/supabase/types/supabase";
import { createClient } from "@supabase/supabase-js";
import type { NextPage } from "next";
import { ReactElement } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  spaces: Tables<"spaces">[];
}

const Dashboard: NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactElement;
} = ({ spaces }) => {
  return (
    <>
      <CustomHead title={"Dashboard"} description={"Dashboard 페이지입니다."} />
      <StSwiperWrapper>
        <Swiper
          spaceBetween={theme.unit[24]}
          slidesPerView={3}
          modules={[Navigation, Pagination, Scrollbar]}
          navigation
          pagination={{ clickable: true }}
        >
          {spaces.map((space) => (
            <SwiperSlide key={space.id}>
              <Banner
                bgSrc={
                  "https://images.unsplash.com/photo-1706068720402-ce49bf8661be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D"
                }
                description={space.description}
                spaceId={space.id}
                title={space.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <StBlurDiv />
      </StSwiperWrapper>
      <Spaces />
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async () => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const spaceIds = [
    "5e198976-d0cf-440d-abd5-aeb45ba87d48",
    "0ba99a00-bce4-47b4-8490-79eaaf81429a",
    "e824a12d-7959-4d56-8e5e-0f73da9732ce",
    "8c57ed8a-43fb-4f04-98bb-3de5e60176a4",
  ];

  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .in("id", spaceIds);

  return { props: { spaces: data || [] } };
};

const StSwiperWrapper = styled.div`
  max-width: 1280px;
  min-width: 1280px;
  margin: 0 auto;
  position: relative;

  .swiper {
    height: 297px;
    width: 100%;
    /* padding: ${(props) =>
      `${props.theme.spacing[24]} ${props.theme.spacing[40]}`}; */
  }
`;

const StBlurDiv = styled.div`
  width: 313px;
  height: 286px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 1) 71.86%,
    rgba(255, 255, 255, 1) 93.84%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 2;
  pointer-events: none;
  top: 0;
  right: -${(props) => props.theme.unit[32]}px;
  position: absolute;
`;

export default Dashboard;
