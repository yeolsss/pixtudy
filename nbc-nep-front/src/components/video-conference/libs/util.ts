import { Player } from "@/components/metaverse/types/metaverse";
import { Consumer } from "mediasoup-client/lib/Consumer";
import {
  Producer,
  ShareType,
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

function filterByShareType(item: VideoSource, shareType: ShareType) {
  return item.appData.shareType === shareType;
}

export function getProducersByShareType(
  producers: Producer[],
  shareType: ShareType
) {
  return producers.filter((producer) => filterByShareType(producer, shareType));
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

export function getVideoSourcesExcludeAudio(videoSources: VideoSource[]) {
  return videoSources.filter(
    (videoSource) => videoSource.appData.shareType !== "audio"
  );
}

export function findVideoSourceByType(
  videoSource: VideoSource[],
  type: ShareType
) {
  return videoSource.find(
    (videoSource) => videoSource.appData.shareType === type
  );
}
