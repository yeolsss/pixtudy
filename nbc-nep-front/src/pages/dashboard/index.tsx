import Layout from "@/components/layout/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

export default function Dashboard(): NextPageWithLayout {
  const Page: NextPageWithLayout = () => <div>dashboard</div>;
  Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };
  return Page;
}
