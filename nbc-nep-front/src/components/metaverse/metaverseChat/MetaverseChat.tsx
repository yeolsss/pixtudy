import MetaverseDmList from "@/components/metaverse/metaverseChat/dmChat/metaverseDMList/MetaverseDMList";
import MetaverseChatForm from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatForm";
import MetaverseChatList from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatList";
import { dmChatAlarmState } from "@/components/metaverse/types/ChatAlarmType";
import { DMListCard } from "@/components/metaverse/types/metaverse";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { useGetLastDMList } from "@/hooks/query/useSupabase";
import { supabase } from "@/supabase/supabase";
import useChatType from "@/zustand/chatTypeStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";

export default function MetaverseChat() {
  const { isOpenChat, chatType } = useChatType();
  const { id, spaceId } = useMetaversePlayer();
  const { handleSetDmChatAlarmState } = useChatAlarm();
  const dmList = useGetLastDMList(spaceId, id);

  const queryClient = useQueryClient();
  const handleRefetchDMList = async () => {
    await queryClient.invalidateQueries({ queryKey: ["lastDMList"] });
  };
  useEffect(() => {
    const dmChannel = supabase.channel(`dm_channel_${spaceId}`);
    dmChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dm_messages",
          filter: `receiver_id=eq.${id}`,
        },
        handleRefetchDMList
      )
      .subscribe();
  }, []);

  useEffect(() => {
    if (dmList) {
      const dmAlarmType = dmList?.reduce((acc, cur: DMListCard) => {
        acc.push({ dm_id: cur.room_id, state: !!cur.unread_count });
        return acc;
      }, [] as dmChatAlarmState[]);
      handleSetDmChatAlarmState(dmAlarmType!);
    }
  }, [dmList]);

  return (
    <StMetaverseGlobalChatWrapper $isOpenChat={isOpenChat}>
      {chatType === "GLOBAL" && (
        <>
          <MetaverseChatList />
          <MetaverseChatForm />
        </>
      )}
      {chatType === "DM" && <MetaverseDmList dmList={dmList} />}
    </StMetaverseGlobalChatWrapper>
  );
}

const StMetaverseGlobalChatWrapper = styled.div<{ $isOpenChat: boolean }>`
  width: ${({ $isOpenChat }) => ($isOpenChat ? "240px" : "0")};
  overflow: hidden; // width가 0일 때 내부 내용이 보이지 않도록 설정
  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-height: 100vh;
  //prettier-ignore
  padding: ${({ theme, $isOpenChat }) =>
    $isOpenChat ? theme.spacing["24"] : "0"} ${({ theme, $isOpenChat }) =>
    $isOpenChat ? theme.spacing["20"] : "0"};
  gap: 30px;
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenChat }) => ($isOpenChat ? "100" : "-1")};
`;
