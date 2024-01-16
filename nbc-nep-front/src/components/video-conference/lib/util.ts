import { Player } from "@/types/metaverse";
import { Consumer } from "mediasoup-client/lib/Consumer";
import { UserVideoSourceMap } from "../types/ScreenShare.types";

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

export function updateUserVideoSourceMap(
  prevUsers: UserVideoSourceMap,
  playerList: Player[]
) {
  const newUserForVideoSource = { ...prevUsers };

  playerList.forEach((player) => {
    if (!newUserForVideoSource[player.playerId]) {
      newUserForVideoSource[player.playerId] = {
        ...player,
        consumers: [],
        producers: [],
      };
    }
  });

  return newUserForVideoSource;
}

export function isArrayEmpty(array: unknown[]) {
  return array.length === 0;
}
