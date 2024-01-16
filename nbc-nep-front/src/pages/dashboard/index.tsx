import Layout from "@/components/layout/Layout";
import Spaces from "@/components/spaces/Spaces";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  return <Spaces />;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
