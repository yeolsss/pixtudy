import { PropsWithChildren } from "react";

interface Props {
  onShare: (stream: MediaStream, type: "screen" | "webcam") => void;
  mode: "screen" | "webcam";
}

export default function ShareScreenButton({
  onShare,
  mode,
  children,
}: PropsWithChildren<Props>) {
  const handleClickShareButton = async () => {
    const isScreenMode = mode === "screen";

    try {
      const mediaStream: MediaStream = await (isScreenMode
        ? getDisplayMedia()
        : getUserMedia());

      onShare(mediaStream, mode);
    } catch (err) {
      console.error("on error when start capture", err);
    }
  };

  return <button onClick={handleClickShareButton}>{children}</button>;
}

const getDisplayMedia = () =>
  navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: "window",
    },
    audio: false,
  });

const getUserMedia = () =>
  navigator.mediaDevices.getUserMedia({ video: true, audio: true });
