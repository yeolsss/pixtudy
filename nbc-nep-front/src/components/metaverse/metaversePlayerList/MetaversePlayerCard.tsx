import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import {
  StBadgeWrapper,
  StMetaversePlayerCard,
} from "@/components/metaverse/styles/metaverse.styles";
import { getPlayerStateValue } from "@/components/video-conference/libs/dock";
import { HandleOpenDmContainerPrams, Player } from "@/types/metaverse.types";
import useAuthStore from "@/zustand/authStore";
import { StBadge } from "@/components/common/badge/badge.styles";

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
