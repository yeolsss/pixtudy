import { toast } from "react-toastify"

import { theme } from "@/styles/Globalstyle"
import { LocalStorageDeviceInputs, ShareType } from "@/types/conference.types"

import { DEVICE_STORAGE_KEY } from "../constants"

export const getVideoDevice =  () => {
  const deviceInputs = JSON.parse(
    localStorage.getItem(DEVICE_STORAGE_KEY) as string
  ) as LocalStorageDeviceInputs

  if (!deviceInputs) {
    return true
  }

  return deviceInputs.video
}

export const getAudioDevice =  () => {
  const deviceInputs = JSON.parse(
    localStorage.getItem(DEVICE_STORAGE_KEY) as string
  ) as LocalStorageDeviceInputs

  if (!deviceInputs) {
    return true
  }
  return deviceInputs.audio
}

export const getDisplayMedia = () =>
  navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: 'window'
    },
    audio: false
  })

export const getUserMedia = async () => {
  const videoConstraints = getVideoDevice();

  return navigator.mediaDevices.getUserMedia({
    video: videoConstraints,
    audio: false
  })
}

export const getUserAudio = async () => {
  const audioConstraints = getAudioDevice()

  return navigator.mediaDevices.getUserMedia({
    audio: audioConstraints,
    video: false
  })
}

export const callToastDockError = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
    style: { bottom: theme.spacing[112], fontSize: '1.25rem' }
  })
}

export const getMediaStreamByType = (type: ShareType) => {
  const mediaFunctions = {
    screen: getDisplayMedia,
    webcam: getUserMedia,
    audio: getUserAudio
  }[type]

  return mediaFunctions()
}