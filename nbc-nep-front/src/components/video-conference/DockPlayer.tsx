import { Player, PlayerState } from "@/components/metaverse/types/metaverse";
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
          x={4}
        />
        <StBadge color={getPlayerStateValue(0)} x={30} y={30} />
      </BadgeWrapper>
      <StDockPlayerInfoWrapper>
        <StDockPlayerNickname>{player?.nickname}</StDockPlayerNickname>
        <StDockPlayerState>
          {getPlayerStateToText(player?.state)}
        </StDockPlayerState>
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

const getPlayerStateToText = (playerState?: PlayerState) => {
  if (playerState == undefined) {
    return "온라인";
  }
  return ["온라인", "식사중", "자리비움", "방해금지"][playerState];
};

const StDockPlayerWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};

  color: ${(props) => props.theme.color.text.interactive.inverse};
  font-family: var(--sub-font);

  max-width: 200px;
`;

const StDockPlayerNickname = styled.p`
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
`;

const StDockPlayerState = styled.p`
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  transition: all 0.8s ease-in;
`;

const StDockPlayerInfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[6]};
  margin-left: 40px;
  padding-top: ${(props) => props.theme.spacing[4]};

  &:hover {
    background-color: ${(props) => props.theme.color.bg["success-bold"]};
    background-blend-mode: ${StDockPlayerState} {
      transform: translateY(
        calc(${(props) => props.theme.spacing[12]} * -1)
      ); // Adjust the value as needed
    }
  }
`;
