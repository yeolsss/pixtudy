import MetaversePlayerCard from "@/components/metaverse/metaversePlayerList/metaversePlayerCard/MetaversePlayerCard";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import styled from "styled-components";
import { isOpenDm } from "@/redux/modules/dmSlice";
import { setIsSomeSection } from "@/redux/modules/globalNavBarSlice";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import { ChatType } from "@/components/metaverse/metaverseChat/types/ChatType";

export default function MetaversePlayerList() {
  const dispatch = useAppDispatch();
  const isOpenPlayerList = useAppSelector(
    (state) => state.globalNavBar.playerList
  );

  const { playerList } = usePlayerContext();
  const { spaceId } = usePlayerContext();

  // dm 채팅방 열기
  const handleOpenDmContainer = (id: string) => {
    const newIsSomeSection = {
      chatSection: true,
      settingsSection: false,
      playerList: false,
    };

    dispatch(setIsSomeSection(newIsSomeSection));
    const newIsOpenChat = {
      isOpenChat: true,
      chatType: "DM" as ChatType,
    };
    dispatch(setIsOpenChat(newIsOpenChat));
    const newOpenDm = {
      isOpen: true,
      dmRoomId: "",
      otherUserId: id,
      spaceId,
    };
    dispatch(isOpenDm(newOpenDm));
  };

  return (
    <>
      <StMetaversePlayerListWrapper $isOpenPlayerList={isOpenPlayerList}>
        {playerList?.map((player) => (
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

const StMetaversePlayerListWrapper = styled.div<{ $isOpenPlayerList: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${({ $isOpenPlayerList }) => ($isOpenPlayerList ? "300px" : "0")};
  padding: ${({ $isOpenPlayerList }) => ($isOpenPlayerList ? "10px" : "0")};
  overflow: ${({ $isOpenPlayerList }) =>
    $isOpenPlayerList ? "scroll" : "hidden"};
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenPlayerList }) => ($isOpenPlayerList ? "100" : "-1")};
  background-color: #1f2542;
  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;
