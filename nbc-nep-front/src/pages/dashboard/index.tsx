import CustomHead from "@/SEO/CustomHead";
import Layout from "@/components/layout/Layout";
import Spaces from "@/components/spaces/Spaces";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <CustomHead title={"Dashboard"} description={"Dashboard 페이지입니다."} />
      <Spaces />
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async () => {
  return { props: {} };
};

export default Dashboard;
