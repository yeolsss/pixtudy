export const videoParams = {
  // mediasoup params
  encodings: [
    {
      rid: 'r0',
      maxBitrate: 100000,
      scalabilityMode: 'S1T3'
    },
    {
      rid: 'r1',
      maxBitrate: 300000,
      scalabilityMode: 'S1T3'
    },
    {
      rid: 'r2',
      maxBitrate: 900000,
      scalabilityMode: 'S1T3'
    }
  ],
  codecOptions: {
    videoGoogleStartBitrate: 1000
  }
}

export const MAX_SHARE_SCREEN_SIZE = 4

export const DEVICE_STORAGE_KEY = 'deviceInputs'

export const PLAYER_STATE_VALUE = [
  'var(--state-online)',
  'var(--state-eating)',
  'var(--state-left-seat)',
  'var(--state-disturb)'
]

export const PLAYER_STATE_TEXT = ['온라인', '식사중', '자리비움', '방해금지']

export const SPACING = 10

export const VIDEO_SIZE = 175

export const GAP = 20