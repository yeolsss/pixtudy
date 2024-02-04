import useVideoSource from '@/hooks/conference/useVideoSource'
import useAuthStore from '@/zustand/authStore'
import styled from 'styled-components'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectCards, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ShareMediaItem from '../ShareMediaItem'
import { StVideoWrapper } from '../styles/videoConference.styles'
import { Producer } from '../../../types/conference.types'
import useSocket from '@/components/video-conference/hooks/useSocket'

interface Props {
  producers: Producer[]
  nickname: string
}

export default function PlayerProducerContainer({
  producers,
  nickname
}: Props) {
  const { closeProducer } = useSocket()

  const { id: currentPlayerId } = useAuthStore.use.user()

  const { removeProducer } = useVideoSource()

  function handleShareStop(producer: Producer) {
    removeProducer(producer)
    closeProducer(currentPlayerId, producer.appData.streamId)
  }

  return (
    <StSwiperVideoWrapper>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        mousewheel={true}
        pagination={{
          clickable: true
        }}
        hashNavigation={{
          watchState: true
        }}
        modules={[EffectCards, Pagination, Navigation, Mousewheel]}
      >
        {producers.map((producer, index) => (
          <SwiperSlide key={producer.id}>
            <ShareMediaItem nickname={nickname} videoSource={producer} />
            <StRemoveProducerButton onClick={() => handleShareStop(producer)}>
              x
            </StRemoveProducerButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </StSwiperVideoWrapper>
  )
}

const StSwiperVideoWrapper = styled(StVideoWrapper)`
  .swiper-pagination {
    background-color: black;
    bottom: 0;
    border-bottom-left-radius: ${(props) => props.theme.border.radius.circle};
    border-bottom-right-radius: ${(props) => props.theme.border.radius.circle};
  }
  .swiper-pagination-bullet {
    background-color: ${(props) => props.theme.color.bg.secondary};
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: var(--color-brand-500);
  }
`

const StRemoveProducerButton = styled.button`
  background-color: ${(props) => props.theme.color.bg['danger-bold']};
  width: 20px;
  height: 20px;

  outline: none;
  padding: 0;
  margin: 0;

  position: absolute;

  right: ${(props) => props.theme.spacing[4]};
  top: ${(props) => props.theme.spacing[4]};
`
