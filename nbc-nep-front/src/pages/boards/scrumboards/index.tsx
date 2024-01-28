import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import ScrumBoardList from "@/components/scrumboard/ScrumBoardList";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

const ScrumBoards: NextPageWithLayout = () => {
  return (
    <>
      <CustomHead title="scrumboards" description="스크럼 보드 모아보기" />
      <ScrumBoardList />
    </>
  );
};

ScrumBoards.getLayout = function getLayout(page: ReactElement) {
  return <Layout> {page} </Layout>;
};

export const getServerSideProps = async () => {
  return { props: {} };
};

export default ScrumBoards;
