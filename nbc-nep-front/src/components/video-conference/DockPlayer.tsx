import { Player, PlayerState } from "@/types/metaverse";
import styled from "styled-components";
import StBadge from "../common/badge/Badge";
import BadgeWrapper from "../common/badge/BadgeWrapper";
import MetaAvatar from "../metaverse/avatar/MetaAvatar";

interface Props {
  player?: Player;
}

export default function DockPlayer({ player }: Props) {
  return (
    <StDockPlayerWrapper>
      <BadgeWrapper>
        <MetaAvatar
          spaceAvatar={player?.character}
          width={40}
          height={40}
          y={50}
          x={3}
        />
        <StBadge color={getPlayerStateValue(0)} x="70%" y="80%" />
      </BadgeWrapper>
      <StDockPlayerInfoWrapper>
        <StDockPlayerNickname>{player?.nickname}</StDockPlayerNickname>
        <StDockPlayerState>{player?.playerId}</StDockPlayerState>
      </StDockPlayerInfoWrapper>
    </StDockPlayerWrapper>
  );
}

const getPlayerStateValue = (playerState: PlayerState) => {
  return [
    "var(--state-online)",
    "var(--state-eating)",
    "var(--state-left-seat)",
    "var(--state-disturb",
  ][playerState];
};

const StDockPlayerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};

  color: ${(props) => props.theme.color.text.interactive.inverse};
  font-family: var(--sub-font);
`;

const StDockPlayerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
`;

const StDockPlayerNickname = styled.p`
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
`;

const StDockPlayerState = styled.p`
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
`;
