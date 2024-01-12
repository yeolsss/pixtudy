import { usePlayerContext } from "@/context/PlayerProvider";
import styled from "styled-components";

export default function MetaversePlayerList() {
  const { playerList } = usePlayerContext();
  return (
    <StMetaversePlayerListWrapper>
      {playerList?.map((player) => (
        <div key={player.playerId}>
          <div>{player.playerId}</div>
        </div>
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
  overflow: scroll;
  z-index: 100;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;
