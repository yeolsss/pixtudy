import dynamic from "next/dynamic";

const GameComponentWithNoSSR = dynamic(
  () => import("@/components/metaverse/MetaverseComponent"),
  {
    ssr: false,
  }
);
export default function Metaverse() {
  return <GameComponentWithNoSSR />;
}
