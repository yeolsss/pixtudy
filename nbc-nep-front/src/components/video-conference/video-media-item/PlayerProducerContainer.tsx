import {
  EffectCards,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useSocket from "@/components/video-conference/hooks/useSocket";
import useVideoSource from "@/hooks/conference/useVideoSource";
import useAuthStore from "@/zustand/authStore";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Producer } from "../../../types/conference.types";
import ShareMediaItem from "../ShareMediaItem";
import {
  StRemoveProducerButton,
  StSwiperVideoWrapper,
} from "../styles/videoMedia.styles";

interface Props {
  producers: Producer[];
  nickname: string;
}

export default function PlayerProducerContainer({
  producers,
  nickname,
}: Props) {
  const { closeProducer } = useSocket();

  const { id: currentPlayerId } = useAuthStore.use.user();

  const { removeProducer } = useVideoSource();

  function handleShareStop(producer: Producer) {
    removeProducer(producer);
    closeProducer(currentPlayerId, producer.appData.streamId);
  }

  return (
    <StSwiperVideoWrapper>
      <Swiper
        effect="cards"
        grabCursor
        mousewheel
        pagination={{
          clickable: true,
        }}
        hashNavigation={{
          watchState: true,
        }}
        modules={[EffectCards, Pagination, Navigation, Mousewheel]}
      >
        {producers.map((producer) => (
          <SwiperSlide key={producer.id}>
            <ShareMediaItem nickname={nickname} videoSource={producer} />
            <StRemoveProducerButton onClick={() => handleShareStop(producer)}>
              x
            </StRemoveProducerButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </StSwiperVideoWrapper>
  );
}
