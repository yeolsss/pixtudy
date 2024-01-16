import { GridStatusType, GuideStatusType } from "../types/ScreenShare.types";

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
      return 0;
    case "bottom":
      return 1;
    case "left":
      return 0;
    case "right":
      return 1;
    case "left-top":
      return 0;
    case "left-bottom":
      return 2;
    case "right-top":
      return 1;
    case "right-bottom":
      return 3;
    case "center":
      return 0;
  }
};
