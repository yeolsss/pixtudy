import { useState } from "react";
import { ShareType } from "./types/ScreenShare.types";

interface Props {
  onShare: (stream: MediaStream, type: ShareType) => void;
  onStopShare?: (type: ShareType) => void;
  type: ShareType;
  shareButtonText: string;
  stopSharingButtonText: string;
  isCanShare?: () => boolean;
}

export default function ShareButton({
  onShare,
  onStopShare,
  type,
  shareButtonText,
  stopSharingButtonText,
  isCanShare,
}: Props) {
  const [isShare, setIsShare] = useState(isCanShare && !isCanShare());

  const handleClickShareButton = async () => {
    try {
      const mediaStream: MediaStream = await getMediaStreamByType(type);
      onShare(mediaStream, type);

      if (!isCanShare || !isCanShare()) {
        setIsShare(true);
        return;
      }
    } catch (err) {
      console.error("on error when start capture", err);
    }
  };

  const handleClickStopShareButton = () => {
    onStopShare && onStopShare(type);
    setIsShare(false);
  };

  return (
    <button
      onClick={isShare ? handleClickStopShareButton : handleClickShareButton}
    >
      {isShare ? stopSharingButtonText : shareButtonText}
    </button>
  );
}

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
