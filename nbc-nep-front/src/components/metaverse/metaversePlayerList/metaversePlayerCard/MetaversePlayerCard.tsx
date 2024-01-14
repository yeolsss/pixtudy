import { Player } from "@/types/metaverse";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useReduxTK";
import { supabase } from "@/libs/supabase";

interface Props {
  player: Player;
}

const SPACE_ID = "0f5f0efe-ccc9-49a7-bc12-224eaa19685b";
export default function MetaversePlayerCard({ player }: Props) {
  const { id } = useAppSelector((state) => state.authSlice.user);
  const { playerId, nickname } = player;

  // dm state
  const [dmContainers, setDmContainers] = useState<string[]>([]);
  const [isDMOpen, setIsDMOpen] = useState<boolean>(false);
  useEffect(() => {
    const dmChannel = supabase.channel(`dm_channel_${SPACE_ID}`);
    dmChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dm_messages",
          filter: `receiver_id=eq.${id}`,
        },
        (payload) => {
          setDmContainers((prev) => {
            if (prev.includes(payload.new.sender_id)) return prev;
            else return [payload.new.sender_id, ...prev];
          });
        }
      )
      .subscribe();
  }, []);

  const onClickDMMessageHandler = () => {
    if (playerId !== id) {
      console.log("DM message to ", nickname);
      return;
    }
    console.log("자기 자신에게는 DM을 보낼 수 없습니다.");
  };

  return (
    <StMetaversePlayerCard onClick={onClickDMMessageHandler}>
      <div>
        <span>{nickname}</span>
      </div>
    </StMetaversePlayerCard>
  );
}

const StMetaversePlayerCard = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  cursor: pointer;
  > div > span {
    font-size: 14px;
  }
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
`;
