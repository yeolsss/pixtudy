import { useGetLastDMList } from "@/hooks/query/useSupabase";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import MetaverseDMListCard from "@/components/metaverse/metaverseChat/dmChat/metaverseDMListCard/MetaverseDMListCard";
import React, { useEffect } from "react";
import { supabase } from "@/supabase/supabase";
import { useQueryClient } from "@tanstack/react-query";
import MetaverseDmContainer from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatHeader/MetaverseChatHeader";
import { setIsCloseSomeSection } from "@/redux/modules/globalNavBarSlice";
import { setCloseDm } from "@/redux/modules/dmSlice";
import { setCloseChat } from "@/redux/modules/chatTypeSlice";

export default function MetaverseDmList() {
  const { id, spaceId } = usePlayerContext();
  const queryClient = useQueryClient();
  const dmList = useGetLastDMList(spaceId, id);
  const { isOpenChat } = useAppSelector((state) => state.chatType);
  const { isOpen: isOpenDm } = useAppSelector((state) => state.dm);
  const dispatch = useAppDispatch();
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

  const handleOnClickCloseChat = () => {
    dispatch(setIsCloseSomeSection());
    dispatch(setCloseDm());
    dispatch(setCloseChat());
  };
  return (
    <>
      <MetaverseChatHeader title={"DM List"} handler={handleOnClickCloseChat} />
      {isOpenChat && !isOpenDm ? (
        <div>
          {dmList?.map((dm) => (
            <MetaverseDMListCard key={dm.message_id} dm={dm} />
          ))}
        </div>
      ) : (
        isOpenChat && <MetaverseDmContainer />
      )}
    </>
  );
}
