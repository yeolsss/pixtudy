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
  isOpen: boolean;
}

export default function MetaverseDmList({ dmList, isOpen }: Props) {
  const isOpenChat = useChatType.use.isOpenChat();
  const closeChat = useChatType.use.closeChat();
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
    <StDmContainer $isOpen={isOpen}>
      {!isOpenDm ? (
        <MetaverseChatHeader
          title={"DM List"}
          handler={handleOnClickCloseChat}
        />
      ) : (
        <MetaverseChatHeader
          title="Dm"
          subtitle={otherUserName}
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
    </StDmContainer>
  );
}
const StDmContainer = styled.section<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? "100%" : "0px")};
  height: ${(props) => (props.$isOpen ? "100%" : "0px")};
  overflow: hidden;
`;
const StDmListCardWrapper = styled.div`
  padding: ${(props) => props.theme.spacing["2"]};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
