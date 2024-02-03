import { AnimationInfo } from "../types/scrumTypes";

export const SCRUM_BOARD_TEXT_AREA_FONT_SIZE = 14;
export const SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH = 45;
export const SCRUM_BOARD_COMMENT_TEXT_AREA_FONT_SIZE = 13;
export const SCRUM_BOARD_COMMENT_TEXT_AREA_TEXT_MAX_LENGTH = 100;
export const options = [
  "#EB5757",
  "#F06595",
  "#F2C94C",
  "#27AE60",
  "#2563EB",
  "#9B51E0",
];

export const BACK_DROP_TYPE_CREATE = "create";
export const BACK_DROP_TYPE_DETAIL = "detail";
export const BACK_DROP_TYPE_UPDATE = "update";

// TODO 240203
// 위치 옮겨야 함 => libs로
export const fadeInOut = (y?: number) => {
  const animation: AnimationInfo = {
    initial: { opacity: 0.5 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  // y 값이 undefined가 아닐 경우에만 y 관련 설정을 추가
  if (y !== undefined) {
    animation.initial.y = y;
    animation.animate.y = 0;
    animation.exit.y = -y;
  }

  return animation;
};
