import { isEmpty } from 'lodash'

import { splitVideoSource } from '@/components/video-conference/libs/util'
import useLayout from '@/hooks/conference/useLayout'
import { Player } from '@/types/metaverse.types'
import useConferenceStore from '@/zustand/conferenceStore'

import ShareMediaItem from '../ShareMediaItem'
import {
  StStackItem,
  StVideoWrapper
} from '../styles/videoConference.styles'
import { SPACING } from '../constants'

import PlayerMediaDisplay from './PlayerMediaDisplay'

interface Props {
  currentPlayerId: string
  player: Player
}

export default function OtherPlayerShareMediaItem({
  player,
  currentPlayerId
}: Props) {
  const { handleOpenLayout } = useLayout()

  if (currentPlayerId === player.playerId) {return null}
  const filterConsumerById = useConferenceStore.use.filterConsumersById()
  const filteredConsumers = filterConsumerById(player.playerId)

  const [camAndAudioConsumers, screenConsumers] =
    splitVideoSource(filteredConsumers)

  const isEmptyScreenConsumers = isEmpty(screenConsumers)

  const handleToggleVideosLayout = () => {
    handleOpenLayout({
      playerId: player.playerId,
      playerNickName: player.nickname
    })
  }

  return (
    <>
      <PlayerMediaDisplay
        camAndAudioVideoSources={camAndAudioConsumers}
        player={player}
        isCurrentPlayer={false}
      />
      {!isEmptyScreenConsumers && (
        <StVideoWrapper onClick={handleToggleVideosLayout}>
          {screenConsumers.map((consumer, index) => (
            <StStackItem
              key={consumer.id}
              $isSpread={false}
              $x={index * SPACING}
              $y={index * SPACING}
            >
              <ShareMediaItem
                nickname={player.nickname}
                videoSource={consumer}
              />
            </StStackItem>
          ))}
        </StVideoWrapper>
      )}
    </>
  )
}
