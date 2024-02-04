import StBadge from "@/components/common/badge/Badge";
import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import { HandleOpenDmContainerPrams } from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import { getPlayerStateValue } from "@/components/video-conference/DockPlayer";
import useAuthStore from "@/zustand/authStore";
import styled from "styled-components";
import { Player } from "@/types/metaverse.types";

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
  const { id } = useAuthStore.use.user();

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
        <StBadgeWrapper>
          <MetaAvatar
            spaceAvatar={player?.character}
            width={32}
            height={32}
            y={42}
            x={-1}
          />

          <StBadge
            color={getPlayerStateValue(player?.state || 0)}
            x={20}
            y={20}
          />
        </StBadgeWrapper>
        <span>{otherUserName}</span>
      </div>
    </StMetaversePlayerCard>
  );
}

const StMetaversePlayerCard = styled.div`
  display: flex;
  flex-direction: row;
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
    white-space: nowrap;
  }
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
`;

const StBadgeWrapper = styled.div`
  position: relative;
`;
