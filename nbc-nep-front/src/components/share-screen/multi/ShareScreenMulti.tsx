import useVideoShareMultiReceiver from "@/hooks/useVideoShareMultiReceiver";
import useVideoShareMultiSender from "@/hooks/useVideoShareMultiSender";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import styled from "styled-components";
import ShareScreenButton from "../ShareScreenButton";
import Video from "./Vidoe";

type WebRTCUser = {
  id: string;
  stream: MediaStream;
};

export default function ShareScreenMulti() {
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket>(
    io("http://localhost:3001", { withCredentials: true })
  );
  const {
    createAndSetOffer,
    addTracksToConnection,
    getSenderAnswer,
    getSenderCandidate,
  } = useVideoShareMultiSender({
    handleIceCandidate: handleSenderIceCandidate,
  });
  const {
    createReceiverPeerConnection,
    getReceiverAnswer,
    getReceiverCandidate,
  } = useVideoShareMultiReceiver({
    socket: socketRef.current,
    onIceCandidate: handleReceiverIceCandidate,
    onTrack: handleReceiverTrack,
  });

  async function handleStartCapture(stream: MediaStream) {
    const socket = socketRef.current;
    if (!socket) return;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    addTracksToConnection(stream);
    const offer = await createAndSetOffer();
    socket.emit("senderOffer", { offer, senderUserId: socket.id });
  }

  function handleSenderIceCandidate(event: RTCPeerConnectionIceEvent) {
    const socket = socketRef.current!;
    const candidate = event.candidate;

    if (!(candidate && socket)) return;

    socket.emit("senderCandidate", {
      candidate,
      senderUserId: socket.id,
    });
  }

  function handleReceiverIceCandidate(senderUserId: string) {
    return (event: RTCPeerConnectionIceEvent) => {
      const socket = socketRef.current;
      const candidate = event.candidate;

      socket.emit("receiverCandidate", {
        candidate,
        receiverUserId: socket.id,
        senderUserId,
      });
    };
  }

  function handleReceiverTrack(senderUserId: string) {
    return (event: RTCTrackEvent) => {
      const [stream] = event.streams;
      setUsers((prev) =>
        prev
          .filter((user) => user.id !== senderUserId)
          .concat({ id: senderUserId, stream })
      );
    };
  }

  useEffect(() => {
    const socket = socketRef.current!;

    socket.on("userEnter", (data: { userId: string }) => {
      const { userId } = data;
      createReceiverPeerConnection(userId);
    });

    socket.on(
      "getSenderAnswer",
      async (data: { answer: RTCSessionDescription }) => {
        const { answer } = data;
        console.log(
          "서버 측에서 Receiver가 제대로 만들어졌고 answer를 받음",
          answer
        );
        await getSenderAnswer(answer);
      }
    );

    socket.on(
      "getSenderCandidate",
      async (data: { candidate: RTCIceCandidateInit }) => {
        const { candidate } = data;
        await getSenderCandidate(candidate);
      }
    );

    socket.on(
      "getReceiverAnswer",
      async (data: { id: string; answer: RTCSessionDescription }) => {
        const { id, answer } = data;
        await getReceiverAnswer(id, answer);
      }
    );
    socket.on(
      "getReceiverCandidate",
      async (data: { id: string; candidate: RTCIceCandidateInit }) => {
        const { id, candidate } = data;
        await getReceiverCandidate(id, candidate);
      }
    );
  }, []);

  return (
    <>
      <ShareScreenButton onShareScreen={handleStartCapture} />
      <StSection>
        <h1>My Videos</h1>
        <StVideo ref={localVideoRef} autoPlay />
      </StSection>
      <StSection>
        <h1>other videos</h1>
        {users.map((user) => (
          <Video key={user.id} stream={user.stream} />
        ))}
      </StSection>
    </>
  );
}
const StSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StVideo = styled.video`
  width: 400px;
  height: 300px;
`;
