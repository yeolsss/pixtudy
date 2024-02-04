import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import AvatarModalContainer from "@/components/layout/banner/AvatarModalContainer";
import Banner from "@/components/layout/banner/Banner";
import ModalPortal from "@/components/modal/ModalPortal";
import Spaces from "@/components/spaces/Spaces";
import useModal from "@/hooks/modal/useModal";
import useTourTooltip from "@/hooks/tooltip/useTourTooltip";
import { Database, Tables } from "@/types/supabase.types";
import { getCookie } from "@/utils/middlewareCookie";
import { pathValidation } from "@/utils/middlewareValidate";
import { createClient } from "@supabase/supabase-js";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { StaticImageData } from "next/image";
import { ReactElement, useEffect } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerBg1, BannerBg2, BannerBg3, BannerBg4 } from "@/assets/banner";
import { DASHBOARD_TOUR_TOOLTIP } from "@/pages/dashboard/constants";

interface Props {
  spaces: (Tables<"spaces"> & { bgSrc: StaticImageData })[];
}

const NoSSRJoyride = dynamic(() => import("react-joyride"), { ssr: false });

const Dashboard: NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactElement;
} = ({ spaces }) => {
  useEffect(() => {
    const message = getCookie("message");
    const localMessage = localStorage.getItem("message");

    if (message || localMessage) {
      // 메시지로 이벤트 처리
      pathValidation(message || localMessage!);
      // 쿠키 삭제
      document.cookie =
        "message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    localStorage.removeItem("message");
  }, []);

  const { isAvatarModalOpen } = useModal();

  const {
    run,
    setRunState,
    steps,
    handleJoyrideCallback,
    showTemporaryComponent,
  } = useTourTooltip(DASHBOARD_TOUR_TOOLTIP);

  return (
    <>
      <CustomHead title={"Dashboard"} description={"Dashboard 페이지입니다."} />
      <StSwiperWrapper>
        <Swiper
          className="dashboard-banner"
          modules={[Pagination, Mousewheel, Autoplay]}
          spaceBetween={50}
          pagination={{ clickable: true }}
          grabCursor={true}
          mousewheel={true}
          autoplay={{ delay: 5000 }}
        >
          {spaces.map((space) => (
            <SwiperSlide key={space.id}>
              <Banner
                bgSrc={space.bgSrc}
                description={space.description}
                title={space.title}
                space={space}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </StSwiperWrapper>
      {isAvatarModalOpen && (
        <ModalPortal>
          <AvatarModalContainer />
        </ModalPortal>
      )}
      <Spaces
        setRunState={setRunState}
        showTemporaryComponent={showTemporaryComponent}
      />
      <NoSSRJoyride
        continuous
        run={run}
        steps={steps}
        callback={handleJoyrideCallback}
        showProgress
        showSkipButton
        disableOverlayClose
        hideCloseButton
        styles={{
          options: { zIndex: 10000 },
          tooltipContent: { fontSize: "1.5rem", fontWeight: "bold" },
          buttonNext: {
            backgroundColor: "#2563eb",
            fontSize: "1.3rem",
            borderRadius: "5px",
          },
          buttonBack: {
            color: "#2563eb",
          },
        }}
      />
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

  if (!data || error) return { props: {} };

  const bgs = [BannerBg1, BannerBg2, BannerBg3, BannerBg4];

  const spaces = data.map((space, index) => ({
    ...space,
    bgSrc: bgs[index],
  }));

  return { props: { spaces } };
};

const StSwiperWrapper = styled.div`
  max-width: 128rem;
  min-width: 128rem;
  margin: 0 auto;
  position: relative;

  .swiper {
    height: fit-content;
    width: 100%;
    padding: ${(props) =>
      `${props.theme.spacing[24]} ${props.theme.spacing[32]}`};
    padding-bottom: ${(props) => props.theme.spacing[36]};
  }
  .swiper-pagination {
    span {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

export default Dashboard;
