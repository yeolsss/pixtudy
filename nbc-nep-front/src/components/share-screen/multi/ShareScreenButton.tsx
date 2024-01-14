import { PropsWithChildren } from "react";
import { ShareType } from "../types/ScreenShare.types";

interface Props {
  onShare: (stream: MediaStream, type: ShareType) => void;
  type: ShareType;
}

export default function ShareScreenButton({
  onShare,
  type,
  children,
}: PropsWithChildren<Props>) {
  const handleClickShareButton = async () => {
    try {
      const mediaStream: MediaStream = await getMediaStreamByType(type);
      onShare(mediaStream, type);
    } catch (err) {
      console.error("on error when start capture", err);
    }
  };

  return <button onClick={handleClickShareButton}>{children}</button>;
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
