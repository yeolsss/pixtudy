import { CSSProperties, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import ShareScreenButton from "../ShareScreenButton";
import ShareScreenInput from "./ShareScreenInput";

type WebRTCUser = {
  id: string;
  stream: MediaStream;
};

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function ShareScreenMulti() {
  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<Socket>(
    io("http://localhost:3001", { withCredentials: true })
  );
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const socket = socketRef.current;
    socket.on("connect", handleConnect);
    socket.on("join-room", handleReceiveRoomUser);
    socket.on("receive-answer", handleReceiveAnswer);

    function handleConnect() {
      console.log("socket connected in Share Screen Multi");
    }

    function handleReceiveRoomUser(users: any[]) {
      console.log("users", users);
    }

    async function handleReceiveAnswer(answer: RTCSessionDescriptionInit) {
      const peerConnection = peerConnectionRef.current!;
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    }
    async function handleReceive() {}

    return () => {
      socket.off("connect", handleConnect);
      socket.off("join-room", handleReceiveRoomUser);
    };
  }, []);

  function handleStartCapture(stream: MediaStream) {
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    const peerConnection = new RTCPeerConnection(configuration);
    peerConnectionRef.current = peerConnection;

    const pc = peerConnection;
    const socket = socketRef.current;

    pc.addEventListener("icecandidate", (e) => {
      if (!(e.candidate && socket)) return;
      console.log("sender PC icecandidate 정보를 보낸다.");
      socket.emit("send-candidate-info", {
        candidate: e.candidate,
        socketId: socket.id,
      });
    });
    pc.addEventListener("iceconnectionstatechange", (e) => {
      console.log("ice connection state change ", e);
    });

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    createOffer(peerConnection);
  }
  async function createOffer(peerConnection: RTCPeerConnection) {
    // ? 자신의 Media Stream을 보내기 위한 RTC PeerConnection 이므로
    // ? offerToReceiveAudio, offerToReceiveVideo는 모두 false로 둔다
    const socket = socketRef.current!;
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: false,
      offerToReceiveVideo: false,
    });
    peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    socketRef.current?.emit("send-offer", {
      offer,
      socketId: socket.id,
      roomId: inputRef.current!.value,
    });
  }

  return (
    <div style={StyleDiv}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const roomId = inputRef.current!.value;
          const socket = socketRef.current!;

          socket.emit("join-room", { socketId: socket.id, roomId });
        }}
      >
        <ShareScreenInput inputRef={inputRef} />
      </form>
      <ShareScreenButton onShareScreen={handleStartCapture} />
      <section style={StyleSection}>
        <h1>My Video</h1>
        <video
          style={{ width: "100%", height: "100%" }}
          ref={localVideoRef}
          autoPlay
        />
      </section>
      <section style={StyleSectionOther}>
        <h1>Other Video</h1>
        {users.map((user) => (
          <Video key={user.id} stream={user.stream} />
        ))}
      </section>
    </div>
  );
}
const StyleDiv: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};
const StyleSection: CSSProperties = {
  width: 400,
  height: 300,
};
const StyleSectionOther: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: 300,
};

interface Props {
  stream: MediaStream;
}
function Video({ stream }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return <video ref={videoRef} autoPlay />;
}
