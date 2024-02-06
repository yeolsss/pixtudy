import { useEffect } from "react";

import useSocket from "@/hooks/socket/useSocket";
import { PlayerState } from "@/types/metaverse.types";
import useAuthStore from "@/zustand/authStore";

import { StItem, StUlWrapper } from "./styles/playerStateSelector.styles";

export default function PlayerStateSelector() {
  const { id } = useAuthStore.use.user();
  const { changePlayerState, connect } = useSocket({ namespace: "/metaverse" });

  useEffect(() => {
    connect();
  }, []);

  const handleChangeState = (state: PlayerState) => () => {
    changePlayerState(id, state);
  };

  return (
    <StUlWrapper
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
    >
      <StItem onClick={handleChangeState(PlayerState.ONLINE)}>
        <span />
        <span>온라인</span>
      </StItem>
      <StItem onClick={handleChangeState(PlayerState.EATING)}>
        <span />
        <span>식사</span>
      </StItem>
      <StItem onClick={handleChangeState(PlayerState.LEFT_SEAT)}>
        <span />
        <span>자리비움</span>
      </StItem>
      <StItem onClick={handleChangeState(PlayerState.DISTURB)}>
        <span />
        <span>방해금지</span>
      </StItem>
    </StUlWrapper>
  );
}
