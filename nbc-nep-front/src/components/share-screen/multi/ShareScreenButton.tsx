interface Props {
  onShareScreen: (stream: MediaStream) => void;
}
const displayMediaOptions = {
  video: {
    displaySurface: "window",
  },
  audio: false,
};
export default function ShareScreenButton({ onShareScreen }: Props) {
  const handleStartCapture = async () => {
    try {
      const mediaStream: MediaStream =
        await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      onShareScreen(mediaStream);
    } catch (err) {
      console.error("on error when start capture", err);
    }
  };
  return <button onClick={handleStartCapture}>Start Capture</button>;
}
