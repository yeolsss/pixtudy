import { logoSection } from "@/assets/GNB";
import CloseButton from "@/components/metaverse/globalNavBar/CloseButton";
import GlobalNavBarIconWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/GlobalNavBarIconWrapper";
import {
  StGlobalNavBar,
  StHomeLink,
} from "@/components/metaverse/styles/metaverse.styles";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export default function GlobalNavBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { sound, volume, isPlay, setAlarmPlayStatus } = useChatAlarm();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume === 0 ? volume : volume / 100;
    }
  }, [volume]);

  const handleAudioEnd = useCallback(() => {
    setAlarmPlayStatus(false); // 오디오 재생이 끝나면 isPlay를 false로 설정합니다.
  }, [setAlarmPlayStatus]);

  useEffect(() => {
    const play = async (audio: HTMLAudioElement) => {
      await audio.play();
      audio.addEventListener("ended", handleAudioEnd);
    };

    const audio = audioRef.current;

    if (isPlay && audio) {
      play(audio);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleAudioEnd);
      }
    };
  }, [isPlay, handleAudioEnd, sound]);

  return (
    <StGlobalNavBar>
      <audio ref={audioRef} src={sound} />
      <StHomeLink href="/dashboard">
        <Image src={logoSection} alt="홈 버튼" width={24} height={24} />
      </StHomeLink>
      <div>
        <GlobalNavBarIconWrapper />
        <CloseButton />
      </div>
    </StGlobalNavBar>
  );
}
