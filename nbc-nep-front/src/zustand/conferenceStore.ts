import { filterVideoSourcesByPlayerId } from "@/components/video-conference/libs/util";
import { Consumer, Producer, ShareType } from "@/types/conference.types";
import { create } from "zustand";
import createSelectors from "./config/createSelector";

interface ConferenceState {
  consumers: Consumer[];
  producers: Producer[];
  addConsumer: (consumer: Consumer) => void;
  removeConsumer: (streamId: string) => void;
  addProducer: (producer: Producer) => void;
  removeProducer: (producer: Producer) => void;
  findProducerByShareType: (type: ShareType) => Producer | undefined;
  filterConsumersById: (playerId: string) => Consumer[];
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
      return { consumers: updatedConsumers };
    }),
  addProducer: (producer: Producer) =>
    set((state) => ({ producers: [...state.producers, producer] })),

  removeProducer: (prod: Producer) =>
    set((state) => {
      const { id: producerId, track } = prod;

      try {
        if (!track) {
          throw new Error("no track", { cause: "no track" });
        }

        track.enabled = false;

        prod.pause();
        prod.close();

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
    const { producers } = get();
    return producers.find(
      (producer) => producer.appData.shareType === shareType
    );
  },

  isAlreadyConsume: (remoteProducerId: string) => {
    const { consumers } = get();
    return consumers.some((consumer) => consumer.id === remoteProducerId);
  },
  filterConsumersById: (playerId: string) => {
    const { consumers } = get();
    return filterVideoSourcesByPlayerId(consumers, playerId) as Consumer[];
  },
}));

const useConferenceStore = createSelectors(conferenceStore);

export default useConferenceStore;
