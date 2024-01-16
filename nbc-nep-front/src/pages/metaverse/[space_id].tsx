import dynamic from "next/dynamic";
import { ReactElement } from "react";
import Dashboard from "../dashboard";
import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";

const GameComponentWithNoSSR = dynamic(
  () => import("@/components/metaverse/MetaverseComponent"),
  {
    ssr: false,
  }
);

export default function Metaverse() {
  return (
    <MetaversePlayerProvider>
      <GameComponentWithNoSSR />
    </MetaversePlayerProvider>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return page;
};
