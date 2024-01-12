interface Props {
  onShareScreen: (stream: MediaStream) => void;
  mode: "screen" | "webcam";
}

export default function ShareScreenButton({ onShareScreen, mode }: Props) {
  const handleStartCapture = async () => {
    const isScreenMode = mode === "screen";

    try {
      const mediaStream: MediaStream = await (isScreenMode
        ? getDisplayMedia()
        : getUserMedia());

      onShareScreen(mediaStream);
    } catch (err) {
      console.error("on error when start capture", err);
    }
  };

  return <button onClick={handleStartCapture}>Start Capture</button>;
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
