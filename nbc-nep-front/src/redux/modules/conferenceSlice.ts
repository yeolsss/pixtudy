import {
  Consumer,
  Producer,
} from "@/components/video-conference/types/ScreenShare.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ConferenceState {
  consumers: Consumer[];
  producers: Producer[];
}
const initialState: ConferenceState = {
  consumers: [],
  producers: [],
};

const conferenceSlice = createSlice({
  name: "conference",
  initialState,
  reducers: {
    addProducer: (state, action: PayloadAction<Producer>) => {
      const producer = action.payload;
      state.producers.push(producer);
    },
    removeProducer: (state, action: PayloadAction<string>) => {
      const producerId = action.payload;

      state.producers = state.producers.filter((producer) => {
        try {
          if (producer.id === producerId) {
            producer.close();
          }
        } catch (error) {
          console.error("producer close failed", error);
        }

        return !producer.closed && producer.id !== producerId;
      });
    },
    addConsumer: (state, action: PayloadAction<Consumer>) => {
      const consumer = action.payload;
      state.consumers.push(consumer);
    },
    removeConsumer: (state, action: PayloadAction<string>) => {
      const streamId = action.payload;

      state.consumers = state.consumers.filter((consumer) => {
        try {
          if (consumer.appData.streamId === streamId) {
            consumer.close();
          }
        } catch (error) {
          console.error("consumer close failed", error);
        }
        return !consumer.closed && consumer.id !== streamId;
      });
    },
  },
});

export const { addConsumer, addProducer, removeConsumer, removeProducer } =
  conferenceSlice.actions;

export default conferenceSlice.reducer;
