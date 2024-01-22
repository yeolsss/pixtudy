import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";
import dynamic from "next/dynamic";
import LoadingProgress from "@/components/common/loading/LoadingProgress";
import CustomHead from "@/SEO/CustomHead";
import React from "react";

const GameComponentWithNoSSR = dynamic(
  () => import("@/components/metaverse/MetaverseComponent"),
  {
    ssr: false,
    loading: () => <LoadingProgress />,
  }
);

export default function Metaverse() {
  return (
    <MetaversePlayerProvider>
      <CustomHead
        title={"Metaverse"}
        description={"메타버스 공간 페이지입니다."}
      />
      <GameComponentWithNoSSR />
    </MetaversePlayerProvider>
  );
}
