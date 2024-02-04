import styledComponent from 'styled-components'

import { StShareMediaItem, StVideoWrapper } from './videoConference.styles'

const styled = styledComponent

export const StDefaultShareMediaItemWrapper = styled(StShareMediaItem)`
  display: flex;

  & > span {
    margin: auto;
  }

  position: relative;
`

export const StSwiperVideoWrapper = styled(StVideoWrapper)`
  .swiper-pagination {
    background-color: black;
    bottom: 0;
    border-bottom-left-radius: ${(props) => props.theme.border.radius.circle};
    border-bottom-right-radius: ${(props) => props.theme.border.radius.circle};
  }
  .swiper-pagination-bullet {
    background-color: ${(props) => props.theme.color.bg.secondary};
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: var(--color-brand-500);
  }
`

export const StRemoveProducerButton = styled.button`
  background-color: ${(props) => props.theme.color.bg['danger-bold']};
  width: 20px;
  height: 20px;

  outline: none;
  padding: 0;
  margin: 0;

  position: absolute;

  right: ${(props) => props.theme.spacing[4]};
  top: ${(props) => props.theme.spacing[4]};
`

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${(props) => props.theme.spacing[32]};

  position: absolute;
  right: ${(props) => props.theme.spacing[16]};
  top: ${(props) => props.theme.spacing[32]};

  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: nowrap;

  width: 30rem;
  padding-right: 2rem;
  padding-top: 2rem;
  height: auto;
  max-height: 90vh;

  * {
    flex-shrink: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`
