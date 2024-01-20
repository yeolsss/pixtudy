import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";
import { ShareType } from "./types/ScreenShare.types";

interface Props {
  onShare: (stream: MediaStream, type: ShareType) => void;
  onStopShare?: (type: ShareType) => void;
  type: ShareType;
  shareButtonText: string;
  stopSharingButtonText: string;
  isCanShare?: boolean;
  shareSvg: any;
  stopShareSvg: any;
}

export default function ShareButton({
  onShare,
  onStopShare,
  type,
  shareButtonText,
  stopSharingButtonText,
  isCanShare,
  stopShareSvg,
  shareSvg,
  children,
}: PropsWithChildren<Props>) {
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    if (isCanShare === undefined) return;
    setIsShare(!isCanShare);
  }, [isCanShare]);

  const handleClickShareButton = async () => {
    try {
      if (isCanShare === undefined) {
        setIsShare(true);
      }
      const mediaStream: MediaStream = await getMediaStreamByType(type);
      onShare(mediaStream, type);
    } catch (err) {
      setIsShare(false);
      console.error("on error when start capture", err);
    }
  };

  const handleClickStopShareButton = () => {
    onStopShare && onStopShare(type);
    if (isCanShare === undefined) {
      setIsShare(false);
    }
  };

  return (
    <StShareButtonWrapper
      onClick={isShare ? handleClickStopShareButton : handleClickShareButton}
    >
      <Image
        src={isShare ? shareSvg : stopShareSvg}
        width={24}
        height={24}
        alt={"dock icon"}
      />
      {isShare ? stopSharingButtonText : shareButtonText}
      {children}
    </StShareButtonWrapper>
  );
}

const StShareButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: ${(props) => props.theme.spacing[4]};
  color: ${(props) => props.theme.color.text.interactive.inverse};
`;

const getMediaStreamByType = async (type: ShareType) => {
  const mediaFunctions = {
    screen: getDisplayMedia,
    webcam: getUserMedia,
    audio: getUserAudio,
  }[type];

  return await mediaFunctions();
};

const getDisplayMedia = () =>
  navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: "window",
    },
    audio: false,
  });

const getUserMedia = () =>
  navigator.mediaDevices.getUserMedia({ video: true, audio: false });

const getUserAudio = () =>
  navigator.mediaDevices.getUserMedia({ audio: true, video: false });
