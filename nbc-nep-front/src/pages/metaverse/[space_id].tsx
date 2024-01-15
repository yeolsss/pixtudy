import dynamic from "next/dynamic";
import { ReactElement } from "react";
import Dashboard from "../dashboard";

const GameComponentWithNoSSR = dynamic(
  () => import("@/components/metaverse/MetaverseComponent"),
  {
    ssr: false,
  }
);

export default function Metaverse() {
  return <GameComponentWithNoSSR />;
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return page;
};
