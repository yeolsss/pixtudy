import { ConsumerTransportType } from "../types/ScreenShare.types";

export function isAlreadyConsumeTransport(
  consumerTransports: ConsumerTransportType[],
  remoteProducerId: string
) {
  return consumerTransports.some((consumerTransport) => {
    return consumerTransport.producerId === remoteProducerId;
  });
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
