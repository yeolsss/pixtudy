import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ShareType } from "../../types/conference.types";

import { callToastDockError, getMediaStreamByType } from "./libs/sharebutton";
import { StShareButtonWrapper } from "./styles/shareButton.styles";

interface Props {
  onShare: (stream: MediaStream, type: ShareType) => void;
  onStopShare?: (type: ShareType) => void;
  type: ShareType;
  shareButtonText: string;
  stopSharingButtonText: string;
  isCanShare?: boolean;
  shareSvg: StaticImport;
  stopShareSvg: StaticImport;
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
    if (isCanShare === undefined) {
      return;
    }
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
          "사용자 웹 캠 정보를 가져오는 과정에서 오류가 발생했습니다. 개발자에게 문의 바랍니다."
        );
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
        alt="dock icon"
      />
      {isShare ? stopSharingButtonText : shareButtonText}
      {children}
    </StShareButtonWrapper>
  );
}
