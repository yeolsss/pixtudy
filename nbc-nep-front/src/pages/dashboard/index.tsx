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
import { theme } from "@/styles/Globalstyle";
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
  spaces: (Tables<"spaces"> & { users: string[]; bgSrc: StaticImageData })[];
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
          spaceBetween={theme.unit[24]}
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
                users={space.users}
                description={space.description}
                space={space}
                title={space.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <StBlurDiv />
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

  const { data: spaceMembers, error: spacesMembersError } = await supabase
    .from("space_members")
    .select("space_id, users(id)")
    .in("space_id", spaceIds);

  if (!spaceMembers || spacesMembersError) return { props: {} };

  const bgs = [BannerBg1, BannerBg2, BannerBg3, BannerBg4];

  const spaces = data.map((space, index) => ({
    ...space,
    users: [] as string[],
    bgSrc: bgs[index],
  }));

  spaceMembers?.forEach(({ space_id, users }) => {
    const space = spaces.find((space) => space.id === space_id);
    if (!users) return;

    space!.users = [...space!.users, users.id];
  });

  return { props: { spaces } };
};

const StSwiperWrapper = styled.div`
  max-width: 1280px;
  min-width: 1280px;
  margin: 0 auto;
  position: relative;

  .swiper {
    height: 297px;
    width: 100%;
    padding: ${(props) =>
      `${props.theme.spacing[24]} ${props.theme.spacing[40]}`};
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
