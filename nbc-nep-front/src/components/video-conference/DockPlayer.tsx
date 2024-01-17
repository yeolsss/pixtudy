import { Player } from "@/types/metaverse";
import styled from "styled-components";
import MetaAvatar from "../metaverse/avatar/MetaAvatar";

interface Props {
  player?: Player;
}

export default function DockPlayer({ player }: Props) {
  return (
    <StDockPlayerWrapper>
      <MetaAvatar
        spaceAvatar={player?.character}
        width={40}
        height={40}
        y={50}
        x={3}
      />
      <div>
        <StDockPlayerNickname>{player?.nickname}</StDockPlayerNickname>
        <StDockPlayerState>{player?.playerId}</StDockPlayerState>
      </div>
    </StDockPlayerWrapper>
  );
}

const StDockPlayerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};

  color: ${(props) => props.theme.color.text.interactive.inverse};
  font-family: var(--sub-font);
`;

const StDockPlayerNickname = styled.p`
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
`;

const StDockPlayerState = styled.p`
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
`;
