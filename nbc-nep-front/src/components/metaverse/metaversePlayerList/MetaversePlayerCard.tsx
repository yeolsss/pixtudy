import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import { HandleOpenDmContainerPrams } from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import { Player } from "@/components/metaverse/types/metaverse";
import useAuth from "@/zustand/authStore";
import styled from "styled-components";

interface Props {
  player: Player;
  handleOpenDmContainer: ({
    otherUserId,
    otherUserName,
    otherUserAvatar,
  }: HandleOpenDmContainerPrams) => void;
}

export default function MetaversePlayerCard({
  player,
  handleOpenDmContainer,
}: Props) {
  const {
    user: { id },
  } = useAuth();

  const {
    playerId: otherUserId,
    nickname: otherUserName,
    character: otherUserAvatar,
  } = player;

  const onClickDMMessageHandler = () => {
    if (otherUserId !== id) {
      handleOpenDmContainer({
        otherUserId,
        otherUserName,
        otherUserAvatar,
      });
      return;
    }
  };

  return (
    <StMetaversePlayerCard onClick={onClickDMMessageHandler}>
      <div>
        <MetaAvatar spaceAvatar={otherUserAvatar} />
        <span>{otherUserName}</span>
      </div>
    </StMetaversePlayerCard>
  );
}

const StMetaversePlayerCard = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  > div > span {
    font-size: 14px;
  }
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
`;
