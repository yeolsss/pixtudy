import { Player } from "@/types/metaverse";
import styled from "styled-components";

interface Props {
  player: Player;
}
export default function MetaversePlayerCard({ player }: Props) {
  return (
    <StMetaversePlayerCard key={player.playerId}>
      <div>{player.playerId}</div>
    </StMetaversePlayerCard>
  );
}

const StMetaversePlayerCard = styled.div`
  height: 30px;
`;
