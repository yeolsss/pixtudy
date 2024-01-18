import React from "react";
import { useAppDispatch, useAppSelector } from "../useReduxTK";
import { splitVideoSource } from "@/components/video-conference/lib/util";
import { useEffect, useState } from "react";
import { LayoutConsumersType } from "@/components/video-conference/types/ScreenShare.types";
import { layoutClose } from "@/redux/modules/layoutSlice";

export default function useLayout() {
  const dispatch = useAppDispatch();
  const consumers = useAppSelector((state) => state.conferenceSlice.consumers);
  const layoutInfo = useAppSelector((state) => state.layoutSlice);
  const [videos, setVideos] = useState<LayoutConsumersType[]>([]);

  useEffect(() => {
    const filteredConsumers = consumers.filter(
      (consumer) => consumer.appData.playerId === layoutInfo.layoutPlayerId
    );
    const [_, screenConsumers] = splitVideoSource(filteredConsumers);

    const newConsumers = screenConsumers.map((consumer) => {
      const prevVideo = videos.find(
        (video) => video.consumer.id === consumer.id
      );
      // 새로운 비디오
      if (!prevVideo) return { consumer, isActive: 0 };
      // 기존 비디오
      return prevVideo;
    });
    setVideos(newConsumers);
  }, [consumers, layoutInfo.layoutPlayerId]);

  // 현재 active 상태인 영상 개수
  const countSelectVideos = videos.reduce((acc, val) => {
    if (!!val.isActive) return acc + 1;
    else return acc;
  }, 0);

  const handleInactive = (id: string) => {
    const newVideos = videos.map((video) =>
      video.consumer.id === id ? { ...video, isActive: 0 } : video
    );
    setVideos(newVideos);
  };

  const videosChange = (newVideos: LayoutConsumersType[]) => {
    setVideos(newVideos);
  };

  const handleCloseLayout = () => {
    dispatch(layoutClose());
  };

  return {
    videos,
    countSelectVideos,
    handleInactive,
    videosChange,
    handleCloseLayout,
  };
}
