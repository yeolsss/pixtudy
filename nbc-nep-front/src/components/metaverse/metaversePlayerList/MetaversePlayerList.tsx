import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import styled from "styled-components";
import MetaversePlayerCard from "@/components/metaverse/metaversePlayerList/metaversePlayerCard/MetaversePlayerCard";

export default function MetaversePlayerList() {
  const { playerList } = usePlayerContext();
  return (
    <StMetaversePlayerListWrapper>
      {playerList?.map((player) => (
        <MetaversePlayerCard key={player.playerId} player={player} />
      ))}
    </StMetaversePlayerListWrapper>
  );
}

const StMetaversePlayerListWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 150px;
  height: 300px;
  padding: 10px;
  overflow: scroll;
  z-index: 100;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;
