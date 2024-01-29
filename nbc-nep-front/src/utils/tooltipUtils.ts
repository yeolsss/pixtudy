import { Placement } from "react-joyride";

export type TooltipType = {
  target: string;
  content: string;
  placement: Placement;
  disableBeacon: boolean;
};

export const DASHBOARD_TOUR_TOOLTIP: TooltipType[] = [
  {
    target: ".dashboard-banner",
    content: "배너를 통해 인기있는 space에 참여하세요.",
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: ".dashboard-join-buttons",
    content:
      "원하는 스페이스를 만들거나, 초대코드로 다른 스페이스에 참여해보세요.",
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: ".tour-tooltip-item button",
    content: "입장하기 버튼으로 기존 스페이스에 입장하세요.",
    placement: "right",
    disableBeacon: true,
  },
];
