import { theme } from "@/styles/Globalstyle";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { DEVICE_STORAGE_KEY } from "./constants/constants";
import {
  LocalStorageDeviceInputs,
  ShareType,
} from "../../types/conference.types";

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
    } catch (err: unknown) {
      setIsShare(false);
      console.error("on error when start capture", err);

      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          callToastDockError(
            "권한 설정이 돼있지 않습니다.\n 권한 설정을 해주시길 바랍니다."
          );
          return;
        }
        if (err.name === "NotFoundError") {
          callToastDockError(
            "사용자 웹캠정보를 찾을 수 없습니다. 웹캠의 작동 상태 및 연결 상태를 확인해주시길 바랍니다."
          );
          return;
        }

        toast.error(
          "사용자 웹 캠 정보를 가져오는 과정에서 오류가 발생했습니다. 콘솔 창에 에러 메시지와 함께 개발자에게 문의바랍니다."
        );
        console.error(err);
      }
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

  return navigator.mediaDevices.getUserMedia({
    video: videoConstraints,
    audio: false,
  });
};

const getUserAudio = async () => {
  const audioConstraints = await getAudioDevice();

  return navigator.mediaDevices.getUserMedia({
    audio: audioConstraints,
    video: false,
  });
};

const getVideoDevice = async () => {
  let deviceInputs = JSON.parse(
    localStorage.getItem(DEVICE_STORAGE_KEY) as string
  ) as LocalStorageDeviceInputs;

  if (!deviceInputs) {
    return true;
  }

  return deviceInputs["video"];
};

const getAudioDevice = async () => {
  let deviceInputs = JSON.parse(
    localStorage.getItem(DEVICE_STORAGE_KEY) as string
  ) as LocalStorageDeviceInputs;

  if (!deviceInputs) {
    return true;
  }
  return deviceInputs["audio"];
};

const callToastDockError = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    style: { bottom: theme.spacing[112], fontSize: "1.25rem" },
  });
};
