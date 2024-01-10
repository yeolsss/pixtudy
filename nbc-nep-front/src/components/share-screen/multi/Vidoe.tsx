import { useEffect, useRef, useState } from "react";
import Styled from "styled-components";

const Container = Styled.div`
    
`;

const VideoContainer = Styled.video`
    border: 1px solid black;
`;

interface Props {
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
      ref.current.play();
    }
  }, [stream]);

  return (
    <Container>
      <VideoContainer ref={ref} muted={isMuted} autoPlay />
    </Container>
  );
};

export default Video;
