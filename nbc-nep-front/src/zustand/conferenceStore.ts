import {
  Consumer,
  Producer,
  ShareType,
} from "@/components/video-conference/types/ScreenShare.types";
import { create } from "zustand";
import createSelectors from "./createSelector";

interface ConferenceState {
  consumers: Consumer[];
  producers: Producer[];
  addConsumer: (consumer: Consumer) => void;
  removeConsumer: (streamId: string) => void;
  addProducer: (producer: Producer) => void;
  removeProducer: (producer: Producer) => void;
  findProducerByShareType: (type: ShareType) => Producer | undefined;
  filterProducersByShareType: (type: ShareType) => Producer[];
  isAlreadyConsume: (removeProducerId: string) => boolean;
}

const conferenceStore = create<ConferenceState>()((set, get) => ({
  consumers: [],
  producers: [],
  addConsumer: (consumer: Consumer) =>
    set((state) => ({ consumers: [...state.consumers, consumer] })),
  removeConsumer: (streamId: string) =>
    set((state) => {
      const updatedConsumers = state.consumers.filter((consumer) => {
        if (consumer.appData.streamId === streamId) {
          consumer.close();
          return false;
        }
        return true;
      });
      console.log(
        "streamId is :",
        streamId,
        "prev consumers: ",
        state.consumers,
        "updated consumers: ",
        updatedConsumers
      );

      return { consumers: updatedConsumers };
    }),
  addProducer: (producer: Producer) =>
    set((state) => ({ producers: [...state.producers, producer] })),

  removeProducer: (producer: Producer) =>
    set((state) => {
      const producerId = producer.id;

      try {
        const track = producer.track;

        if (!track) {
          throw new Error("no track", { cause: "no track" });
        }

        track.enabled = false;

        producer.pause();
        producer.close();

        const updatedProducers = state.producers.filter(
          (producer) => producer.id !== producerId
        );

        return { producers: updatedProducers };
      } catch (error) {
        console.error("An error occurred while removing producer ", error);
      }

      return { producers: state.producers };
    }),

  findProducerByShareType: (shareType: ShareType) => {
    const producers = get().producers;
    return producers.find(
      (producer) => producer.appData.shareType === shareType
    );
  },

  filterProducersByShareType: (shareType: ShareType) => {
    const producers = get().producers;
    return producers.filter(
      (producer) => producer.appData.shareType === shareType
    );
  },

  isAlreadyConsume: (remoteProducerId: string) => {
    const consumers = get().consumers;
    return consumers.some((consumer) => consumer.id === remoteProducerId);
  },
}));

const useConferenceStore = createSelectors(conferenceStore);

export default useConferenceStore;
