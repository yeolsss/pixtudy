import useSocket from "@/hooks/socket/useSocket";
import { slideDown, slideUp } from "@/styles/animations";
import useAuthStore from "@/zustand/authStore";
import styled from "styled-components";
import { PlayerState } from "@/types/metaverse.types";

interface Props {
  isRender: boolean;
  handleAnimatedEnd: () => void;
}

export default function PlayerStateSelector({
  isRender,
  handleAnimatedEnd,
}: Props) {
  const { id } = useAuthStore.use.user();
  const { changePlayerState } = useSocket({ namespace: "/metaverse" });

  const handleChangeState = (state: PlayerState) => () => {
    changePlayerState(id, state);
  };

  return (
    <StUlWrapper $isRender={isRender} onAnimationEnd={handleAnimatedEnd}>
      <StItem onClick={handleChangeState(PlayerState.ONLINE)}>
        <span></span>
        <span>온라인</span>
      </StItem>
      <StItem onClick={handleChangeState(PlayerState.EATING)}>
        <span></span>
        <span>식사</span>
      </StItem>
      <StItem onClick={handleChangeState(PlayerState.LEFT_SEAT)}>
        <span></span>
        <span>자리비움</span>
      </StItem>
      <StItem onClick={handleChangeState(PlayerState.DISTURB)}>
        <span></span>
        <span>방해금지</span>
      </StItem>
    </StUlWrapper>
  );
}

const StUlWrapper = styled.ul<{ $isRender: boolean }>`
  position: absolute;

  border-radius: ${(props) => props.theme.border.radius[16]};
  padding: ${(props) => props.theme.spacing[16]};

  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;

  gap: ${(props) => props.theme.spacing[8]};

  width: 108px;
  height: 132px;

  background-color: ${(props) => props.theme.color.metaverse.primary};

  bottom: calc(100% + ${(props) => props.theme.spacing[24]});

  animation: ${(props) => (props.$isRender ? slideUp : slideDown)} 0.3s forwards;
`;
const StItem = styled.li`
  color: ${(props) => props.theme.color.text.disabled};
  display: flex;
  font-size: ${(props) => props.theme.body.md.medium.fontSize};
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};
  align-items: center;

  span:first-child {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: ${(props) => props.theme.border.radius.circle};
  }
  &:nth-child(1) span:first-child {
    background-color: var(--state-online);
  }
  &:nth-child(2) span:first-child {
    background-color: var(--state-eating);
  }
  &:nth-child(3) span:first-child {
    background-color: var(--state-left-seat);
  }
  &:nth-child(4) span:first-child {
    background-color: var(--state-disturb);
  }

  cursor: pointer;
  span:last-child {
    transition: all 0.125s ease-in;
  }
  &:hover span:last-child {
    color: ${(props) => props.theme.color.text.interactive.inverse};
  }
`;
