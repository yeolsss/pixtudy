import MetaverseDMListCard from "@/components/metaverse/metaverseChat/dmChat/metaverseDMListCard/MetaverseDMListCard";
import React from "react";
import MetaverseDmContainer from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import { setIsCloseSomeSection } from "@/redux/modules/globalNavBarSlice";
import { setCloseDm } from "@/redux/modules/dmSlice";
import { setCloseChat } from "@/redux/modules/chatTypeSlice";
import { Database } from "@/supabase/types/supabase";

interface Props {
  dmList:
    | Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"]
    | undefined;
}

export default function MetaverseDmList({ dmList }: Props) {
  const { isOpenChat } = useAppSelector((state) => state.chatType);
  const { isOpen: isOpenDm, otherUserName } = useAppSelector(
    (state) => state.dm
  );
  const dispatch = useAppDispatch();

  const handleOnClickCloseChat = () => {
    dispatch(setIsCloseSomeSection());
    dispatch(setCloseDm());
    dispatch(setCloseChat());
  };

  const handleCloseDmContainer = () => {
    dispatch(setCloseDm());
  };

  return (
    <>
      {!isOpenDm ? (
        <MetaverseChatHeader
          title={"DM List"}
          handler={handleOnClickCloseChat}
        />
      ) : (
        <MetaverseChatHeader
          title={`${otherUserName}`}
          handler={handleCloseDmContainer}
        />
      )}
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
