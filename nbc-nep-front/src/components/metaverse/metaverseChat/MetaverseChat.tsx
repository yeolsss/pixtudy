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
import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function MetaverseChat() {
  const isOpenChat = useChatType.use.isOpenChat();
  const chatType = useChatType.use.chatType();
  const { id, spaceId } = useMetaversePlayer();
  const { handleSetDmChatAlarmState, setAlarmPlayStatus } = useChatAlarm();
  const dmList = useGetLastDMList(spaceId, id);
  const queryClient = useQueryClient();

  const handleRefetchDMList = async () => {
    await queryClient.invalidateQueries({ queryKey: ["lastDMList"] });
  };

  const countUnRead = useRef<number>(0);

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

const StMetaverseGlobalChatWrapper = styled.div<{ $isOpenChat: boolean }>`
  width: ${({ $isOpenChat }) => ($isOpenChat ? "260px" : "0")};
  overflow: hidden; // width가 0일 때 내부 내용이 보이지 않도록 설정
  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  padding: ${({ theme, $isOpenChat }) =>
    `${$isOpenChat ? theme.spacing["16"] : "0"} ${$isOpenChat ? theme.spacing["12"] : "0"}`};

  * {
    color: ${(props) =>
      props.$isOpenChat ? "white" : "rgba(0,0,0,0)"} !important;
  }

  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    padding 0.2s ease;

  word-break: keep-all;

  z-index: ${({ $isOpenChat }) => ($isOpenChat ? "100" : "-1")};
`;

const StChatContainer = styled.section<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? "100%" : "0px")};
  height: ${(props) => (props.$isOpen ? "100%" : "0px")};
  overflow: hidden;
`;
