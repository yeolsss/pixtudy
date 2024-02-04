import { filter, find } from 'lodash'
import {
  AppData,
  ShareType,
  SplitVideoSource,
  VideoSource
} from '../../../types/conference.types'

export function isEmptyTracks(tracks: MediaStreamTrack[]) {
  return tracks.length === 0
}

export function isVideoTrack(track: MediaStreamTrack) {
  return track.kind === 'video'
}

export function splitVideoSource(videoSources: VideoSource[]) {
  const CAM_AND_AUDIO_VIDEO_SOURCE = 0
  const SCREEN_VIDEO_SOURCE = 1

  return videoSources.reduce<SplitVideoSource>(
    (acc, cur) => {
      if (cur.appData.shareType === 'screen') {
        acc[SCREEN_VIDEO_SOURCE].push(cur)
      } else {
        acc[CAM_AND_AUDIO_VIDEO_SOURCE].push(cur)
      }
      return acc
    },
    [[], []]
  )
}

function findVideoSourceBy<Key extends keyof AppData>(
  videoSources: VideoSource[],
  key: Key,
  predicate: (value: AppData[Key]) => boolean
) {
  return find(videoSources, (videoSource) =>
    predicate(videoSource.appData[key])
  )
}

export function findVideoSourcesByType(
  videoSources: VideoSource[],
  type: ShareType
) {
  return findVideoSourceBy(
    videoSources,
    'shareType',
    (videoSourceType) => videoSourceType === type
  )
}

function filterVideoSourcesBy<Key extends keyof AppData>(
  videoSources: VideoSource[],
  key: Key,
  predicate: (value: AppData[Key]) => boolean
) {
  return filter(videoSources, (videoSource) =>
    predicate(videoSource.appData[key])
  )
}

export function filterVideoSourcesByPlayerId(
  videoSources: VideoSource[],
  playerId: string
) {
  return filterVideoSourcesBy(
    videoSources,
    'playerId',
    (videoSourcePlayerId) => videoSourcePlayerId === playerId
  )
}
