import { Player } from "@/types/metaverse";

interface Props {
  player: Player;
}
export default function MetaversePlayerCard({ player }: Props) {
  return (
    <div key={player.playerId}>
      <div>{player.playerId}</div>
    </div>
  );
}
