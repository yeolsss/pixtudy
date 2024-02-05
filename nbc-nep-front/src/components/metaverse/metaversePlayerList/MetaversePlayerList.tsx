import styledComponents from "styled-components";

import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import MetaversePlayerCard from "@/components/metaverse/metaversePlayerList/MetaversePlayerCard";
import useChatTypeStore from "@/zustand/chatTypeStore";
import useDmStore from "@/zustand/dmStore";
import useGlobalNavBarStore, {
  changeSectionVisibility,
} from "@/zustand/globalNavBarStore";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { HandleOpenDmContainerPrams } from "@/types/metaverse.types";

const styled = styledComponents;
const StMetaversePlayerListWrapper = styled.div<{ $isPlayerListOn: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "240px" : "0")};
  padding: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "10px" : "0")};
  overflow: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "scroll" : "hidden")};
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "100" : "-1")};
  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function MetaversePlayerList() {
  const isPlayerListOn = useGlobalNavBarStore.use.isPlayerListOn();
  const setSectionVisibility = useGlobalNavBarStore.use.setSectionVisibility();
  const resetAllSections = useGlobalNavBarStore.use.resetAllSections();

  const { playerList } = useMetaversePlayer();
  const { spaceId } = useMetaversePlayer();
  const openDm = useDmStore.use.openDm();
  const openChat = useChatTypeStore.use.openChat();

  // dm 채팅방 열기
  const handleOpenDmContainer = ({
    otherUserId,
    otherUserName,
    otherUserAvatar,
  }: HandleOpenDmContainerPrams) => {
    setSectionVisibility(changeSectionVisibility("isChatSectionOn", true));

    openChat("DM");

    openDm({
      isOpen: true,
      dmRoomId: "",
      otherUserId,
      spaceId,
      otherUserName,
      otherUserAvatar,
    });
  };

  const handleOnClickClosePlayerList = () => {
    resetAllSections();
  };

  return (
    <StMetaversePlayerListWrapper $isPlayerListOn={isPlayerListOn}>
      {isPlayerListOn && (
        <MetaverseChatHeader
          title="Player List"
          handler={handleOnClickClosePlayerList}
        />
      )}
      {isPlayerListOn &&
        playerList?.map((player) => (
          <MetaversePlayerCard
            key={player.playerId}
            player={player}
            handleOpenDmContainer={handleOpenDmContainer}
          />
        ))}
    </StMetaversePlayerListWrapper>
  );
}
