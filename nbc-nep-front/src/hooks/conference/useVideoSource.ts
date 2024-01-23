import { MAX_SHARE_SCREEN_SIZE } from "@/components/video-conference/constants/constants";
import { ShareType } from "@/components/video-conference/types/ScreenShare.types";
import conferenceStore from "@/zustand/conferenceStore";

export default function useVideoSource() {
  const {
    producers,
    consumers,
    addConsumer,
    addProducer,
    removeConsumer,
    removeProducer,
  } = conferenceStore();

  const isCanShare =
    producers.filter((producer) => producer.appData.shareType === "screen")
      .length < MAX_SHARE_SCREEN_SIZE;

  const filterConsumersById = (playerId: string) =>
    consumers.filter((consumer) => consumer.appData.playerId === playerId);

  const findProducerByShareType = (type: ShareType) =>
    producers.find((producer) => producer.appData.shareType === type);

  const filterProducersByShareType = (type: ShareType) =>
    producers.filter((producer) => producer.appData.shareType === type);

  return {
    producers,
    consumers,
    addProducer,
    removeProducer,
    addConsumer,
    removeConsumer,
    isCanShare,
    filterConsumersById,
    findProducerByShareType,
    filterProducersByShareType,
  };
}
