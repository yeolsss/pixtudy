import { types } from 'mediasoup-client'
import { RtpParameters } from 'mediasoup-client/lib/RtpParameters'

import { Player } from '@/types/metaverse.types'

export type RtpCapabilities = types.RtpCapabilities

export interface DtlsParameters {
  dtlsParameters: types.DtlsParameters
}

export interface ProduceParameter {
  kind: types.MediaKind
  rtpParameters: types.RtpParameters
  appData: types.AppData
}

export interface TransPortParams {
  id: string
  iceParameters: types.IceParameters
  iceCandidates: types.IceCandidate[]
  dtlsParameters: types.DtlsParameters
}

export interface NewProducerParameter {
  producerId: string
  socketId: string
  socketName: string
  isNewSocketHost: boolean
}

export type AppData = {
  trackId: string
  streamId: string
  playerId: string
  shareType: ShareType
} & types.AppData

export type ShareType = 'screen' | 'webcam' | 'audio'

export type SendTransportType = types.Transport<types.AppData>

export type RecvTransportType = types.Transport<types.AppData>

export type Producer = types.Producer<AppData>

export type Consumer = types.Consumer<types.AppData>

// 가이드 형태
export type GuideStatusType =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'
  | 'center'

// 그리드 형태
export type GridStatusType =
  | 'center-one'
  | 'topBottom-two'
  | 'leftRight-two'
  | 'edge-four'

export type VideoSource = Producer | Consumer

export interface MediaStreamWithId {
  stream: MediaStream
  id: string
}

export type TrackKind = 'video' | 'audio'

export interface ProducerForConsume { id: string; appData: AppData }

export type UserWithVideoSource = {
  producers: Producer[]
  consumers: Consumer[]
} & Player

export interface UserVideoSourceMap {
  [key: string]: UserWithVideoSource
}

export type SplitVideoSource = [VideoSource[], VideoSource[]]

export interface LayoutConsumersType { consumer: VideoSource; isActive: number }

export interface MediaConsumeParams {
  id: string
  producerId: string
  kind: 'audio' | 'video'
  rtpParameters: RtpParameters
  appData: AppData
}

export interface MediaConsumeParamsForEmit {
  rtpCapabilities: RtpCapabilities
  playerId: string
  appData: AppData
  producerId: string
}

export interface DeviceInputs {
  deviceId: string
}

export interface LocalStorageDeviceInputs {
  audio: MediaTrackConstraints
  video: MediaTrackConstraints
}
