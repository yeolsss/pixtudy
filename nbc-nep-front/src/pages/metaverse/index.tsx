import dynamic from "next/dynamic";

const GameComponentWithNoSSR = dynamic(
  () => import("@/components/game/GameComponent"),
  {
    ssr: false,
  }
);
export default function Metaverse() {
  return <GameComponentWithNoSSR />;
}
