import { Consumer } from "mediasoup-client/lib/Consumer";
import { ConsumerTransportType } from "../types/ScreenShare.types";

// ! 이번것이 해결된다면 사라져야 마땅함
export function isAlreadyConsumeTransport(
  consumerTransports: ConsumerTransportType[],
  remoteProducerId: string
) {
  return consumerTransports.some((consumerTransport) => {
    return consumerTransport.producerId === remoteProducerId;
  });
}

export function isAlreadyConsume(
  consumers: Consumer[],
  remoteProducerId: string
) {
  return consumers.some((consumer) => consumer.id === remoteProducerId);
}

export function checkStreamTracksEmpty(stream: MediaStream) {
  return (
    stream.getAudioTracks().length === 0 && stream.getVideoTracks().length === 0
  );
}

export function isNotEmptyTracks(tracks: MediaStreamTrack[]) {
  return tracks.length !== 0;
}

export function isVideoTrack(track: MediaStreamTrack) {
  return track.kind === "video";
}

export function isAudioTrack(track: MediaStreamTrack) {
  return track.kind === "audio";
}
