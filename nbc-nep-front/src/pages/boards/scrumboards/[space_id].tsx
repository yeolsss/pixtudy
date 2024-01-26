import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import ScrumBoard from "@/components/scrumboard/detail/ScrumBoard";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { getSpaceUsers } from "@/api/scrumBoard/scrumBoard";
import { Space_members } from "@/supabase/types/supabase.tables.type";
import useSpaceMemberSearch from "@/zustand/spaceMemberStore";

interface Props {
  spaceMembers: Space_members[];
}

const ScrumBoardPage: NextPageWithLayout<Props> = ({ spaceMembers }) => {
  const { setSpaceMembers } = useSpaceMemberSearch();

  useEffect(() => {
    setSpaceMembers(spaceMembers);
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

  const spaceMembers = await getSpaceUsers(spaceId as string);

  return {
    props: { spaceMembers },
  };
}
export default ScrumBoardPage;
