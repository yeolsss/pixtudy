import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { DEVICE_STORAGE_KEY } from "./constants/constants";
import { LocalStorageDeviceInputs, ShareType } from "./types/ScreenShare.types";

interface Props {
  onShare: (stream: MediaStream, type: ShareType) => void;
  onStopShare?: (type: ShareType) => void;
  type: ShareType;
  shareButtonText: string;
  stopSharingButtonText: string;
  isCanShare?: boolean;
  shareSvg: any;
  stopShareSvg: any;
}

export default function ShareButton({
  onShare,
  onStopShare,
  type,
  shareButtonText,
  stopSharingButtonText,
  isCanShare,
  stopShareSvg,
  shareSvg,
  children,
}: PropsWithChildren<Props>) {
  const [isShare, setIsShare] = useState(false);

  const isScreenShareType = type === "screen";

  useEffect(() => {
    if (isCanShare === undefined) return;
    setIsShare(!isCanShare);
  }, [isCanShare]);

  const handleClickShareButton = async () => {
    try {
      if (isCanShare === undefined) {
        setIsShare(true);
      }
      const mediaStream: MediaStream | undefined =
        await getMediaStreamByType(type);

      if (!mediaStream) {
        setIsShare(false);
        return;
      }
      onShare(mediaStream, type);
    } catch (err) {
      setIsShare(false);
      console.error("on error when start capture", err);
    }
  };

  const handleClickStopShareButton = () => {
    onStopShare && onStopShare(type);
    if (isCanShare === undefined) {
      setIsShare(false);
    }
  };

  return (
    <StShareButtonWrapper
      onClick={isShare ? handleClickStopShareButton : handleClickShareButton}
      $isScreenShareType={isScreenShareType}
      $isShare={isShare}
    >
      <Image
        src={isShare ? shareSvg : stopShareSvg}
        width={24}
        height={24}
        alt={"dock icon"}
      />
      {isShare ? stopSharingButtonText : shareButtonText}
      {children}
    </StShareButtonWrapper>
  );
}

const StShareButtonWrapper = styled.div<{
  $isScreenShareType: boolean;
  $isShare: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: ${(props) => props.theme.spacing[4]};
  color: ${(props) => props.theme.color.text.interactive.inverse};

  ${(props) =>
    props.$isScreenShareType && props.$isShare && "cursor:not-allowed;"}
`;

const getMediaStreamByType = async (type: ShareType) => {
  const mediaFunctions = {
    screen: getDisplayMedia,
    webcam: getUserMedia,
    audio: getUserAudio,
  }[type];

  return await mediaFunctions();
};

const getDisplayMedia = () =>
  navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: "window",
    },
    audio: false,
  });

const getUserMedia = async () => {
  const videoConstraints = await getVideoDevice();
  if (!videoConstraints.deviceId) {
    toast.error(
      "카메라 공유를 할 수 없습니다. 설정창에서 카메라를 세팅하거나 권한을 허용해주세요."
    );
    return;
  }

  return navigator.mediaDevices.getUserMedia({
    video: { deviceId: videoConstraints.deviceId },
    audio: false,
  });
};

const getUserAudio = async () => {
  const audioConstraints = await getAudioDevice();

  if (!audioConstraints.deviceId) {
    toast.error(
      "마이크 공유를 할 수 없습니다. 설정창에서 마이크를 세팅하거나 권한을 허용해주세요."
    );
    return;
  }

  return navigator.mediaDevices.getUserMedia({
    audio: { deviceId: audioConstraints.deviceId },
    video: false,
  });
};

const getVideoDevice = async () => {
  let deviceInputs = JSON.parse(
    localStorage.getItem(DEVICE_STORAGE_KEY) as string
  ) as LocalStorageDeviceInputs;

  if (!deviceInputs) {
    const initialInputs: LocalStorageDeviceInputs = {
      audio: {
        deviceId: null,
      },
      video: {
        deviceId: null,
      },
      microphone: {
        deviceId: null,
        key: null,
      },
    };
    deviceInputs = initialInputs;
  }

  if (!deviceInputs["video"].deviceId) {
    const device = await getInputDevice("videoinput");
    if (device) {
      deviceInputs.video.deviceId = device.deviceId;
    }
  }
  localStorage.setItem(DEVICE_STORAGE_KEY, JSON.stringify(deviceInputs));

  return deviceInputs["video"];
};

const getAudioDevice = async () => {
  let deviceInputs = JSON.parse(
    localStorage.getItem(DEVICE_STORAGE_KEY) as string
  ) as LocalStorageDeviceInputs;

  if (!deviceInputs) {
    const initialInputs: LocalStorageDeviceInputs = {
      audio: {
        deviceId: null,
      },
      video: {
        deviceId: null,
      },
      microphone: {
        deviceId: null,
        key: null,
      },
    };
    deviceInputs = initialInputs;
  }

  if (!deviceInputs["audio"].deviceId) {
    const device = await getInputDevice("audioinput");
    if (device) {
      deviceInputs.audio.deviceId = device.deviceId;
    }
  }
  localStorage.setItem(DEVICE_STORAGE_KEY, JSON.stringify(deviceInputs));

  return deviceInputs["audio"];
};

const getInputDevice = async (kind: "videoinput" | "audioinput") => {
  const devices = await enumerateDevices();

  return devices?.find((device) => device.kind === kind);
};

const enumerateDevices = async () => {
  if (!navigator.mediaDevices?.enumerateDevices) {
    toast.error("최신 브라우저를 이용해주세요. (enumerateDevices가 없습니다.");
    return null;
  }

  try {
    return await navigator.mediaDevices.enumerateDevices();
  } catch (error) {
    toast.error("사용 가능한 media device를 불러오는데 에러가 발생했습니다.");
    console.error(error);
  }
};
