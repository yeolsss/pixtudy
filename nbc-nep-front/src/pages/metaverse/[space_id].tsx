import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";
import dynamic from "next/dynamic";
import LoadingProgress from "@/components/common/loading/LoadingProgress";

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
      <GameComponentWithNoSSR />
    </MetaversePlayerProvider>
  );
}
