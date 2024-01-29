import Layout from "@/components/layout/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

const Ideaboard: NextPageWithLayout = () => {
  return <div>아이디어보드</div>;
};

Ideaboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Ideaboard;
