import { Player } from "@/types/metaverse";
import ShareMediaItem from "../ShareMediaItem";
import { isArrayEmpty, splitVideoSource } from "../lib/util";
import { StShareScreenStackContainer } from "../styles/videoConference.styles";
import { Consumer } from "../types/ScreenShare.types";
import DefaultShareMediaItem from "./DefaultShareMediaItem";
import ShareScreenContainer from "../ShareScreenContainer";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { layoutOpen } from "@/redux/modules/layoutSlice";

interface Props {
  currentPlayerId: string;
  consumers: Consumer[];
  player: Player;
}

export default function OtherPlayerShareMediaItem({
  consumers,
  player,
  currentPlayerId,
}: Props) {
  const dispatch = useAppDispatch();
  const isLayoutOpen = useAppSelector((state) => state.layoutSlice.isOpen);
  const videosContainer = useRef<HTMLDivElement | null>(null);

  if (currentPlayerId === player.playerId) return null;

  const filteredConsumers = consumers.filter(
    (consumer) => consumer.appData.playerId === player.playerId
  );

  const isEmptyConsumers = isArrayEmpty(filteredConsumers);
  const [camAndAudioConsumers, screenConsumers] =
    splitVideoSource(filteredConsumers);

  console.log({
    consumers,
    filteredConsumers,
    camAndAudioConsumers,
    screenConsumers,
  });

  const shareScreenItem = screenConsumers.map((consumer, index) => (
    <ShareMediaItem
      spread={-index * 10}
      key={consumer.id}
      nickname={player.nickname}
      videoSource={consumer}
    />
  ));

  const handleToggleVideosLayout = () => {
    const newShareScreenItem = shareScreenItem.map((item) => (
      <ShareMediaItem
        key={item.key}
        nickname={item.props.nickname}
        videoSource={item.props.videoSource}
      />
    ));
    dispatch(layoutOpen(newShareScreenItem));
  };

  return (
    <>
      {isEmptyConsumers ? (
        <DefaultShareMediaItem
          nickname={player.nickname}
          avatar={player.character}
        />
      ) : (
        <>
          {camAndAudioConsumers.map((consumer) => (
            <ShareMediaItem
              key={consumer.id}
              nickname={player.nickname}
              videoSource={consumer}
            />
          ))}
          <StShareScreenStackContainer
            onClick={handleToggleVideosLayout}
            ref={videosContainer}
          >
            {shareScreenItem}
          </StShareScreenStackContainer>
        </>
      )}
      {isLayoutOpen && <ShareScreenContainer />}
    </>
  );
}
