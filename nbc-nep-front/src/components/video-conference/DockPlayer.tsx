import { useState } from "react";

import { Player } from "@/types/metaverse.types";

import { AnimatePresence } from "framer-motion";
import BadgeWrapper from "../common/badge/BadgeWrapper";
import MetaAvatar from "../metaverse/avatar/MetaAvatar";

import { StBadge } from "../common/badge/badge.styles";
import PlayerStateSelector from "./PlayerStateSelector";
import { getPlayerStateToText, getPlayerStateValue } from "./libs/dock";
import {
  StDockPlayerInfoWrapper,
  StDockPlayerNickname,
  StDockPlayerState,
  StDockPlayerWrapper,
} from "./styles/dockPlayer.styles";

interface Props {
  player: Player;
}

export default function DockPlayer({ player }: Props) {
  const [isPlayerStateSelectionOpen, setPlayerStateSelection] =
    useState<boolean>(false);

  const handleTogglePlayerStateSelector = () => {
    setPlayerStateSelection(!isPlayerStateSelectionOpen);
  };

  return (
    <StDockPlayerWrapper>
      <BadgeWrapper>
        <MetaAvatar
          spaceAvatar={player?.character}
          width={40}
          height={40}
          y={50}
          x={4}
        />
        <StBadge
          color={getPlayerStateValue(player?.state || 0)}
          x={30}
          y={30}
        />
      </BadgeWrapper>
      <StDockPlayerInfoWrapper onClick={handleTogglePlayerStateSelector}>
        <StDockPlayerNickname>{player?.nickname}</StDockPlayerNickname>
        <StDockPlayerState>
          {getPlayerStateToText(player?.state)}
        </StDockPlayerState>
        <AnimatePresence>
          {isPlayerStateSelectionOpen && <PlayerStateSelector />}
        </AnimatePresence>
      </StDockPlayerInfoWrapper>
    </StDockPlayerWrapper>
  );
}
