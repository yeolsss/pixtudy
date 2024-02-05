import MetaverseDmList from "@/components/metaverse/metaverseChat/dmChat/metaverseDMList/MetaverseDMList";
import MetaverseChatForm from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatForm";
import MetaverseChatList from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatList";
import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { useGetLastDMList } from "@/hooks/query/useSupabase";
import { supabase } from "@/supabase";
import useChatTypeStore from "@/zustand/chatTypeStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { dmChatAlarmState, DMListCard } from "@/types/metaverse.types";
import {
  StChatContainer,
  StMetaverseGlobalChatWrapper,
} from "@/components/metaverse/styles/metaverse.styles";

export default function MetaverseChat() {
  const isOpenChat = useChatTypeStore.use.isOpenChat();
  const chatType = useChatTypeStore.use.chatType();
  const { id, spaceId } = useMetaversePlayer();
  const { handleSetDmChatAlarmState, setAlarmPlayStatus } = useChatAlarm();
  const dmList = useGetLastDMList(spaceId, id);
  const queryClient = useQueryClient();

  const handleRefetchDMList = async () => {
    await queryClient.invalidateQueries({ queryKey: ["lastDMList"] });
  };

  const countUnRead = useRef<number>(0);

  useEffect(() => {
    console.log("isOpenChat", isOpenChat);
    console.log("chatType", chatType);
  }, [isOpenChat, chatType]);

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
      let count = 0;
      const dmAlarmType = dmList?.reduce((acc, cur: DMListCard) => {
        count += cur.unread_count ? cur.unread_count : 0;
        acc.push({ dm_id: cur.room_id, state: !!cur.unread_count });
        return acc;
      }, [] as dmChatAlarmState[]);
      if (countUnRead.current < count) {
        setAlarmPlayStatus(true);
      }
      countUnRead.current = count;
      handleSetDmChatAlarmState(dmAlarmType!);
    }
  }, [dmList]);

  return (
    <StMetaverseGlobalChatWrapper $isOpenChat={isOpenChat}>
      <StChatContainer $isOpen={chatType === "GLOBAL"}>
        <MetaverseChatList />
        <MetaverseChatForm />
      </StChatContainer>

      <MetaverseDmList dmList={dmList} isOpen={chatType === "DM"} />
    </StMetaverseGlobalChatWrapper>
  );
}
