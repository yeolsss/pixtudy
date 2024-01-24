import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import MetaversePlayerCard from "@/components/metaverse/metaversePlayerList/MetaversePlayerCard";
import { ChatType } from "@/components/metaverse/types/ChatType";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import useDm from "@/zustand/dmStore";
import useGlobalNavBar, {
  changeSectionVisibility,
} from "@/zustand/globalNavBarStore";
import styled from "styled-components";

export interface HandleOpenDmContainerPrams {
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
}

export default function MetaversePlayerList() {
  const dispatch = useAppDispatch();

  const { isPlayerListOn, setSectionVisibility, resetAllSections } =
    useGlobalNavBar();

  const { playerList, spaceId } = usePlayerContext();
  const { openDm } = useDm();

  // dm 채팅방 열기
  const handleOpenDmContainer = ({
    otherUserId,
    otherUserName,
    otherUserAvatar,
  }: HandleOpenDmContainerPrams) => {
    setSectionVisibility(changeSectionVisibility("isChatSectionOn", true));

    const newIsOpenChat = {
      isOpenChat: true,
      chatType: "DM" as ChatType,
    };

    dispatch(setIsOpenChat(newIsOpenChat));

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
    <>
      <StMetaversePlayerListWrapper $isPlayerListOn={isPlayerListOn}>
        {isPlayerListOn && (
          <MetaverseChatHeader
            title={"Player List"}
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
    </>
  );
}

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
