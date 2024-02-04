import useAnimated from '@/hooks/useAnimated'
import { Player, PlayerState } from '@/types/metaverse.types'
import { useState } from 'react'
import styled from 'styled-components'
import StBadge from '../common/badge/Badge'
import BadgeWrapper from '../common/badge/BadgeWrapper'
import MetaAvatar from '../metaverse/avatar/MetaAvatar'
import PlayerStateSelector from './PlayerStateSelector'

interface Props {
  player?: Player
}

export default function DockPlayer({ player }: Props) {
  const [isPlayerStateSelectionOpen, setPlayerStateSelection] =
    useState<boolean>(false)

  const handleTogglePlayerStateSelector = () => {
    setPlayerStateSelection(!isPlayerStateSelectionOpen)
  }

  const [shouldRender, handleAnimatedEnd] = useAnimated(
    isPlayerStateSelectionOpen
  )
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
        {shouldRender && (
          <PlayerStateSelector
            isRender={isPlayerStateSelectionOpen}
            handleAnimatedEnd={handleAnimatedEnd}
          />
        )}
      </StDockPlayerInfoWrapper>
    </StDockPlayerWrapper>
  )
}

export const getPlayerStateValue = (playerState: PlayerState) => {
  return [
    'var(--state-online)',
    'var(--state-eating)',
    'var(--state-left-seat)',
    'var(--state-disturb)'
  ][playerState]
}

export const getPlayerStateToText = (playerState?: PlayerState) => {
  if (playerState == undefined) {
    return '온라인'
  }
  return ['온라인', '식사중', '자리비움', '방해금지'][playerState]
}

const StDockPlayerWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};

  color: ${(props) => props.theme.color.text.interactive.inverse};
  font-family: var(--sub-font);

  max-width: 200px;
`

const StDockPlayerNickname = styled.p`
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
`

const StDockPlayerState = styled.p`
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  transition: all 0.8s ease-in;
`

const StDockPlayerInfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[6]};
  margin-left: 40px;
  padding-top: ${(props) => props.theme.spacing[4]};

  position: relative;

  cursor: pointer;
`
