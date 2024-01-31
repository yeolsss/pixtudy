import CustomHead from "@/SEO/CustomHead";
import BannerBg1 from "@/assets/banner/banner1.png";
import BannerBg2 from "@/assets/banner/banner2.png";
import BannerBg3 from "@/assets/banner/banner3.png";
import BannerBg4 from "@/assets/banner/banner4.png";
import Layout from "@/components/layout/Layout";
import AvatarModalContainer from "@/components/layout/banner/AvatarModalContainer";
import Banner from "@/components/layout/banner/Banner";
import ModalPortal from "@/components/modal/ModalPortal";
import Spaces from "@/components/spaces/Spaces";
import useModal from "@/hooks/modal/useModal";
import useTourTooltip from "@/hooks/tooltip/useTourTooltip";
import { Database, Tables } from "@/supabase/types/supabase";
import { getCookie } from "@/utils/middlewareUtils";
import { pathValidation } from "@/utils/middlewareValidate";
import { DASHBOARD_TOUR_TOOLTIP } from "@/utils/tooltipUtils";
import { createClient } from "@supabase/supabase-js";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { StaticImageData } from "next/image";
import { ReactElement, useEffect } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  spaces: (Tables<"spaces"> & { bgSrc: StaticImageData })[];
}

const NoSSRJoyride = dynamic(() => import("react-joyride"), { ssr: false });

const Dashboard: NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactElement;
} = ({ spaces }) => {
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
          spaceBetween={"24"}
          slidesPerView={2.8}
          modules={[Pagination, Mousewheel]}
          pagination={{ clickable: true }}
          grabCursor={true}
          mousewheel={true}
          className="dashboard-banner"
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
        {!run && <StBlurDiv />}
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

export const getServerSideProps = async () => {
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
    height: 29.7rem;
    width: 100%;
    padding: ${(props) =>
      `${props.theme.spacing[24]} ${props.theme.spacing[40]}`};
  }
`;

const StBlurDiv = styled.div`
  width: 31.3rem;
  height: 28.6rem;
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
  right: 0;
  position: absolute;
`;

export default Dashboard;
