import { useAppSelector } from "@/hooks/useReduxTK";
import { Player } from "@/types/metaverse";
import styled from "styled-components";

interface Props {
  player: Player;
  handleOpenDmContainer: (id: string) => void;
}

export default function MetaversePlayerCard({
  player,
  handleOpenDmContainer,
}: Props) {
  const { id } = useAppSelector((state) => state.authSlice.user);

  const { playerId, nickname } = player;

  const onClickDMMessageHandler = () => {
    if (playerId !== id) {
      handleOpenDmContainer(playerId);
      return;
    }
    console.log("자기 자신에게는 DM을 보낼 수 없습니다.");
  };

  return (
    <StMetaversePlayerCard onClick={onClickDMMessageHandler}>
      <div>
        <span>{nickname}</span>
      </div>
    </StMetaversePlayerCard>
  );
}

const StMetaversePlayerCard = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  cursor: pointer;
  > div > span {
    font-size: 14px;
  }
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
`;
