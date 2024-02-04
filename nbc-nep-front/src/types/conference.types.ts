import { types } from 'mediasoup-client'
import { RtpParameters } from 'mediasoup-client/lib/RtpParameters'
import { Player } from '@/types/metaverse.types'

export type RtpCapabilities = types.RtpCapabilities

export type DtlsParameters = {
  dtlsParameters: types.DtlsParameters
}

export type ProduceParameter = {
  kind: types.MediaKind
  rtpParameters: types.RtpParameters
  appData: types.AppData
}

export type TransPortParams = {
  id: string
  iceParameters: types.IceParameters
  iceCandidates: types.IceCandidate[]
  dtlsParameters: types.DtlsParameters
}

export type NewProducerParameter = {
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

export type MediaStreamWithId = {
  stream: MediaStream
  id: string
}

export type TrackKind = 'video' | 'audio'

export type ProducerForConsume = { id: string; appData: AppData }

export type UserWithVideoSource = {
  producers: Producer[]
  consumers: Consumer[]
} & Player

export type UserVideoSourceMap = {
  [key: string]: UserWithVideoSource
}

export type SplitVideoSource = [VideoSource[], VideoSource[]]

export type LayoutConsumersType = { consumer: VideoSource; isActive: number }

export type MediaConsumeParams = {
  id: string
  producerId: string
  kind: 'audio' | 'video'
  rtpParameters: RtpParameters
  appData: AppData
}

export type MediaConsumeParamsForEmit = {
  rtpCapabilities: RtpCapabilities
  playerId: string
  appData: AppData
  producerId: string
}

export type DeviceInputs = {
  deviceId: string
}

export type LocalStorageDeviceInputs = {
  audio: MediaTrackConstraints
  video: MediaTrackConstraints
}
