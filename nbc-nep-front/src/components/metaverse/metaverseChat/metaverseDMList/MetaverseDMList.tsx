import { useGetLastDMList } from "@/hooks/query/useSupabase";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import MetaverseDmCard from "@/components/metaverse/metaverseChat/metaverseDMCard/MetaverseDMCard";
import { useEffect } from "react";
import { supabase } from "@/libs/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function MetaverseDmList() {
  const { id, spaceId } = usePlayerContext();
  const queryClient = useQueryClient();
  //할거 좀 정리해보자.
  // 접속한 유저의 DM list 불러오기 - 불러 올땐 각 dm별 마지막에 오거나 보낸 DM순으로 정렬한다.
  // - DM list는 어떻게 구분할까? table에는 user와 other_user로 구분되어있는데..
  // - 차라리 table을 따로 뺄까..?

  // 읽은 메시지인지 아닌지 어떻게 구분할래? - 읽은 메시지는 읽은 시간을 기록한다.
  // 읽지 않은 메시지는 메시지가 오면 +1을 해준다.
  // 읽은 시점에서 지금까지 온 메시지는 읽은 메시지로 업데이트하고, state에는 읽지 않은 메시지 0으로 초기화한다.
  const dmList = useGetLastDMList(spaceId, id);

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

  return (
    <div>
      {dmList?.map((dm) => <MetaverseDmCard key={dm.message_id} dm={dm} />)}
    </div>
  );
}
