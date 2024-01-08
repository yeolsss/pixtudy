import Layout from "@/components/layout/Layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

export default function Home(): NextPageWithLayout {
  const Page: NextPageWithLayout = () => <div>Home</div>;
  Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };
  return Page;
}
