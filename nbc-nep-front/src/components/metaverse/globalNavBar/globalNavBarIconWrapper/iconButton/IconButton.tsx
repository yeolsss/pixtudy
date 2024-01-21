import Image from "next/image";
import styled from "styled-components";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import StBadge from "@/components/common/badge/Badge";
import { useAppSelector } from "@/hooks/useReduxTK";
import { useState } from "react";

export default function IconButton({
  buttonImage,
  description,
  type,
  handleOnClick,
}: IconButtonProperty) {
  const { dmChatStates, globalChatState } = useAppSelector(
    (state) => state.chatAlarm
  );
  const [alarmState, setAlarmState] = useState<boolean>();
  return (
    <StButton onClick={handleOnClick}>
      <Image src={buttonImage} alt={description} width={"32"} height={"32"} />
      {type === "chat" && (
        <StBadge color={"var(--state-online)"} x={30} y={30} />
      )}
    </StButton>
  );
}

const StButton = styled.button`
  background-color: unset;
  border: unset;
  padding: unset;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: unset;
  }
`;
