import { StaticImageData } from "next/image";

import useLayout from "@/hooks/conference/useLayout";
import usePlayerListStore from "@/zustand/metaversePlayerStore";

import {
  CameraOff,
  CameraOn,
  MicOff,
  MicOn,
  ScreenOff,
  ScreenOn,
} from "../../assets/dock-icons";
import BadgeNumber from "../common/badge/BadgeNumber";
import BadgeWrapper from "../common/badge/BadgeWrapper";

import useVideoConference from "../../hooks/conference/useVideoConference";
import DockPlayer from "./DockPlayer";
import ShareButton from "./ShareButton";
import { StDockContainer } from "./styles/videoConference.styles";
import VideoSourceDisplayContainer from "./video-media-item/VideoSourceDisplayContainer";

export default function VideoConference() {
  const { isOpen } = useLayout();

  const {
    handleStopShare,
    handleShare,
    screenCount,
    isCanShare,
    currentPlayer,
  } = useVideoConference();

  const playerList = usePlayerListStore.use.playerList();

  return (
    currentPlayer && (
      <>
        <StDockContainer $isOpen={isOpen}>
          <DockPlayer player={currentPlayer} />
          <ShareButton
            type="screen"
            onShare={handleShare}
            shareButtonText="화면 공유"
            stopSharingButtonText="공유 불가"
            isCanShare={isCanShare}
            shareSvg={ScreenOff as StaticImageData}
            stopShareSvg={ScreenOn as StaticImageData}
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
            shareSvg={CameraOn as StaticImageData}
            stopShareSvg={CameraOff as StaticImageData}
          />
          <ShareButton
            type="audio"
            onShare={handleShare}
            onStopShare={handleStopShare}
            shareButtonText="마이크 켜기"
            shareSvg={MicOn as StaticImageData}
            stopSharingButtonText="마이크 끄기"
            stopShareSvg={MicOff as StaticImageData}
          />
        </StDockContainer>
        {playerList.length !== 0 && (
          <VideoSourceDisplayContainer
            playerList={playerList}
            currentPlayer={currentPlayer}
          />
        )}
      </>
    )
  );
}
