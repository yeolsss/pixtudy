import { MAX_SHARE_SCREEN_SIZE } from "@/components/video-conference/constants/constants";
import {
  Consumer,
  Producer,
} from "@/components/video-conference/types/ScreenShare.types";
import {
  addConsumer as addConsumerRedux,
  addProducer as addProducerRedux,
  removeConsumer as removeConsumerRedux,
  removeProducer as removeProducerRedux,
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

  function removeProducer(producerId: string) {
    dispatch(removeProducerRedux(producerId));
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
    removeProducer,
    addConsumer,
    removeConsumer,
    isCanShare,
  };
}
