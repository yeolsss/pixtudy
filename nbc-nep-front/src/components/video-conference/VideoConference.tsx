import useLayout from '@/hooks/conference/useLayout'
import styled from 'styled-components'
import BadgeNumber from '../common/badge/BadgeNumber'
import BadgeWrapper from '../common/badge/BadgeWrapper'
import DockPlayer from './DockPlayer'
import ShareButton from './ShareButton'
import useVideoConference from './hooks/useVideoConference'
import {
  CameraOff,
  CameraOn,
  MicOff,
  MicOn,
  ScreenOff,
  ScreenOn
} from '../../assets/dock-icons'
import VideoSourceDisplayContainer from './video-media-item/VideoSourceDisplayContainer'
import usePlayerListStore from '@/zustand/metaversePlayerStore'

export default function VideoConference() {
  const { isOpen } = useLayout()

  const {
    handleStopShare,
    handleShare,
    screenCount,
    isCanShare,
    currentPlayer
  } = useVideoConference()

  const playerList = usePlayerListStore.use.playerList()

  return (
    <>
      {currentPlayer && (
        <>
          <StDockContainer $isOpen={isOpen}>
            <DockPlayer player={currentPlayer} />
            <ShareButton
              type="screen"
              onShare={handleShare}
              shareButtonText="화면 공유"
              stopSharingButtonText="공유 불가"
              isCanShare={isCanShare}
              shareSvg={ScreenOff}
              stopShareSvg={ScreenOn}
            >
              <BadgeWrapper>
                {screenCount ? <BadgeNumber count={screenCount} /> : null}
              </BadgeWrapper>
            </ShareButton>
            <ShareButton
              type="webcam"
              onShare={handleShare}
              onStopShare={handleStopShare}
              shareButtonText="카메라 켜기"
              stopSharingButtonText="카메라 끄기"
              shareSvg={CameraOn}
              stopShareSvg={CameraOff}
            />
            <ShareButton
              type="audio"
              onShare={handleShare}
              onStopShare={handleStopShare}
              shareButtonText="마이크 켜기"
              stopSharingButtonText="마이크 끄기"
              shareSvg={MicOn}
              stopShareSvg={MicOff}
            />
          </StDockContainer>
          {playerList.length !== 0 && (
            <VideoSourceDisplayContainer
              playerList={playerList}
              currentPlayer={currentPlayer}
            />
          )}
        </>
      )}
    </>
  )
}

const StDockContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;

  left: 50%;
  bottom: ${(props) => props.theme.spacing[32]};
  transform: translateX(-50%);
  z-index: 3;

  background-color: ${(props) => props.theme.color.metaverse.primary};

  padding: ${(props) => props.theme.spacing[16]};

  border-radius: ${(props) => props.theme.border.radius.circle};

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  gap: ${(props) => props.theme.unit[15]};
  width: 465px;

  transition: opacity 0.2s ease-in-out;

  ${(props) => props.$isOpen && 'opacity: 0.3'};
  &:hover {
    ${(props) => props.$isOpen && 'opacity: 1'};
  }
`
