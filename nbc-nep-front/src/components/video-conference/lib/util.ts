import { Consumer } from "mediasoup-client/lib/Consumer";

export function isAlreadyConsume(
  consumers: Consumer[],
  remoteProducerId: string
) {
  return consumers.some((consumer) => consumer.id === remoteProducerId);
}

export function isEmptyTracks(tracks: MediaStreamTrack[]) {
  return tracks.length === 0;
}

export function isVideoTrack(track: MediaStreamTrack) {
  return track.kind === "video";
}
