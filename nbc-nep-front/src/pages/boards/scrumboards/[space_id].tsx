import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import ScrumBoard from "@/components/scrumboard/detail/ScrumBoard";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { getSpaceUsers } from "@/api/scrumBoard/scrumBoard";
import { Space_members } from "@/supabase/types/supabase.tables.type";
import useSpaceMember from "@/zustand/useSpaceMember";

interface Props {
  spaceMemberProp: Space_members[];
}

const ScrumBoardPage: NextPageWithLayout<Props> = ({ spaceMemberProp }) => {
  const { spaceMember, setSpaceMember } = useSpaceMember();

  useEffect(() => {
    setSpaceMember(spaceMemberProp);
  }, []);
  return (
    <>
      <CustomHead title="scrumboard" description="스크럼 보드 페이지입니다." />
      <ScrumBoard />
    </>
  );
};

ScrumBoardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const spaceId = context.query.space_id;

  const spaceMember = await getSpaceUsers(spaceId as string);
  return {
    props: { spaceMemberProp: spaceMember },
  };
}
export default ScrumBoardPage;
