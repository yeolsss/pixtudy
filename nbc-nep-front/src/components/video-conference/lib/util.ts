import { Player } from "@/types/metaverse";
import { Consumer } from "mediasoup-client/lib/Consumer";
import {
  SplitVideoSource,
  UserVideoSourceMap,
  VideoSource,
} from "../types/ScreenShare.types";

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

export function splitVideoSource(videoSources: VideoSource[]) {
  const CAM_AND_AUDIO_VIDEO_SOURCE = 0;
  const SCREEN_VIDEO_SOURCE = 1;

  return videoSources.reduce<SplitVideoSource>(
    (acc, cur) => {
      if (cur.appData.shareType === "screen") {
        acc[SCREEN_VIDEO_SOURCE].push(cur);
      } else {
        acc[CAM_AND_AUDIO_VIDEO_SOURCE].push(cur);
      }
      return acc;
    },
    [[], []]
  );
}
