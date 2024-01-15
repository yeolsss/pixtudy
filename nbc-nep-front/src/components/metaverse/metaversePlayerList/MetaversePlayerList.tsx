import MetaversePlayerCard from "@/components/metaverse/metaversePlayerList/metaversePlayerCard/MetaversePlayerCard";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import { useAppSelector } from "@/hooks/useReduxTK";
import { supabase } from "@/libs/supabase";
import { Tables } from "@/types/supabase";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MetaverseDmContainer from "./metaverseDmContainer/MetaverseDmContainer";

export default function MetaversePlayerList() {
  const { playerList } = usePlayerContext();

  // 열린 dm 채팅방
  const [activateDmUsers, setActivateDmUsers] = useState<string[]>([]);

  const currentUserId = useAppSelector((state) => state.authSlice.user.id);

  const router = useRouter();

  const spaceId =
    typeof router.query.space_id === "string" ? router.query.space_id : "";

  // 현재 세션의 유저 id가 receiver로 지정된 메시지가 도착했을 때
  const getNewMessage = (
    payload: RealtimePostgresInsertPayload<Tables<"dm_messages">>
  ) => {
    setActivateDmUsers((prev) => {
      if (prev.includes(payload.new.sender_id)) return prev;
      else return [payload.new.sender_id, ...prev];
    });
  };

  // dm 채팅방 열기
  const handleOpenDmContainer = (id: string) => {
    setActivateDmUsers((prev) => {
      if (prev.includes(id)) return prev;
      else return [id, ...prev];
    });
  };

  // dm 채팅방 닫기
  const handleCloseDmContainer = (user_id: string) => {
    setActivateDmUsers((prev) => prev.filter((id) => id !== user_id));
  };

  // 현재 세션의 유저 id가 receiver로 지정된 메시지를 tracking하는 채널
  useEffect(() => {
    const dmChannel = supabase.channel(`dm_channel_${spaceId}`);
    dmChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dm_messages",
          filter: `receiver_id=eq.${currentUserId}`,
        },
        getNewMessage
      )
      .subscribe();
  }, []);

  return (
    <>
      <StMetaversePlayerListWrapper>
        {playerList?.map((player) => (
          <MetaversePlayerCard
            key={player.playerId}
            player={player}
            handleOpenDmContainer={handleOpenDmContainer}
          />
        ))}
      </StMetaversePlayerListWrapper>
      <StMetaverseDmContainers>
        {activateDmUsers.map((user) => (
          <MetaverseDmContainer
            key={user}
            otherUserId={user}
            handleCloseDmContainer={handleCloseDmContainer}
            spaceId={spaceId}
          />
        ))}
      </StMetaverseDmContainers>
    </>
  );
}

const StMetaversePlayerListWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 500px;
  padding: 10px;
  overflow: scroll;
  z-index: 100;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StMetaverseDmContainers = styled.section`
  position: absolute;
  bottom: 0;
  left: 200px;
  display: flex;
  z-index: 100;
  background: green;
`;
