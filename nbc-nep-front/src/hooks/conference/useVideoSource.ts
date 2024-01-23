/* import { MAX_SHARE_SCREEN_SIZE } from "@/components/video-conference/constants/constants";
import {
  Consumer,
  Producer,
} from "@/components/video-conference/types/ScreenShare.types";
import {
  addConsumer as addConsumerRedux,
  addProducer as addProducerRedux,
  removeConsumer as removeConsumerRedux,
  removeProducer as removeProducerRefactorRedux,
} from "../../redux/modules/conferenceSlice";
import { useAppDispatch, useAppSelector } from "../useReduxTK";

export default function useVideoSource() {
  const { producers, consumers } = useAppSelector(
    (state) => state.conferenceSlice
  );
  const dispatch = useAppDispatch();

  function addProducer(producer: Producer) {
    dispatch(addProducerRedux(producer));
  }

  function removeProducer(producer: Producer) {
    dispatch(removeProducerRefactorRedux(producer));
  }

  function addConsumer(consumer: Consumer) {
    dispatch(addConsumerRedux(consumer));
  }

  function removeConsumer(streamId: string) {
    dispatch(removeConsumerRedux(streamId));
  }

  const isCanShare =
    producers.filter((producer) => producer.appData.shareType === "screen")
      .length < MAX_SHARE_SCREEN_SIZE;

  return {
    producers,
    consumers,
    addProducer,
    addConsumer,
    removeConsumer,
    removeProducer,
    isCanShare,
  };
} */

import { MAX_SHARE_SCREEN_SIZE } from "@/components/video-conference/constants/constants";
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

  const filterConsumerById = (playerId: string) =>
    consumers.filter((consumer) => consumer.appData.playerId === playerId);

  return {
    producers,
    consumers,
    addProducer,
    removeProducer,
    addConsumer,
    removeConsumer,
    isCanShare,
    filterConsumerById,
  };
}
