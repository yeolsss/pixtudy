import { useGetLastDMList } from "@/hooks/query/useSupabase";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import MetaverseDmCard from "@/components/metaverse/metaverseChat/metaverseDMCard/MetaverseDMCard";
import { useEffect } from "react";
import { supabase } from "@/libs/supabase";
import { useQueryClient } from "@tanstack/react-query";
import MetaverseDmContainer from "@/components/metaverse/metaversePlayerList/metaverseDmContainer/MetaverseDmContainer";
import { useAppSelector } from "@/hooks/useReduxTK";

export default function MetaverseDmList() {
  const { id, spaceId } = usePlayerContext();
  const queryClient = useQueryClient();
  const dmList = useGetLastDMList(spaceId, id);
  const { isOpen: isOpenDm } = useAppSelector((state) => state.dm);

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
    <>
      {!isOpenDm ? (
        <div>
          {dmList?.map((dm) => <MetaverseDmCard key={dm.message_id} dm={dm} />)}
        </div>
      ) : (
        <MetaverseDmContainer />
      )}
    </>
  );
}
