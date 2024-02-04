import { TooltipType } from '@/types/util.types'

export const DASHBOARD_TOUR_TOOLTIP: TooltipType[] = [
  {
    target: '.dashboard-banner',
    content: '배너를 통해 인기있는 space에 참여하세요.',
    placement: 'bottom',
    disableBeacon: true
  },
  {
    target: '.dashboard-join-buttons',
    content:
      '원하는 스페이스를 만들거나, 초대코드로 다른 스페이스에 참여해보세요.',
    placement: 'bottom',
    disableBeacon: true
  },
  {
    target: '.tour-tooltip-scrum-button',
    content: '스크럼보드를 통해 프로젝드 및 일정을 관리하세요',
    placement: 'right',
    disableBeacon: true
  },
  {
    target: '.tour-tooltip-space-button',
    content: '입장하기 버튼으로 기존 스페이스에 입장하세요.',
    placement: 'right',
    disableBeacon: true
  }
]
