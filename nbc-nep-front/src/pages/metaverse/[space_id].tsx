import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";
import dynamic from "next/dynamic";

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

// Dashboard.getLayout = function getLayout(page: ReactElement) {
//   return page;
// };
