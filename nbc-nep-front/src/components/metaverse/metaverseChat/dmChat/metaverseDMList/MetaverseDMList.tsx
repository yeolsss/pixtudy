import MetaverseDMListCard from "@/components/metaverse/metaverseChat/dmChat/metaverseDMListCard/MetaverseDMListCard";
import MetaverseDmContainer from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmContainer";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import { Database } from "@/supabase/types/supabase";
import useChatType from "@/zustand/chatTypeStore";
import useDm from "@/zustand/dmStore";
import useGlobalNavBar from "@/zustand/globalNavBarStore";
import styled from "styled-components";

interface Props {
  dmList:
    | Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"]
    | undefined;
}

export default function MetaverseDmList({ dmList }: Props) {
  const { isOpenChat, closeChat } = useChatType();
  const { isOpen: isOpenDm, otherUserName, closeDm } = useDm();

  const { resetAllSections } = useGlobalNavBar();

  const handleOnClickCloseChat = () => {
    resetAllSections();
    closeDm();
    closeChat();
  };

  const handleCloseDmContainer = () => {
    closeDm();
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
        <StDmListCardWrapper>
          {dmList?.map((dm) => (
            <MetaverseDMListCard key={dm.message_id} dm={dm} />
          ))}
        </StDmListCardWrapper>
      ) : (
        isOpenChat && <MetaverseDmContainer />
      )}
    </>
  );
}

const StDmListCardWrapper = styled.div`
  padding: ${(props) => props.theme.spacing["2"]};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
