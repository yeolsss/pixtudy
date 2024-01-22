import Layout from "@/components/layout/Layout";
import Spaces from "@/components/spaces/Spaces";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import CustomHead from "@/SEO/CustomHead";

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

export default Dashboard;
