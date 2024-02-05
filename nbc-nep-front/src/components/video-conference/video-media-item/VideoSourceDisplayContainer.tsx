import { isEmpty } from 'lodash'

import { splitVideoSource } from '@/components/video-conference/libs/util'
import useLayout from '@/hooks/conference/useLayout'
import { Player } from '@/types/metaverse.types'
import useConferenceStore from '@/zustand/conferenceStore'

import { Producer } from '../../../types/conference.types'
import ShareScreenContainer from '../ShareScreenContainer'
import { StContainer } from '../styles/videoMedia.styles'

import OtherPlayerShareMediaItem from './OtherPlayerShareMediaItem'
import PlayerMediaDisplay from './PlayerMediaDisplay'
import PlayerProducerContainer from './PlayerProducerContainer'

interface Props {
  playerList: Player[]
  currentPlayer: Player
}

export default function VideoSourceDisplayContainer({
  playerList,
  currentPlayer
}: Props) {
  const { isOpen } = useLayout()
  const producers = useConferenceStore.use.producers()

  const [camAndAudioProducers, screenProducers] = splitVideoSource(producers)
  const isEmptyScreenProducers = isEmpty(screenProducers)

  return (
    <StContainer>
      <PlayerMediaDisplay
        camAndAudioVideoSources={camAndAudioProducers}
        player={currentPlayer}
        isCurrentPlayer
      />
      {!isEmptyScreenProducers && (
        <PlayerProducerContainer
          nickname={currentPlayer?.nickname || ''}
          producers={screenProducers as Producer[]}
        />
      )}
      {playerList.map((player) => (
        <OtherPlayerShareMediaItem
          player={player}
          currentPlayerId={currentPlayer?.playerId}
          key={player.playerId}
        />
      ))}
      {isOpen && <ShareScreenContainer />}
    </StContainer>
  )
}

