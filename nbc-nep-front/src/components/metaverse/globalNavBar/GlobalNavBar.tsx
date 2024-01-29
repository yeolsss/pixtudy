import HomeIcon from "@/assets/icons/LogoSection.svg";
import CloseButton from "@/components/metaverse/globalNavBar/CloseButton";
import GlobalNavBarIconWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/GlobalNavBarIconWrapper";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

export default function GlobalNavBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { sound, volume, isPlay, setAlarmPlayStatus } = useChatAlarm();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleAudioEnd = useCallback(() => {
    setAlarmPlayStatus(false); // 오디오 재생이 끝나면 isPlay를 false로 설정합니다.
  }, [setAlarmPlayStatus]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlay && audio) {
      audio.play();
      audio.addEventListener("ended", handleAudioEnd);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, [isPlay, handleAudioEnd]);

  return (
    <StGlobalNavBar>
      <audio ref={audioRef} src={sound} />
      <StHomeLink href="/dashboard">
        <Image src={HomeIcon} alt={"홈 버튼"} width={24} height={24} />
      </StHomeLink>
      <div>
        <GlobalNavBarIconWrapper />
        <CloseButton />
      </div>
    </StGlobalNavBar>
  );
}

const StGlobalNavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 68px;
  justify-content: space-between;
  padding: 32px 12px 24px;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  background-color: ${({ theme }) => theme.color.metaverse.primary};
  color: ${({ theme }) => theme.color.icon.interactive.primary};
`;

const StHomeLink = styled.a`
  display: flex;

  font-size: 24px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.color.bg.primary};
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius[16]};
`;
