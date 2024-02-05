import {
  GridStatusType,
  GuideStatusType,
  LayoutConsumersType,
  VideoSource,
} from "../../../types/conference.types";

export const getGridStyle = (currentGuide: GuideStatusType): GridStatusType => {
  switch (currentGuide) {
    case "top":
    case "bottom":
      return "topBottom-two";
    case "left":
    case "right":
      return "leftRight-two";
    case "center":
      return "center-one";
    // 다른 경우들도 이런 식으로 추가할 수 있습니다.
    default:
      return "edge-four";
  }
};

export const currentLayoutIndex = (currentGuide: GuideStatusType): number => {
  switch (currentGuide) {
    case "top":
      return 1;
    case "bottom":
      return 2;
    case "left":
      return 1;
    case "right":
      return 2;
    case "left-top":
      return 1;
    case "left-bottom":
      return 3;
    case "right-top":
      return 2;
    case "right-bottom":
      return 4;
    case "center":
      return 1;
    default:
      return 0;
  }
};

export const formatGridTemplateVideos = (
  videos: LayoutConsumersType[]
): (VideoSource | null)[] => {
  const filterVideos = videos
    .filter((video) => !!video.isActive)
    .sort((a, b) => a.isActive - b.isActive);

  const resultVideos = new Array(
    filterVideos.length ? filterVideos[filterVideos.length - 1].isActive : 0
  ).fill(null);

  filterVideos.forEach((video) => {
    resultVideos[video.isActive - 1] = video.consumer;
  });

  return resultVideos as (VideoSource | null)[];
};
