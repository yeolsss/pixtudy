import Layout from "@/components/layout/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  return <div>dashboard</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
